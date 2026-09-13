import { useState, type CSSProperties } from 'react'
import { IconArrowRight } from '../components/icons/Icons'
import { CountUp } from '../components/motion/CountUp'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field } from '../components/ui/Field'
import { Toggle } from '../components/ui/Toggle'
import { simuladorCopy } from '../data/conteudo'
import { empresa } from '../data/mockCadastro'
import { interpolar } from '../lib/cx'
import { formatBRLInteiro, formatNumero, somenteDigitos } from '../lib/format'
import { simular, type Plano } from '../lib/simulador'

const MIN = 10_000
const MAX = 700_000
const PASSO = 1_000

const opcoesPlano = simuladorCopy.planos as { value: Plano; label: string }[]

export function Simulador() {
  const [mrr, setMrr] = useState(empresa.mrr)
  const [plano, setPlano] = useState<Plano>('standard')
  const r = simular(mrr, plano)
  const s = simuladorCopy

  const noTrilho = Math.min(MAX, Math.max(MIN, mrr))
  const progresso = ((noTrilho - MIN) / (MAX - MIN)) * 100

  return (
    <section id="simulador" className="section-y scroll-mt-16 border-t border-line" aria-labelledby="simulador-titulo">
      <div className="container-site">
        <h2 id="simulador-titulo" className="t-h2">
          {s.titulo}
        </h2>
        <p className="t-body measure mt-4 text-silver">{s.lead}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
          <Card className="p-6 md:p-8 lg:col-span-5">
            <Field
              id="sim-mrr"
              label={s.mrrRotulo}
              inputMode="numeric"
              autoComplete="off"
              value={mrr ? formatNumero(mrr) : ''}
              onChange={(e) => setMrr(Number(somenteDigitos(e.target.value).slice(0, 9)))}
              className="tabular text-[20px] font-[560]"
            />

            <label htmlFor="sim-range" className="sr-only">
              {s.sliderRotulo}
            </label>
            <input
              id="sim-range"
              type="range"
              className="range mt-7"
              min={MIN}
              max={MAX}
              step={PASSO}
              value={noTrilho}
              aria-valuetext={formatBRLInteiro(noTrilho)}
              onChange={(e) => setMrr(Number(e.target.value))}
              style={{ '--p': `${progresso}%` } as CSSProperties}
            />
            <div aria-hidden="true" className="mt-1 flex justify-between text-[12px] text-silver tabular">
              <span>{formatBRLInteiro(MIN)}</span>
              <span>{formatBRLInteiro(MAX)}</span>
            </div>

            <p className="t-apoio mt-3 min-h-[21px] text-silver" role="status">
              {r.foraDaFaixa ? s.foraDaFaixa : ''}
            </p>

            <Toggle className="mt-6" id="sim-plano" label={s.planoRotulo} options={opcoesPlano} value={plano} onChange={setPlano} />
          </Card>

          <Card className="flex flex-col p-6 md:p-8 lg:col-span-7">
            <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <dt className="t-apoio text-silver">{s.saidas.risco}</dt>
                <dd className="t-number-sm mt-2 text-paper">
                  <CountUp value={r.receitaEmRisco} format={formatBRLInteiro} />
                </dd>
              </div>
              <div>
                <dt className="t-apoio text-silver">{s.saidas.ganho}</dt>
                <dd className="mt-2">
                  <span className="t-number-sm block text-paper">
                    <CountUp value={r.ganhoIncrementalRS} format={formatBRLInteiro} />
                  </span>
                  {plano === 'premium' ? (
                    <span className="t-apoio mt-1 block text-silver">
                      {interpolar(s.preservada, { valor: formatBRLInteiro(r.receitaPreservada) })}
                    </span>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt className="t-apoio text-silver">{s.saidas.taxa}</dt>
                <dd className="mt-2">
                  <span className="t-number-sm block text-paper">
                    <CountUp value={r.taxaCrai} format={formatBRLInteiro} />
                  </span>
                  <span className="t-apoio mt-1 block text-silver">
                    {plano === 'premium'
                      ? interpolar(s.taxaDetalhePremium, {
                          rec: formatBRLInteiro(r.taxaStandard),
                          ret: formatBRLInteiro(r.taxaRetencao),
                        })
                      : s.taxaDetalheStandard}
                  </span>
                </dd>
              </div>
              <div className="border-t border-line pt-6 sm:col-span-2">
                <dt className="t-apoio text-silver">{s.saidas.fica}</dt>
                <dd className="t-number mt-3 text-orange">
                  <CountUp value={r.ficaComVoce} format={formatBRLInteiro} />
                </dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="t-apoio max-w-[34em] text-silver">{s.premissas}</p>
              <Button to={s.acao.para} variant="ghost" className="group shrink-0">
                {s.acao.rotulo}
                <IconArrowRight size={18} />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
