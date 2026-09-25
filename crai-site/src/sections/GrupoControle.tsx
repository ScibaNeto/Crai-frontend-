import { motion } from 'framer-motion'
import { interpolar } from '../lib/cx'
import { useConteudo, useFormato } from '../lib/i18n'
import { useInView } from '../lib/useInView'
import { useReducedMotion } from '../lib/useReducedMotion'

// Exemplo com o cliente de referência do plano de negócio:
// MRR R$ 50 mil, 10% das cobranças falham → R$ 5.000 em risco no mês.
// As taxas de recuperação são ilustrativas (as mesmas do gráfico antigo):
// 58% − 38% = 20 p.p. de ganho incremental → R$ 1.000 → taxa Standard R$ 250.
const EXEMPLO = {
  receitaEmRisco: 5000,
  recuperacaoControle: 0.38,
  recuperacaoTratado: 0.58,
  taxaCrai: 0.25,
}

const largura = (v: number) => `${v * 100}%`

/** Controle × tratado em duas barras: o trecho laranja acima da linha tracejada é o ganho incremental. */
export function GrupoControle() {
  const { medicao } = useConteudo().produto
  const f = useFormato()
  const [ref, visivel] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -120px 0px' })
  const reduced = useReducedMotion()
  const mostrar = visivel || reduced

  const { receitaEmRisco, recuperacaoControle, recuperacaoTratado, taxaCrai } = EXEMPLO
  const controleRS = receitaEmRisco * recuperacaoControle
  const tratadoRS = receitaEmRisco * recuperacaoTratado
  const ganho = tratadoRS - controleRS
  const taxa = ganho * taxaCrai
  const ficaComVoce = ganho - taxa
  const incremental = recuperacaoTratado - recuperacaoControle

  const tempo = (atraso: number) =>
    reduced ? { duration: 0 } : { duration: 0.9, delay: atraso, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section className="section-y border-t border-line" aria-labelledby="medicao-titulo">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="medicao-titulo" className="t-h2">
            {medicao.titulo}
          </h2>
          <p className="t-body measure mt-5 text-silver">{medicao.texto}</p>

          <ol className="mt-10 flex flex-col gap-7">
            {medicao.passos.map((passo, i) => (
              <li key={passo.titulo} className="grid grid-cols-[2rem_1fr] gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-graphite text-sm text-silver tabular-nums"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-[560] text-paper">{passo.titulo}</p>
                  <p className="t-apoio mt-1 text-silver">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref} className="rounded-[14px] border border-line bg-slate p-5 sm:p-8 lg:col-span-7">
          <p className="t-apoio text-silver">{medicao.exemplo.titulo}</p>
          <p className="mt-1 text-2xl font-semibold text-paper tabular-nums">
            {interpolar(medicao.exemplo.emRisco, { valor: f.brlInteiro(receitaEmRisco) })}
          </p>

          <div className="mt-10 flex flex-col gap-8">
            <div>
              <div className="t-apoio mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="text-paper">{medicao.exemplo.controle}</span>
                <span className="text-silver tabular-nums">
                  {interpolar(medicao.exemplo.recuperado, { pct: f.percent(recuperacaoControle), valor: f.brlInteiro(controleRS) })}
                </span>
              </div>
              <div className="relative h-11 rounded-[8px] bg-ink/70">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-l-[8px] bg-graphite"
                  initial={{ width: 0 }}
                  animate={{ width: mostrar ? largura(recuperacaoControle) : 0 }}
                  transition={tempo(0)}
                />
                <Marcador posicao={recuperacaoControle} mostrar={mostrar} />
              </div>
            </div>

            <div>
              <div className="t-apoio mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="text-paper">{medicao.exemplo.tratado}</span>
                <span className="text-silver tabular-nums">
                  {interpolar(medicao.exemplo.recuperado, { pct: f.percent(recuperacaoTratado), valor: f.brlInteiro(tratadoRS) })}
                </span>
              </div>
              <div className="relative h-11 rounded-[8px] bg-ink/70">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-l-[8px] bg-graphite"
                  initial={{ width: 0 }}
                  animate={{ width: mostrar ? largura(recuperacaoControle) : 0 }}
                  transition={tempo(0)}
                />
                <motion.div
                  className="absolute inset-y-0 rounded-r-[8px] bg-orange"
                  style={{ left: largura(recuperacaoControle) }}
                  initial={{ width: 0 }}
                  animate={{ width: mostrar ? largura(incremental) : 0 }}
                  transition={tempo(0.8)}
                />
                <Marcador posicao={recuperacaoControle} mostrar={mostrar} />
              </div>

              {/* Chave sob o trecho laranja. O rótulo quebra linha em telas estreitas em vez de vazar do card. */}
              <motion.div
                className="relative mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: mostrar ? 1 : 0 }}
                transition={tempo(1.5)}
              >
                <div
                  className="absolute top-0 h-2 rounded-b-sm border-x border-b border-orange"
                  style={{ left: largura(recuperacaoControle), width: largura(incremental) }}
                />
                <p className="t-apoio pt-4 font-semibold text-orange tabular-nums" style={{ paddingLeft: largura(recuperacaoControle) }}>
                  {interpolar(medicao.exemplo.ganhoChave, { valor: f.brlInteiro(ganho) })}
                </p>
              </motion.div>
            </div>
          </div>

          <div className="t-label mt-6 flex flex-wrap gap-x-6 gap-y-2 text-silver">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-3 w-0 border-l-2 border-dashed border-paper/70" />
              {medicao.exemplo.legendaLinha}
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-orange" />
              {medicao.exemplo.legendaBase}
            </span>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            <div>
              <dt className="text-xs text-silver sm:text-sm">{medicao.exemplo.contaGanho}</dt>
              <dd className="mt-1 text-lg font-semibold text-paper tabular-nums sm:text-2xl">{f.brlInteiro(ganho)}</dd>
            </div>
            <div>
              <dt className="text-xs text-silver sm:text-sm">{interpolar(medicao.exemplo.contaTaxa, { pct: f.percent(taxaCrai) })}</dt>
              <dd className="mt-1 text-lg font-semibold text-orange tabular-nums sm:text-2xl">{f.brlInteiro(taxa)}</dd>
            </div>
            <div>
              <dt className="text-xs text-silver sm:text-sm">{medicao.exemplo.contaFica}</dt>
              <dd className="mt-1 text-lg font-semibold text-paper tabular-nums sm:text-2xl">{f.brlInteiro(ficaComVoce)}</dd>
            </div>
          </dl>

          <p className="mt-10 text-2xl leading-tight font-semibold tracking-tight text-paper sm:text-3xl">{medicao.legenda}</p>
          <p className="t-label mt-3 text-silver">{medicao.exemplo.nota}</p>
        </div>
      </div>
    </section>
  )
}

function Marcador({ posicao, mostrar }: { posicao: number; mostrar: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -top-2 -bottom-2 border-l-2 border-dashed border-paper/70"
      style={{ left: largura(posicao) }}
      initial={{ opacity: 0 }}
      animate={{ opacity: mostrar ? 1 : 0 }}
      transition={{ duration: 0.4, delay: mostrar ? 0.7 : 0 }}
    />
  )
}
