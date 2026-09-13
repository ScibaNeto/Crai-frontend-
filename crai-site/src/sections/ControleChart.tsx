import { SelfDrawingSvg } from '../components/motion/SelfDrawingSvg'
import type { PontoSerie } from '../data/mockPainel'
import { areaEntre, caminhoSuave, escalarSerie } from '../lib/chart'
import { cx } from '../lib/cx'

interface ControleChartProps {
  serie: PontoSerie[]
  titulo: string
  descricao: string
  rotulos: { controle: string; tratado: string; ganho: string }
  className?: string
}

const W = 640
const H = 260
const MY = 14

/** Controle × tratado, com a área entre as linhas em laranja. Linhas se desenham ao entrar na tela. */
export function ControleChart({ serie, titulo, descricao, rotulos, className }: ControleChartProps) {
  const controle = serie.map((p) => p.controle)
  const tratado = serie.map((p) => p.tratado)
  const min = Math.floor((Math.min(...controle) - 4) / 10) * 10
  const max = Math.ceil((Math.max(...tratado) + 4) / 10) * 10
  const escala = { largura: W, altura: H, min, max, margemX: 6, margemY: MY }
  const ptsControle = escalarSerie(controle, escala)
  const ptsTratado = escalarSerie(tratado, escala)

  const ticks = [max, (min + max) / 2, min]
  const yDe = (v: number) => MY + (1 - (v - min) / (max - min)) * (H - MY * 2)

  const passoRotulo = Math.max(1, Math.ceil(serie.length / 6))
  const rotulosX = serie.filter((_, i) => i % passoRotulo === 0 || i === serie.length - 1)
  const ultimoT = ptsTratado[ptsTratado.length - 1]
  const ultimoC = ptsControle[ptsControle.length - 1]

  return (
    <div className={cx('w-full', className)}>
      <div className="relative pl-10">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-9">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 text-[12px] text-silver tabular"
              style={{ top: `${(yDe(t) / H) * 100}%` }}
            >
              {`${Math.round(t)}%`}
            </span>
          ))}
        </div>
        <SelfDrawingSvg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full overflow-visible"
          title={titulo}
          description={descricao}
          duration={900}
          stagger={420}
        >
          {ticks.map((t) => (
            <line key={t} x1={0} x2={W} y1={yDe(t)} y2={yDe(t)} stroke="var(--color-line)" strokeWidth={1} />
          ))}
          <path data-fade={2} data-duration={600} d={areaEntre(ptsTratado, ptsControle)} fill="var(--color-orange)" fillOpacity={0.12} />
          <path data-draw={0} d={caminhoSuave(ptsControle)} fill="none" stroke="var(--color-silver)" strokeWidth={2.5} strokeLinecap="round" />
          <path data-draw={1} d={caminhoSuave(ptsTratado)} fill="none" stroke="var(--color-orange)" strokeWidth={3} strokeLinecap="round" />
          <circle data-fade={2} cx={ultimoC[0]} cy={ultimoC[1]} r={4} fill="var(--color-silver)" />
          <circle data-fade={2} cx={ultimoT[0]} cy={ultimoT[1]} r={4.5} fill="var(--color-orange)" />
        </SelfDrawingSvg>
      </div>

      <div aria-hidden="true" className="mt-3 flex justify-between pl-10 text-[12px] text-silver tabular">
        {rotulosX.map((p, i) => (
          // No mobile, só rótulos alternados (e sempre o último) para não encavalar.
          <span key={p.rotulo} className={i % 2 === 1 && i !== rotulosX.length - 1 ? 'hidden sm:inline' : undefined}>
            {p.rotulo}
          </span>
        ))}
      </div>

      <ul className="t-apoio mt-5 flex flex-wrap gap-x-6 gap-y-2 text-silver">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-5 bg-silver" />
          {rotulos.controle}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-5 bg-orange" />
          {rotulos.tratado}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-5 rounded-[2px] bg-orange/15" />
          {rotulos.ganho}
        </li>
      </ul>
    </div>
  )
}
