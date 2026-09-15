import type { ReactNode } from 'react'
import { CountUp } from '../components/motion/CountUp'
import { useConteudo, useFormato } from '../lib/i18n'
import { cobrancas, periodos, serieReferencia } from '../data/mockPainel'
import { areaEntre, caminhoSuave, escalarSerie } from '../lib/chart'
import { StatusCobrancaTag } from './StatusCobrancaTag'

function Janela({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-slate">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-graphite" />
          <span className="h-2 w-2 rounded-full bg-graphite" />
          <span className="h-2 w-2 rounded-full bg-graphite" />
        </span>
        <span className="t-apoio text-silver">{titulo}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">{children}</div>
    </div>
  )
}

/** Três "prints" do painel como componentes React — não imagens. */
export function PainelPrints() {
  const { prints } = useConteudo().produto.painel
  const f = useFormato()
  const ind = periodos['30d'].indicadores
  const escala = { largura: 280, altura: 120, min: 30, max: 60, margemX: 2, margemY: 6 }
  const c = escalarSerie(
    serieReferencia.map((p) => p.controle),
    escala,
  )
  const t = escalarSerie(
    serieReferencia.map((p) => p.tratado),
    escala,
  )

  return (
    <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
      <li>
        <Janela titulo={prints.indicador}>
          <p className="t-number-sm mt-auto text-orange">
            <CountUp value={ind.ganhoIncremental} format={f.brl} />
          </p>
          <p className="t-apoio mt-2 text-silver">{prints.indicadorDetalhe}</p>
        </Janela>
      </li>
      <li>
        <Janela titulo={prints.grafico}>
          <svg viewBox="0 0 280 120" className="mt-auto block h-auto w-full" aria-hidden="true">
            <path d={areaEntre(t, c)} fill="var(--color-orange)" fillOpacity={0.12} />
            <path d={caminhoSuave(c)} fill="none" stroke="var(--color-silver)" strokeWidth={2} />
            <path d={caminhoSuave(t)} fill="none" stroke="var(--color-orange)" strokeWidth={2.5} />
          </svg>
        </Janela>
      </li>
      <li>
        <Janela titulo={prints.tabela}>
          <ul className="flex flex-col divide-y divide-line text-[14px]">
            {cobrancas.slice(0, 4).map((cb) => (
              <li key={cb.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="min-w-0 truncate text-paper">{cb.assinante}</span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="tabular text-silver">{f.brl(cb.valor)}</span>
                  <StatusCobrancaTag status={cb.status} compacto />
                </span>
              </li>
            ))}
          </ul>
        </Janela>
      </li>
    </ul>
  )
}
