import { LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'
import { CountUp } from '../components/motion/CountUp'
import { Skeleton } from '../components/motion/Skeleton'
import { cobrancas, periodos, serieAcumulada, type JanelaEstimada, type MotivoFalha, type Periodo, type StatusCobranca } from '../data/mockPainel'
import { cx, interpolar } from '../lib/cx'
import { useConteudo, useFormato } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'
import { useReducedMotion } from '../lib/useReducedMotion'
import { ControleChart } from './ControleChart'
import { StatusCobrancaTag } from './StatusCobrancaTag'

const bloco = 'min-w-0 rounded-[14px] border border-line bg-ink/40'
const rotuloBloco = 'text-[12px] font-[600] tracking-[0.14em] text-silver uppercase'

/** Ordem fixa dos status nos filtros (a mesma leitura do fluxo: do que voltou ao que não voltou). */
const ORDEM_STATUS: StatusCobranca[] = ['recuperada', 'reagendada', 'tentativa', 'controle', 'naoRecuperada']

const contagemStatus = ORDEM_STATUS.map((status) => ({ status, n: cobrancas.filter((c) => c.status === status).length }))

const contagemMotivos = (['saldo', 'limite', 'instituicao', 'revogada'] as MotivoFalha[])
  .map((motivo) => ({ motivo, n: cobrancas.filter((c) => c.motivo === motivo).length }))
  .sort((a, b) => b.n - a.n)

/** Régua de 24h com a janela estimada de saldo marcada: a inferência de liquidez, vista de relance. */
function ReguaJanela({ janela }: { janela: JanelaEstimada }) {
  return (
    <span aria-hidden="true" className="relative block h-1.5 w-full max-w-[150px] rounded-full bg-paper/10">
      <span
        className="absolute inset-y-0 rounded-full bg-orange"
        style={{ left: `${(janela.de / 24) * 100}%`, width: `${((janela.ate - janela.de) / 24) * 100}%` }}
      />
    </span>
  )
}

/**
 * Abertura: o que voltou ao caixa, em uma barra só. A receita em risco se divide em três partes —
 * o que voltaria sozinho (grupo de controle), o ganho incremental da CRAI e o que não voltou.
 */
function Resumo({ periodo }: { periodo: Periodo }) {
  const { painel } = useConteudo()
  const f = useFormato()
  const reduced = useReducedMotion()
  const r = painel.resumo
  const { receitaEmRisco, receitaRecuperada, ganhoIncremental } = periodos[periodo].indicadores
  const base = receitaRecuperada - ganhoIncremental
  const aberto = receitaEmRisco - receitaRecuperada

  const partes = [
    { id: 'base', rotulo: r.base, detalhe: r.baseDetalhe, valor: base, cor: 'bg-silver' },
    { id: 'ganho', rotulo: r.ganho, detalhe: r.ganhoDetalhe, valor: ganhoIncremental, cor: 'bg-orange' },
    { id: 'aberto', rotulo: r.aberto, detalhe: r.abertoDetalhe, valor: aberto, cor: 'bg-paper/10' },
  ]

  return (
    <motion.section layout className={cx(bloco, 'relative order-1 overflow-hidden p-5 md:p-7 xl:order-none')} aria-labelledby="resumo-titulo">
      <span
        aria-hidden="true"
        className="motion-decor pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(239,147,17,0.2),transparent_68%)]"
      />
      <div className="relative">
        <h2 id="resumo-titulo" className={rotuloBloco}>
          {r.titulo}
        </h2>
        <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
          <p className="t-number text-paper">
            <CountUp value={receitaRecuperada} format={f.brlInteiro} />
          </p>
          <p className="t-apoio pb-1 text-silver">{interpolar(r.deRisco, { risco: f.brlInteiro(receitaEmRisco) })}</p>
          <p className="tabular mb-1 ml-auto inline-flex items-center gap-2 rounded-full border border-orange/35 bg-orange/[0.08] px-3 py-1 text-[13px] font-[560] text-paper">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
            {interpolar(r.recuperado, { p: f.percent(receitaRecuperada / receitaEmRisco) })}
          </p>
        </div>

        <div
          role="img"
          aria-label={interpolar(r.barraAria, { base: f.brlInteiro(base), ganho: f.brlInteiro(ganhoIncremental), aberto: f.brlInteiro(aberto) })}
          className="mt-6 flex h-3.5 gap-0.5"
        >
          {partes.map((p, i) => (
            <motion.span
              key={p.id}
              className={cx('h-full origin-left', p.cor, i === 0 && 'rounded-l-full', i === partes.length - 1 && 'rounded-r-full')}
              style={{ width: `${(p.valor / receitaEmRisco) * 100}%` }}
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.14, ease: EASE_EXPO }}
            />
          ))}
        </div>

        <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-3">
          {partes.map((p) => (
            <div key={p.id} className="min-w-0">
              <dt className="flex items-center gap-2 text-[13px] font-[520] text-paper">
                <span aria-hidden="true" className={cx('h-2.5 w-2.5 shrink-0 rounded-[3px]', p.cor, p.id === 'aberto' && 'border border-line')} />
                {p.rotulo}
              </dt>
              <dd className="mt-1.5">
                <span className="t-number-sm block text-paper">
                  <CountUp value={p.valor} format={f.brlInteiro} />
                </span>
                <span className="mt-1 block text-[13px] leading-[1.4] text-silver">{p.detalhe}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.section>
  )
}

/** Extrato serrilhado: como a taxa do período foi formada e quanto ficou com o cliente. */
function Extrato({ periodo, somenteRecuperacao }: { periodo: Periodo; somenteRecuperacao: boolean }) {
  const { painel } = useConteudo()
  const f = useFormato()
  const e = painel.extrato
  const ind = periodos[periodo].indicadores
  // Standard só paga (e só mede) a recuperação.
  const taxa = somenteRecuperacao ? ind.taxaRecuperacao : ind.taxaCrai
  const bruto = somenteRecuperacao ? ind.ganhoIncremental : ind.ganhoIncremental + ind.receitaPreservada

  const linhas = [
    { rotulo: e.ganho, valor: f.brl(ind.ganhoIncremental), forte: true },
    { rotulo: e.taxaRecuperacao, valor: `− ${f.brl(ind.taxaRecuperacao)}`, forte: false },
    ...(somenteRecuperacao
      ? []
      : [
          { rotulo: e.preservada, valor: f.brl(ind.receitaPreservada), forte: true },
          { rotulo: e.taxaRetencao, valor: `− ${f.brl(ind.taxaRetencao)}`, forte: false },
        ]),
  ]

  return (
    <motion.section layout className="order-2 min-w-0 xl:order-none" aria-labelledby="extrato-titulo">
      <div className="receipt flex h-full flex-col rounded-b-[14px] bg-paper/[0.05] px-5 pt-8 pb-5 md:px-6">
        <h2 id="extrato-titulo" className={rotuloBloco}>
          {e.titulo}
        </h2>
        <dl className="tabular mt-4 flex flex-col text-[13.5px]">
          {linhas.map((l) => (
            <div key={l.rotulo} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-2.5">
              <dt className={l.forte ? 'text-paper' : 'text-silver'}>{l.rotulo}</dt>
              <dd className={cx('whitespace-nowrap', l.forte ? 'font-[560] text-paper' : 'text-silver')}>{l.valor}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-silver">{e.total}</dt>
            <dd className="font-[560] whitespace-nowrap text-paper">{f.brl(taxa)}</dd>
          </div>
        </dl>
        <div className="mt-auto border-t border-paper/70 pt-4">
          <p className="flex items-center gap-2 text-[13px] font-[520] text-paper">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            {e.fica}
          </p>
          <p className="t-number-sm mt-1.5 text-paper">
            <CountUp value={bruto - taxa} format={f.brl} />
          </p>
          <p className="mt-2 text-[12.5px] leading-[1.45] text-silver">{e.nota}</p>
        </div>
      </div>
    </motion.section>
  )
}

function Curva({ periodo }: { periodo: Periodo }) {
  const g = useConteudo().painel.grafico

  return (
    <motion.section layout className={cx(bloco, 'order-3 p-5 md:p-7 xl:order-none xl:flex-1')} aria-labelledby="grafico-titulo">
      <h2 id="grafico-titulo" className="text-[15px] font-[560] text-paper">
        {g.titulo}
      </h2>
      <p className="t-apoio mt-1 max-w-[62ch] text-silver">{g.descricao}</p>
      <ControleChart className="mt-7" serie={serieAcumulada(periodo)} titulo={g.titulo} descricao={g.descricao} rotulos={g} />
    </motion.section>
  )
}

function Falhas() {
  const { painel } = useConteudo()
  const f = useFormato()
  const reduced = useReducedMotion()
  const maior = contagemMotivos[0].n

  return (
    <motion.section layout className={cx(bloco, 'order-4 flex flex-col p-5 md:p-6 xl:order-none xl:flex-1')} aria-labelledby="falhas-titulo">
      <h2 id="falhas-titulo" className="text-[15px] font-[560] text-paper">
        {painel.falhas.titulo}
      </h2>
      <p className="t-apoio mt-1 text-silver">{interpolar(painel.falhas.descricao, { n: cobrancas.length })}</p>
      <ul className="mt-6 flex flex-1 flex-col justify-around gap-5">
        {contagemMotivos.map((m, i) => (
          <li key={m.motivo} title={interpolar(painel.falhas.cobrancas, { n: m.n })}>
            <p className="flex items-baseline justify-between gap-3 text-[13.5px]">
              <span className="text-paper">{painel.motivos[m.motivo]}</span>
              <span className="tabular whitespace-nowrap text-silver">
                <span className="font-[600] text-paper">{m.n}</span> · {f.percent(m.n / cobrancas.length)}
              </span>
            </p>
            <span aria-hidden="true" className="mt-2 block h-1.5 rounded-full bg-paper/10">
              <motion.span
                className="block h-full origin-left rounded-full bg-orange"
                style={{ width: `${(m.n / maior) * 100}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: EASE_EXPO }}
              />
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

function Cobrancas() {
  const { painel } = useConteudo()
  const f = useFormato()
  const t = painel.tabela
  const [filtro, setFiltro] = useState<StatusCobranca | null>(null)
  const linhas = filtro ? cobrancas.filter((c) => c.status === filtro) : cobrancas

  const filtros: { id: StatusCobranca | null; rotulo: string; n: number }[] = [
    { id: null, rotulo: t.todas, n: cobrancas.length },
    ...contagemStatus.map((s) => ({ id: s.status, rotulo: painel.status[s.status], n: s.n })),
  ]

  return (
    <motion.section layout className={cx(bloco, 'order-5 xl:order-none xl:col-span-12')} aria-labelledby="tabela-titulo">
      <div className="flex flex-col gap-4 px-5 pt-5 md:px-7 md:pt-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 id="tabela-titulo" className="text-[15px] font-[560] text-paper">
          {t.titulo}
        </h2>
        <div role="group" aria-label={t.filtroAria} className="rail -mx-1 flex gap-1.5 overflow-x-auto px-1 py-1">
          {filtros.map((o) => {
            const sel = filtro === o.id
            return (
              <button
                key={o.id ?? 'todas'}
                type="button"
                aria-pressed={sel}
                onClick={() => setFiltro(o.id)}
                className={cx(
                  'tabular inline-flex h-8 shrink-0 items-center gap-2 rounded-full border px-3 text-[12.5px] font-[520] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
                  sel ? 'border-paper bg-paper text-ink' : 'border-line text-silver hover:border-silver/60 hover:text-paper',
                )}
              >
                {o.rotulo}
                <span className={sel ? 'opacity-70' : 'text-silver/80'}>{o.n}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto" role="region" aria-labelledby="tabela-titulo" tabIndex={0}>
        <table className="tabular w-full min-w-[720px] text-left text-[14px]">
          <thead>
            <tr className="border-y border-line text-[12.5px] text-silver">
              {t.colunasPainel.map((coluna, i) => (
                <th key={coluna} scope="col" className={cx('px-5 py-2.5 font-[500] md:px-7', i === 1 && 'text-right')}>
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((c) => (
              <tr key={c.id} className="border-b border-line transition-colors last:border-0 hover:bg-paper/[0.03]">
                <th scope="row" className="px-5 py-3 font-[450] md:px-7">
                  <span className="block text-paper">{c.assinante}</span>
                  <span className="block text-[12.5px] text-silver">{painel.motivos[c.motivo]}</span>
                </th>
                <td className="px-5 py-3 text-right font-[520] text-paper md:px-7">{f.brl(c.valor)}</td>
                <td className="px-5 py-3 text-silver md:px-7">
                  {c.janela ? (
                    <>
                      <ReguaJanela janela={c.janela} />
                      <span className="mt-1.5 block text-[12.5px]">{interpolar(t.janela, { ...c.janela })}</span>
                    </>
                  ) : (
                    t.semJanela
                  )}
                </td>
                <td className="px-5 py-3 text-silver md:px-7">{interpolar(t.tentativa, { n: c.tentativa })}</td>
                <td className="px-5 py-3 md:px-7">
                  <StatusCobrancaTag status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}

export function PainelRecuperacao({ periodo, somenteRecuperacao }: { periodo: Periodo; somenteRecuperacao: boolean }) {
  return (
    <LayoutGroup id="painel-dados">
      {/* Duas colunas no desktop (leitura à esquerda, contas à direita). No celular as colunas se
          desfazem (`contents`) e a ordem vira: resumo, extrato, curva, motivos, cobranças. */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="contents xl:col-span-8 xl:flex xl:min-w-0 xl:flex-col xl:gap-4">
          <Resumo periodo={periodo} />
          <Curva periodo={periodo} />
        </div>
        <div className="contents xl:col-span-4 xl:flex xl:min-w-0 xl:flex-col xl:gap-4">
          <Extrato periodo={periodo} somenteRecuperacao={somenteRecuperacao} />
          <Falhas />
        </div>
        <Cobrancas />
      </div>
    </LayoutGroup>
  )
}

export function SkeletonRecuperacao() {
  return (
    <div aria-hidden="true" className="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <div className={cx(bloco, 'p-5 md:p-7 xl:col-span-8')}>
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-4 h-10 w-44" />
        <Skeleton className="mt-7 h-3.5 w-full rounded-full" />
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-6 w-24" />
              <Skeleton className="mt-3 h-3 w-full max-w-[160px]" />
            </div>
          ))}
        </div>
      </div>
      <div className={cx(bloco, 'p-5 md:p-6 xl:col-span-4')}>
        <Skeleton className="h-3 w-32" />
        <div className="mt-6 flex flex-col gap-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between gap-4">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-8 h-7 w-32" />
      </div>
      <div className={cx(bloco, 'p-5 md:p-7 xl:col-span-8')}>
        <Skeleton className="h-4 w-56 max-w-full" />
        <div className="relative mt-6 ml-10 aspect-[640/260]">
          <Skeleton
            className="absolute inset-0 rounded-none"
            style={{ clipPath: 'polygon(0 62%, 14% 50%, 28% 40%, 44% 33%, 60% 27%, 78% 22%, 100% 18%, 100% 72%, 78% 70%, 56% 72%, 34% 70%, 14% 71%, 0 70%)' }}
          />
        </div>
      </div>
      <div className={cx(bloco, 'p-5 md:p-6 xl:col-span-4')}>
        <Skeleton className="h-4 w-32" />
        <div className="mt-7 flex flex-col gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className={cx(bloco, 'p-5 md:p-7 xl:col-span-12')}>
        <Skeleton className="h-4 w-36" />
        <div className="mt-5 flex flex-col gap-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_1.5fr] items-center gap-4 md:grid-cols-[2fr_0.8fr_1.6fr_0.6fr_1fr]">
              <Skeleton className="h-3.5 w-full max-w-[170px]" />
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="hidden h-3.5 w-8 md:block" />
              <Skeleton className="hidden h-3.5 w-24 md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
