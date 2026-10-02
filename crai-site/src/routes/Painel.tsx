import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { IconRefresh, IconShield, IconUserSignal } from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { Skeleton } from '../components/motion/Skeleton'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { empresaPainel, ordemPeriodos, riscosCancelamento, type Periodo } from '../data/mockPainel'
import { cx } from '../lib/cx'
import { nomeExibicao } from '../lib/empresa'
import { useConteudo } from '../lib/i18n'
import { useSessao } from '../lib/useSessao'
import { PainelRecuperacao, SkeletonRecuperacao } from '../sections/PainelRecuperacao'

type Aba = 'recuperacao' | 'retencao'

const ICONES_ABA: Record<Aba, typeof IconRefresh> = {
  recuperacao: IconRefresh,
  retencao: IconUserSignal,
}

const bloco = 'rounded-[12px] border border-line bg-ink/40 transition-colors duration-300 hover:border-orange/30'

function SkeletonRetencao() {
  return (
    <div aria-hidden="true" className={cx(bloco, 'p-4 md:p-6')}>
      <Skeleton className="h-4 w-64 max-w-full" />
      <div className="mt-6 flex flex-col gap-5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="grid grid-cols-[1.4fr_2fr] items-center gap-4 md:grid-cols-[1.4fr_2.2fr_0.6fr_2fr]">
            <Skeleton className="h-3.5 w-full max-w-[150px]" />
            <Skeleton className="h-3.5 w-full max-w-[240px]" />
            <Skeleton className="hidden h-5 w-12 md:block" />
            <Skeleton className="hidden h-3.5 w-full max-w-[200px] md:block" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Retencao() {
  const { painel } = useConteudo()
  const { retencao } = painel
  return (
    <section className={bloco} aria-labelledby="retencao-titulo">
      <h2 id="retencao-titulo" className="px-4 pt-4 text-[15px] font-[560] text-paper md:px-6 md:pt-5">
        {retencao.titulo}
      </h2>
      <div className="mt-3 overflow-x-auto" role="region" aria-labelledby="retencao-titulo" tabIndex={0}>
        <table className="w-full min-w-[720px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-line text-silver">
              {retencao.colunas.map((coluna) => (
                <th key={coluna} scope="col" className="px-4 py-3 font-[500] md:px-6">
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {riscosCancelamento.map((r) => {
              const caso = retencao.casos[r.id]
              return (
                <tr key={r.id} className="border-b border-line last:border-0 hover:bg-paper/[0.025]">
                  <th scope="row" className="px-4 py-3.5 font-[450] md:px-6">
                    <span className="block text-paper">{r.assinante}</span>
                    <span className="block text-[13px] text-silver">{retencao.planosAssinante[r.plano]}</span>
                  </th>
                  <td className="px-4 py-3.5 text-silver md:px-6">{caso.sinal}</td>
                  <td className="px-4 py-3.5 md:px-6">
                    <Badge tone={r.risco === 'alto' ? 'beta' : 'neutral'}>{retencao.riscos[r.risco]}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-paper md:px-6">{caso.acao}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="t-apoio flex items-start gap-3 border-t border-line px-4 py-4 text-silver md:px-6">
        <IconShield size={18} className="mt-0.5 shrink-0" />
        {retencao.nota}
      </p>
    </section>
  )
}

/** Plano Standard: a aba de retenção explica o que falta em vez de mostrar dados que o plano não cobre. */
function RetencaoPremium() {
  const { painel } = useConteudo()
  const r = painel.retencaoPremium
  return (
    <section className={cx(bloco, 'flex flex-col items-start gap-4 p-5 md:p-8')}>
      <IconUserSignal size={24} className="text-silver" />
      <h2 className="t-h3">{r.titulo}</h2>
      <p className="t-body measure text-silver">{r.texto}</p>
      <Button to="/planos" variant="ghost" size="sm">
        {r.acao}
      </Button>
    </section>
  )
}

export function Painel() {
  const { painel } = useConteudo()
  const { empresa } = useSessao()
  // Logado com empresa: o cabeçalho é da empresa real; os números seguem de demonstração até a integração.
  const nomeEmpresa = empresa ? nomeExibicao(empresa) : empresaPainel
  const retencaoBloqueada = empresa?.plano === 'standard'
  const [periodo, setPeriodo] = useState<Periodo>('30d')
  const [aba, setAba] = useState<Aba>('recuperacao')
  const [carregando, setCarregando] = useState(true)
  const abasRef = useRef<(HTMLButtonElement | null)[]>([])
  const periodosRef = useRef<(HTMLButtonElement | null)[]>([])

  // Skeleton de 900ms simulados na montagem e a cada troca de período.
  useEffect(() => {
    if (!carregando) return
    const t = window.setTimeout(() => setCarregando(false), 900)
    return () => window.clearTimeout(t)
  }, [carregando, periodo])

  function trocarPeriodo(p: Periodo) {
    if (p === periodo) return
    setPeriodo(p)
    setCarregando(true)
  }

  const abaAtual = painel.abas.find((a) => a.id === aba) ?? painel.abas[0]

  function navegarAbas(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const total = painel.abas.length
    let prox = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') prox = (i + 1) % total
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prox = (i - 1 + total) % total
    if (prox < 0) return
    e.preventDefault()
    setAba(painel.abas[prox].id as Aba)
    abasRef.current[prox]?.focus()
  }

  function navegarPeriodos(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const total = ordemPeriodos.length
    let prox = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') prox = (i + 1) % total
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prox = (i - 1 + total) % total
    if (prox < 0) return
    e.preventDefault()
    trocarPeriodo(ordemPeriodos[prox])
    periodosRef.current[prox]?.focus()
  }

  return (
    <PageShell titulo={painel.titulo} badge={<Badge tone="beta">{painel.badge}</Badge>} lead={empresa ? painel.leadConta : painel.lead}>
      <div className="container-site pb-24 md:pb-32">
        <div className="glass-panel anim-entrada overflow-hidden lg:grid lg:grid-cols-[96px_minmax(0,1fr)]">
          <aside className="border-b border-line bg-ink/40 lg:border-r lg:border-b-0">
            <div role="tablist" aria-label={painel.navAria} className="flex gap-1 p-2 lg:flex-col lg:p-3">
              {painel.abas.map((a, i) => {
                const id = a.id as Aba
                const Icone = ICONES_ABA[id]
                const sel = aba === id
                return (
                  <button
                    key={a.id}
                    ref={(el) => {
                      abasRef.current[i] = el
                    }}
                    id={`aba-${a.id}`}
                    type="button"
                    role="tab"
                    aria-selected={sel}
                    aria-controls={`painel-${a.id}`}
                    tabIndex={sel ? 0 : -1}
                    onClick={() => setAba(id)}
                    onKeyDown={(e) => navegarAbas(e, i)}
                    className={cx(
                      'relative flex flex-1 items-center justify-center gap-2 rounded-[8px] px-3 py-2.5 text-[13px] font-[520] transition-colors lg:flex-none lg:flex-col lg:gap-1.5 lg:py-3.5',
                      sel ? 'text-paper' : 'text-silver hover:text-paper',
                    )}
                  >
                    {sel ? (
                      <motion.span
                        layoutId="painel-aba-ativa"
                        className="absolute inset-0 rounded-[8px] border border-line bg-paper/[0.06]"
                        transition={{ type: 'spring', stiffness: 460, damping: 38 }}
                      />
                    ) : null}
                    <Icone size={20} className="relative" />
                    <span className="relative">{a.rotulo}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          <div className="min-w-0 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="t-apoio text-silver">{abaAtual.rotulo}</p>
                <p className="t-h3 mt-0.5">{nomeEmpresa}</p>
              </div>
              <div
                role="radiogroup"
                aria-label={painel.periodoAria}
                className="relative inline-grid w-full grid-cols-3 rounded-[6px] border border-line bg-ink/60 p-1 sm:w-auto"
              >
                {ordemPeriodos.map((p, i) => {
                  const sel = periodo === p
                  return (
                    <button
                      key={p}
                      ref={(el) => {
                        periodosRef.current[i] = el
                      }}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      tabIndex={sel ? 0 : -1}
                      onClick={() => trocarPeriodo(p)}
                      onKeyDown={(e) => navegarPeriodos(e, i)}
                      className={cx(
                        'relative h-9 rounded-[4px] px-1.5 text-[12px] font-[520] whitespace-nowrap transition-colors sm:px-4 sm:text-[13px]',
                        sel ? 'text-ink' : 'text-silver hover:text-paper',
                      )}
                    >
                      {sel ? (
                        <motion.span
                          layoutId="painel-periodo-ativo"
                          className="absolute inset-0 rounded-[4px] bg-paper"
                          transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                        />
                      ) : null}
                      <span className="relative">{painel.periodos[p]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div role="tabpanel" id={`painel-${aba}`} aria-labelledby={`aba-${aba}`} aria-busy={carregando} className="mt-8">
              <p className="sr-only" role="status">
                {carregando ? painel.carregando : ''}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {carregando ? (
                  <motion.div key={`esqueleto-${aba}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {aba === 'recuperacao' ? <SkeletonRecuperacao /> : <SkeletonRetencao />}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`dados-${aba}-${periodo}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {aba === 'recuperacao' ? <PainelRecuperacao periodo={periodo} somenteRecuperacao={retencaoBloqueada} /> : retencaoBloqueada ? <RetencaoPremium /> : <Retencao />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
