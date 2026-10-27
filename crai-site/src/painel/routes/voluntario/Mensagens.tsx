import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconArrowRight, IconChat, IconCheck, IconClose, IconRefresh } from '../../components/icons/Icons'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ErroCarregar, Vazio } from '../../components/ui/Estados'
import { ErroApi, MODO_REAL, agoraDaTela, api } from '../../data/api'
import type {
  AbordagemVoluntario,
  EventoMensagemVoluntario,
  MensagemVoluntarioDetalhe,
  MensagemVoluntarioResumo,
  SugestaoVoluntario,
} from '../../data/tipos'
import { cx } from '../../lib/cx'
import { fmt } from '../../lib/format'
import { t } from '../../lib/idioma'
import { ATUALIZAR_CICLO_ABERTO_MS, mesmoConteudo, useAtualizarACada } from '../../lib/useAtualizarACada'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { textoDoPrazo } from '../involuntario/CicloDrawer'
import { FAIXA } from './Blocos'

/**
 * As 3 mensagens do voluntário (14/10/2026): o mesmo que o involuntário faz com as cobranças. No
 * modo "eu escolho", a oferta de retenção por WhatsApp ou e-mail espera a empresa escolher uma de
 * três mensagens; sem escolha no prazo, sai a recomendada. A OFERTA não muda: as três são jeitos
 * de apresentar a mesma oferta, que o sistema escolheu.
 */

const ABORDAGEM_VOLUNTARIO: Record<AbordagemVoluntario, string> = {
  cuidado_proximo: t('Cuidado próximo'),
  facilitacao: t('Facilitação'),
  direto_ao_ponto: t('Direto ao ponto'),
}

/** O que cada sinal de risco significa, em linguagem simples. */
const EVENTO: Record<string, string> = {
  'Cancellation Page Viewed': t('Abriu a página de cancelamento.'),
  'Downgrade Clicked': t('Clicou para rebaixar o plano.'),
  'Session Started': t('Os dados de uso mudaram e o risco subiu.'),
  'Disparo em lote': t('A base inteira foi avaliada de uma vez.'),
}

const TOM: Record<'ok' | 'warn' | 'danger' | 'neutro', string> = {
  ok: 'bg-ok',
  warn: 'bg-warn',
  danger: 'bg-danger',
  neutro: 'bg-graphite',
}

function escolhidaPor(por: string | null | undefined): string {
  if (por === 'prazo') return t('O prazo acabou e a recomendada foi enviada.')
  if (por === 'automatico') return t('A recomendada, enviada pelo modo automático.')
  return t('Escolhida pela sua empresa.')
}

/** O título, o detalhe e a cor de cada fato da linha do tempo. A frase é escrita aqui, no idioma de quem lê. */
function fatoDaLinhaDoTempo(e: EventoMensagemVoluntario): { titulo: string; detalhe: string | null; tom: keyof typeof TOM } {
  switch (e.tipo) {
    case 'sinal_de_risco':
      return { titulo: t('Sinal de risco'), detalhe: (e.evento && EVENTO[e.evento]) || t('Um evento do seu sistema subiu o risco deste cliente.'), tom: 'danger' }
    case 'mensagens_sugeridas':
      return {
        titulo: t('Três mensagens sugeridas'),
        detalhe:
          (e.oferta && e.canal ? t('{oferta}, por {canal}.', { oferta: e.oferta, canal: e.canal }) : '') +
          (e.rodadas && e.rodadas > 1 ? ' ' + t('Outras três pedidas; {n} rodadas no total.', { n: e.rodadas }) : ''),
        tom: 'neutro',
      }
    case 'mensagem_escolhida':
      return {
        titulo: e.abordagem ? t('Mensagem escolhida: {abordagem}', { abordagem: ABORDAGEM_VOLUNTARIO[e.abordagem] }) : t('Mensagem escolhida'),
        detalhe: escolhidaPor(e.escolhida_por),
        tom: 'neutro',
      }
    case 'mensagem_enviada':
      return { titulo: t('Mensagem enviada'), detalhe: e.canal ? t('Por {canal}.', { canal: e.canal }) : null, tom: 'ok' }
    case 'mensagem_nao_enviada':
      return {
        titulo: t('Mensagem não enviada'),
        detalhe: e.motivo === 'nao_contatar' ? t('O cliente pediu para não receber mensagens.') : t('A entrega falhou.'),
        tom: 'warn',
      }
    case 'oferta_aceita':
      return { titulo: t('Oferta aceita'), detalhe: null, tom: 'ok' }
    case 'oferta_recusada':
      return { titulo: t('Oferta recusada'), detalhe: null, tom: 'neutro' }
  }
}

const SEM_TEXTO = () => t('O texto desta mensagem foi apagado depois do prazo de guarda (90 dias depois do envio).')

/* ------------------------------------------------------------------ */
/* A aba "Mensagens"                                                   */
/* ------------------------------------------------------------------ */

interface PropsDaAba {
  /** O que a página já leu (`api.mensagensVoluntario`); null enquanto carrega. */
  dados: { mensagens: MensagemVoluntarioResumo[]; modo: 'automatico' | 'escolha' } | null
  erro: string | null
  onTentar: () => void
  onEscolher: (id: number) => void
}

export function AbaMensagensVoluntario({ dados, erro, onTentar, onEscolher }: PropsDaAba) {
  const automatico = dados?.modo === 'automatico'
  const agora = agoraDaTela()
  return (
    <Card className="p-0" data-aba-mensagens-voluntario>
      <div className="border-b border-line px-5 py-4">
        <h3 className="t-h3 text-paper">{t('Mensagens esperando a sua escolha')}</h3>
        <p className="t-apoio mt-1 text-silver">
          {automatico
            ? t('Modo automático: a oferta sai na hora, com a mensagem recomendada. Para escolher você mesmo, mude o modo na Configuração.')
            : t('O sistema escreveu três mensagens com a oferta escolhida para cada cliente em risco. Sem escolha no prazo, a recomendada é enviada.')}
        </p>
      </div>
      {erro ? (
        <div className="p-4">
          <ErroCarregar mensagem={erro} onTentar={onTentar} />
        </div>
      ) : dados === null ? (
        <ul className="flex flex-col" aria-busy="true" aria-label={t('Carregando as mensagens')}>
          {Array.from({ length: 2 }).map((_, i) => (
            <li key={i} className="border-t border-line px-5 py-4 first:border-t-0">
              <div className="h-4 w-1/2 animate-pulse rounded bg-paper/[0.06]" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-paper/[0.05]" />
            </li>
          ))}
        </ul>
      ) : dados.mensagens.length === 0 ? (
        <Vazio
          titulo={t('Nenhuma oferta espera a sua escolha agora')}
          texto={
            automatico
              ? t('No modo automático nada espera: cada oferta sai na hora. O que foi enviado aparece na coluna Abordagem de cada cliente.')
              : t('Quando o sistema decidir uma oferta por WhatsApp ou e-mail para um cliente em risco, as três mensagens aparecem aqui. No aviso dentro do produto a oferta sai na hora, porque o cliente está no site.')
          }
          icone={<IconChat width={22} height={22} />}
        />
      ) : (
        <ul className="flex flex-col" aria-label={t('Ofertas esperando a escolha da mensagem')}>
          {dados.mensagens.map((m) => (
            <li key={m.id} className="flex flex-col gap-3 border-t border-line px-5 py-4 first:border-t-0 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-[560] text-paper">{m.nome}</span>
                  {m.mrr !== null ? <span className="tabular font-[560] text-paper">{fmt.brl(m.mrr)}</span> : null}
                </div>
                <div className="t-label mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-muted">
                  <span>
                    {FAIXA[m.faixa].rotulo} · {t('Oferta: {oferta}', { oferta: m.oferta })}
                  </span>
                  <span>{t('Canal: {canal}', { canal: m.canal_legivel })}</span>
                  {m.escolha_ate ? (
                    <span className="text-warn">
                      {t('Escolha até {data} · {prazo}', { data: fmt.dataHora(m.escolha_ate), prazo: textoDoPrazo(m.escolha_ate, agora) })}
                    </span>
                  ) : null}
                </div>
                {m.recomendada ? (
                  <p className="t-apoio mt-2 line-clamp-2 text-silver">
                    <span className="font-[560] text-paper">{t('Recomendada: {abordagem}.', { abordagem: ABORDAGEM_VOLUNTARIO[m.recomendada.abordagem] })}</span>{' '}
                    {m.recomendada.texto ?? SEM_TEXTO()}
                  </p>
                ) : null}
              </div>
              <Button size="sm" variant="primary" className="shrink-0" onClick={() => onEscolher(m.id)}>
                {t('Escolher a mensagem')} <IconArrowRight width={15} height={15} />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* O painel lateral                                                    */
/* ------------------------------------------------------------------ */

const ESTADO: Record<MensagemVoluntarioDetalhe['estado'], { rotulo: string; classe: string; ponto: string }> = {
  aguardando: { rotulo: t('Esperando a sua escolha'), classe: 'border-warn/50 text-warn', ponto: 'bg-warn' },
  enviada: { rotulo: t('Enviada'), classe: 'border-ok/45 text-ok', ponto: 'bg-ok' },
  nao_enviada: { rotulo: t('Não enviada'), classe: 'border-line text-silver', ponto: 'bg-graphite' },
}

/**
 * Painel lateral de uma oferta: por que o cliente está em risco, as 3 mensagens (e as rodadas
 * pedidas depois) e a linha do tempo. Aberto pela aba Mensagens ou pelo botão "Ver as 3
 * mensagens" da lista de clientes. Com a oferta esperando, a primeira "Enviar esta" recebe o foco.
 */
export function MensagemVoluntarioDrawer({ id, onClose }: { id: number; onClose: () => void }) {
  const [m, setM] = useState<MensagemVoluntarioDetalhe | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [regerando, setRegerando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erroAcao, setErroAcao] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const ocupado = regerando || enviando

  const consulta = useRef(0)
  const carregar = useCallback(() => {
    const pedida = (consulta.current += 1)
    return api
      .mensagemVoluntario(id)
      .then((d) => {
        if (pedida !== consulta.current) return
        if (d === null) setErro(t('Não encontramos esta oferta.'))
        else setM(d)
      })
      .catch((e: unknown) => setErro(e instanceof ErroApi ? e.message : t('Não deu para abrir esta oferta.')))
  }, [id])
  useEffect(() => {
    void carregar()
  }, [carregar])

  // Com o painel aberto e o backend ligado, a oferta é relida a cada 5 segundos, em silêncio:
  // se o prazo vencer com o painel aberto, a tela mostra a mensagem que saiu.
  const ocupadoAgora = useRef(false)
  ocupadoAgora.current = ocupado
  useAtualizarACada(
    () => {
      if (ocupadoAgora.current || erro !== null || m === null) return
      const pedida = (consulta.current += 1)
      return api.mensagemVoluntario(id).then((d) => {
        if (d === null || pedida !== consulta.current || ocupadoAgora.current) return
        if (!mesmoConteudo(m, d)) setM(d)
      })
    },
    ATUALIZAR_CICLO_ABERTO_MS,
    MODO_REAL,
  )

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  async function escolher(s: SugestaoVoluntario) {
    setEnviando(true)
    setErroAcao(null)
    setAviso(null)
    try {
      const r = await api.escolherMensagemVoluntario(id, s.rodada, s.abordagem)
      if (!r.enviada) {
        setAviso(r.motivo === 'nao_contatar' ? t('Nada foi enviado: o cliente pediu para não receber mensagens.') : t('A mensagem foi escolhida, mas a entrega falhou.'))
      }
      await carregar()
    } catch (e) {
      setErroAcao(e instanceof ErroApi ? e.message : t('Não deu para enviar esta mensagem.'))
    }
    setEnviando(false)
  }

  async function regerar() {
    setRegerando(true)
    setErroAcao(null)
    try {
      await api.regerarMensagensVoluntario(id)
      await carregar()
    } catch (e) {
      setErroAcao(e instanceof ErroApi ? e.message : t('Não deu para gerar outras mensagens.'))
    }
    setRegerando(false)
  }

  const rodada = m ? Math.max(1, ...m.sugestoes.map((s) => s.rodada)) : 1
  const daRodada = m ? m.sugestoes.filter((s) => s.rodada === rodada) : []
  // Depois da escolha, a escolhida aparece mesmo que seja de uma rodada anterior.
  const escolhida = m?.sugestoes.find((s) => s.escolhida) ?? null
  const mostradas = escolhida && escolhida.rodada !== rodada ? [escolhida, ...daRodada] : daRodada
  const aguardando = m?.estado === 'aguardando'

  // A escolha fica à vista assim que a oferta chega (uma vez só), com o foco no primeiro botão.
  const secaoDaEscolha = useRef<HTMLElement>(null)
  const jaFoi = useRef(false)
  useEffect(() => {
    if (jaFoi.current || m === null || !aguardando || !secaoDaEscolha.current) return
    jaFoi.current = true
    secaoDaEscolha.current.querySelector<HTMLButtonElement>('button:not([disabled])')?.focus({ preventScroll: true })
  }, [m, aguardando])

  const pontuacao = m?.risco.pontuacao ?? null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t('Mensagens da oferta')}>
      <button type="button" aria-label={t('Fechar')} onClick={onClose} className="absolute inset-0 bg-sombra/60 backdrop-blur-[2px]" />
      <motion.aside
        initial={reduced ? false : { x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="scroll-fino absolute inset-y-0 right-0 w-full max-w-[560px] overflow-y-auto border-l border-line bg-card shadow-painel"
      >
        {erro ? (
          <div className="p-6">
            <button type="button" onClick={onClose} aria-label={t('Fechar')} className="mb-4 rounded-[8px] p-2 text-silver hover:bg-paper/[0.06] hover:text-paper">
              <IconClose />
            </button>
            <ErroCarregar mensagem={erro} onTentar={onClose} />
          </div>
        ) : m === null ? (
          <div className="p-6 text-silver">{t('Carregando…')}</div>
        ) : (
          <div className="flex flex-col gap-6 p-6">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h2 className="t-h2 text-paper">{m.nome}</h2>
                <div className="t-apoio mt-1 text-silver">
                  {m.mrr !== null ? `${fmt.brl(m.mrr)} · ` : ''}
                  {FAIXA[m.faixa].rotulo}
                  {m.posicao_na_base !== null && m.total_na_base
                    ? t(' · {posicao}º de {total} pelo risco', { posicao: m.posicao_na_base, total: fmt.numero(m.total_na_base) })
                    : ''}
                </div>
                <div className="mt-3">
                  <span className={cx('inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-rotulo font-[520]', ESTADO[m.estado].classe)}>
                    <span className={cx('h-1.5 w-1.5 rounded-full', ESTADO[m.estado].ponto)} aria-hidden="true" />
                    {ESTADO[m.estado].rotulo}
                  </span>
                </div>
              </div>
              <button type="button" onClick={onClose} aria-label={t('Fechar')} className="rounded-[8px] p-2 text-silver hover:bg-paper/[0.06] hover:text-paper">
                <IconClose />
              </button>
            </header>

            {/* Por que este cliente está em risco: a pontuação, quem decidiu e o que pesou */}
            <section className="rounded-[14px] border border-line bg-ink/40 p-4" data-secao="risco">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="t-h3 text-paper">{t('Por que este cliente está em risco')}</h3>
                <span className="t-number text-orange">{pontuacao !== null ? `${Math.round(pontuacao * 100)}%` : '—'}</span>
              </div>
              <p className="t-apoio mt-1 text-silver">
                {m.risco.decidido_por === 'modelo'
                  ? t('Risco de cancelar, estimado pelo modelo de IA a partir do comportamento.')
                  : m.risco.decidido_por === 'regua'
                    ? t('Pontuação da régua de regras fixas (de 0 a 100%), não uma probabilidade.')
                    : t('A pontuação de risco registrada quando a oferta foi decidida.')}
              </p>
              {m.risco.motivo ? <p className="t-apoio mt-3 text-paper/90">{m.risco.motivo}</p> : null}
              {m.risco.contribuicoes.length ? (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {m.risco.contribuicoes.map((c, i) => (
                    <li key={`${c.fator}-${i}`} className="flex items-center justify-between gap-3 text-apoio">
                      <span className="text-paper">{c.fator}</span>
                      {c.efeito ? (
                        <span className={cx('text-right font-[560]', c.efeito === 'aumentou' ? 'text-danger-texto' : 'text-ok')}>
                          {c.efeito === 'aumentou' ? t('Aumentou o risco') : t('Reduziu o risco')}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : m.risco.decidido_por === 'regua' ? (
                <p className="t-label mt-3 text-muted">{t('Sem fatores registrados: o risco deste cliente foi decidido pela régua de regras fixas.')}</p>
              ) : null}
            </section>

            {/* As mensagens: a rodada mais recente (e a escolhida, se for de outra) */}
            <section ref={secaoDaEscolha} data-secao="escolha">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="t-h3 text-paper">
                  {t('Mensagens sugeridas')}
                  {rodada > 1 ? <span className="t-label ml-2 text-silver">{t('{n}ª rodada', { n: rodada })}</span> : null}
                </h3>
                {aguardando && m.escolha_ate ? <span className="t-label text-warn">{textoDoPrazo(m.escolha_ate, agoraDaTela())}</span> : null}
              </div>
              <p className="t-apoio mt-1 text-silver">
                {m.texto_apagado
                  ? t('O texto destas mensagens foi apagado depois do prazo de guarda; ficou a abordagem.')
                  : aguardando
                    ? t('Oferta escolhida: {oferta}. Escolha uma mensagem ou peça outras três. Sem escolha no prazo, a recomendada é enviada.', { oferta: m.oferta.replace(/^./, (c) => c.toLowerCase()) })
                    : t('Oferta escolhida: {oferta}. A mensagem marcada como escolhida é a que saiu.', { oferta: m.oferta.replace(/^./, (c) => c.toLowerCase()) })}
              </p>
              {erroAcao ? (
                <p role="alert" className="mt-3 rounded-[10px] border border-danger/40 bg-danger/[0.06] px-3 py-2 text-apoio text-danger-aviso">
                  {erroAcao}
                </p>
              ) : null}
              {aviso ? (
                <p role="status" className="mt-3 rounded-[10px] border border-warn/40 bg-warn/[0.06] px-3 py-2 text-apoio text-paper">
                  {aviso}
                </p>
              ) : null}
              <ul className={cx('mt-3 flex flex-col gap-3 transition-opacity', ocupado && 'opacity-40')} aria-busy={ocupado}>
                {mostradas.map((s) => (
                  <li
                    key={`${s.abordagem}-${s.rodada}`}
                    data-abordagem={s.abordagem}
                    className={cx('rounded-[14px] border p-4', s.escolhida ? 'border-ok/45 bg-ok/[0.05]' : s.recomendada && aguardando ? 'border-orange/50 bg-orange/[0.06]' : 'border-line bg-ink/30')}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-[600] text-paper">{ABORDAGEM_VOLUNTARIO[s.abordagem]}</span>
                      {s.recomendada ? <Badge tone="orange">{t('Recomendada')}</Badge> : null}
                      {s.escolhida ? <Badge tone="ok">{t('Escolhida')}</Badge> : null}
                      {s.gerada ? <Badge tone="neutral">{t('Escrita pela IA')}</Badge> : null}
                      <Badge tone="neutral" className="ml-auto">{m.canal_legivel}</Badge>
                    </div>
                    <p className="t-apoio mt-2 whitespace-pre-line text-paper/90">{s.texto ?? SEM_TEXTO()}</p>
                    {aguardando ? (
                      <div className="mt-3 flex justify-end">
                        <Button size="sm" variant={s.recomendada ? 'primary' : 'ghost'} disabled={ocupado} onClick={() => escolher(s)}>
                          <IconCheck width={15} height={15} /> {t('Enviar esta')}
                        </Button>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
              {aguardando ? (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="ghost" onClick={regerar} disabled={ocupado}>
                    <IconRefresh width={15} height={15} className={regerando ? 'animate-spin' : undefined} />
                    {regerando ? t('Gerando outras três…') : t('Quero outro tipo de mensagem')}
                  </Button>
                  <span className="t-label text-muted">{t('A oferta continua a mesma; muda o jeito de dizer.')}</span>
                </div>
              ) : null}
            </section>

            {/* Linha do tempo */}
            <section>
              <h3 className="t-h3 text-paper">{t('Linha do tempo')}</h3>
              <ol className="relative mt-4 ml-2 flex flex-col gap-5 border-l border-line pl-6">
                {m.linha_do_tempo.map((e, i) => {
                  const f = fatoDaLinhaDoTempo(e)
                  return (
                    <li key={i} className="relative">
                      <span aria-hidden="true" className={cx('absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full ring-4 ring-card', TOM[f.tom])} />
                      <div className="t-label text-muted">{fmt.dataHora(e.em)}</div>
                      <div className="font-[560] text-paper">{f.titulo}</div>
                      {f.detalhe ? <div className="t-apoio text-silver">{f.detalhe}</div> : null}
                    </li>
                  )
                })}
                {aguardando && m.escolha_ate ? (
                  <li className="relative">
                    <span aria-hidden="true" className="absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full bg-warn ring-4 ring-card" />
                    <div className="t-label text-muted">{fmt.dataHora(m.escolha_ate)}</div>
                    <div className="font-[560] text-paper">{t('Envio automático da recomendada')}</div>
                    <div className="t-apoio text-silver">{t('Se ninguém escolher até aqui.')}</div>
                  </li>
                ) : null}
              </ol>
            </section>
          </div>
        )}
      </motion.aside>
    </div>
  )
}

