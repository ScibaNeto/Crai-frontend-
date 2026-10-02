import { useId, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from 'react'
import { SelfDrawingSvg } from '../components/motion/SelfDrawingSvg'
import type { PontoAcumulado } from '../data/mockPainel'
import { areaEntre, caminhoSuave, escalarSerie } from '../lib/chart'
import { cx } from '../lib/cx'
import { useFormato } from '../lib/i18n'
import { useRotuloSerie } from '../lib/rotuloSerie'

interface ControleChartProps {
  serie: PontoAcumulado[]
  titulo: string
  descricao: string
  rotulos: { controle: string; tratado: string; ganho: string; explorarAria: string }
  className?: string
}

const TOPO = 18
const BASE = 10

// Abaixo de 640px o gráfico troca de proporção (mais alto) em vez de só encolher: na proporção do
// desktop ele ficaria com menos de 100px de altura no celular.
const TELA_ESTREITA = '(max-width: 639px)'

function assinarTela(avisar: () => void) {
  const mq = window.matchMedia(TELA_ESTREITA)
  mq.addEventListener('change', avisar)
  return () => mq.removeEventListener('change', avisar)
}

function useTelaEstreita() {
  return useSyncExternalStore(
    assinarTela,
    () => window.matchMedia(TELA_ESTREITA).matches,
    () => false,
  )
}

/** Teto "redondo" do eixo (1, 1,2, 1,5, 2, 2,5, 3… × 10ⁿ), para os rótulos saírem em números cheios. */
function tetoRedondo(valor: number) {
  const base = 10 ** Math.floor(Math.log10(valor))
  const passo = [1, 1.2, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10].find((m) => m * base >= valor) ?? 10
  return passo * base
}

/**
 * Receita recuperada acumulada no período: com a CRAI × grupo de controle.
 * As duas linhas saem juntas e se afastam; a cunha laranja entre elas é o ganho incremental — a mesma
 * leitura da barra do resumo (cinza = voltaria sozinho, laranja = o que a CRAI trouxe).
 * Passar o cursor (ou focar e usar as setas) mostra a leitura de cada ponto.
 */
export function ControleChart({ serie, titulo, descricao, rotulos, className }: ControleChartProps) {
  const rotular = useRotuloSerie()
  const f = useFormato()
  const uid = useId().replace(/:/g, '')
  const [ativo, setAtivo] = useState<number | null>(null)
  const estreita = useTelaEstreita()
  const W = estreita ? 320 : 640
  const H = estreita ? 230 : 250

  const max = tetoRedondo(Math.max(...serie.map((p) => p.tratado)))
  const escala = { largura: W, altura: H, min: 0, max, margemX: 0, margemY: 0 }
  // Faixa útil entre TOPO e H - BASE, para a linha do zero não colar na borda.
  const yDe = (v: number) => TOPO + (1 - v / max) * (H - TOPO - BASE)
  const pontos = (valores: number[]) => escalarSerie(valores, escala).map(([x], i) => [x, yDe(valores[i])] as [number, number])
  const ptsControle = pontos(serie.map((p) => p.controle))
  const ptsTratado = pontos(serie.map((p) => p.tratado))
  const y0 = yDe(0)

  const ticks = [max, max / 2, 0]
  const fim = serie.length - 1
  const fimT = ptsTratado[fim]
  const fimC = ptsControle[fim]
  const ganhoFinal = serie[fim].tratado - serie[fim].controle

  const passoRotulo = Math.max(1, Math.ceil(serie.length / 6))
  const rotulosX = serie.filter((_, i) => i % passoRotulo === 0 || i === fim).map((p) => rotular(p.rotulo))

  const areaControle = `${caminhoSuave(ptsControle)} L${W} ${y0} L0 ${y0} Z`

  function aoMover(e: PointerEvent<HTMLDivElement>) {
    const caixa = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - caixa.left) / caixa.width) * W
    let perto = 0
    for (let i = 1; i < ptsTratado.length; i++) {
      if (Math.abs(ptsTratado[i][0] - x) < Math.abs(ptsTratado[perto][0] - x)) perto = i
    }
    setAtivo(perto)
  }

  function aoTeclar(e: KeyboardEvent<HTMLDivElement>) {
    let prox = -1
    if (e.key === 'ArrowRight') prox = Math.min(fim, (ativo ?? -1) + 1)
    if (e.key === 'ArrowLeft') prox = Math.max(0, (ativo ?? serie.length) - 1)
    if (e.key === 'Home') prox = 0
    if (e.key === 'End') prox = fim
    if (e.key === 'Escape') {
      setAtivo(null)
      return
    }
    if (prox < 0) return
    e.preventDefault()
    setAtivo(prox)
  }

  const ponto = ativo === null ? null : serie[ativo]
  const xAtivo = ativo === null ? 0 : (ptsTratado[ativo][0] / W) * 100
  const pct = (y: number) => `${(y / H) * 100}%`

  return (
    <div className={cx('w-full', className)}>
      {/* Calha à esquerda para o eixo e à direita para os valores finais de cada linha. */}
      <div className="relative pr-[66px] sm:pr-[70px] sm:pl-[58px]">
        {/* Eixo: na calha da esquerda; no celular, por dentro do gráfico, sobre cada linha de grade. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[1] sm:w-[50px]">
          {ticks.map((t) => (
            <span
              key={t}
              className={cx(
                'absolute left-0 font-mono text-[11px] whitespace-nowrap text-silver max-sm:-translate-y-[125%] sm:right-0 sm:left-auto sm:-translate-y-1/2',
                t === 0 && 'max-sm:hidden',
              )}
              style={{ top: pct(yDe(t)) }}
            >
              {f.brlInteiro(t)}
            </span>
          ))}
        </div>

        <div
          className="relative cursor-crosshair rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
          role="group"
          aria-label={rotulos.explorarAria}
          tabIndex={0}
          onPointerMove={aoMover}
          onPointerDown={aoMover}
          onPointerLeave={() => setAtivo(null)}
          onFocus={() => setAtivo((i) => i ?? fim)}
          onBlur={() => setAtivo(null)}
          onKeyDown={aoTeclar}
        >
          <SelfDrawingSvg
            key={W}
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full overflow-visible"
            title={titulo}
            description={descricao}
            duration={1000}
            stagger={260}
          >
            <defs>
              {/* A cunha ganha corpo conforme a diferença abre, da esquerda para a direita. */}
              <linearGradient id={`${uid}-cunha`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="var(--color-orange)" stopOpacity="0.1" />
                <stop offset="1" stopColor="var(--color-orange)" stopOpacity="0.42" />
              </linearGradient>
              <linearGradient id={`${uid}-base`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--color-silver)" stopOpacity="0.2" />
                <stop offset="1" stopColor="var(--color-silver)" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {ticks.map((t) => (
              <line
                key={t}
                x1={0}
                x2={W}
                y1={yDe(t)}
                y2={yDe(t)}
                stroke="var(--color-silver)"
                strokeOpacity={t === 0 ? 0.4 : 0.16}
                strokeWidth={1}
                strokeDasharray={t === 0 ? undefined : '2 5'}
              />
            ))}

            <path data-fade={1} data-duration={700} d={areaControle} fill={`url(#${uid}-base)`} />
            <path data-fade={2} data-duration={800} d={areaEntre(ptsTratado, ptsControle)} fill={`url(#${uid}-cunha)`} />
            <path data-draw={0} d={caminhoSuave(ptsControle)} fill="none" stroke="var(--color-silver)" strokeWidth={2} strokeLinecap="round" />
            <path data-draw={1} d={caminhoSuave(ptsTratado)} fill="none" stroke="var(--color-orange)" strokeWidth={2.5} strokeLinecap="round" />

            {/* Régua do ganho: liga os dois pontos finais. */}
            <line data-fade={4} x1={W} x2={W} y1={fimT[1] + 7} y2={fimC[1] - 7} stroke="var(--color-orange)" strokeWidth={1.5} strokeDasharray="3 4" />
            <circle data-fade={3} cx={fimC[0]} cy={fimC[1]} r={4.5} fill="var(--color-silver)" stroke="var(--color-ink)" strokeWidth={2} />
            <circle data-fade={3} cx={fimT[0]} cy={fimT[1]} r={5} fill="var(--color-orange)" stroke="var(--color-ink)" strokeWidth={2} />
          </SelfDrawingSvg>

          {/* Ganho no fim do período, dentro da cunha. */}
          <p
            className="anim-entrada tabular pointer-events-none absolute right-3 -translate-y-1/2 rounded-full border border-orange/45 bg-ink/85 px-2.5 py-1 text-[12px] font-[620] whitespace-nowrap text-paper backdrop-blur-sm sm:text-[13px]"
            style={{ top: `calc(${pct((fimT[1] + fimC[1]) / 2)} + 7px)`, animationDelay: '900ms' }}
          >
            <span className="sr-only">{rotulos.ganho}: </span>+{f.brlInteiro(ganhoFinal)}
          </p>

          {/* Valor final de cada linha, na calha da direita. */}
          <p className="tabular pointer-events-none absolute left-full ml-2.5 -translate-y-1/2 text-[12.5px] font-[620] whitespace-nowrap text-paper" style={{ top: pct(fimT[1]) }}>
            <span className="sr-only">{rotulos.tratado}: </span>
            {f.brlInteiro(serie[fim].tratado)}
          </p>
          <p className="tabular pointer-events-none absolute left-full ml-2.5 -translate-y-1/2 text-[12.5px] font-[520] whitespace-nowrap text-silver" style={{ top: pct(fimC[1]) }}>
            <span className="sr-only">{rotulos.controle}: </span>
            {f.brlInteiro(serie[fim].controle)}
          </p>

          {ponto && ativo !== null ? (
            <>
              <span aria-hidden="true" className="pointer-events-none absolute w-px bg-silver/50" style={{ left: `${xAtivo}%`, top: pct(TOPO), bottom: pct(H - y0) }} />
              {[
                { y: ptsTratado[ativo][1], cor: 'bg-orange' },
                { y: ptsControle[ativo][1], cor: 'bg-silver' },
              ].map((m) => (
                <span
                  key={m.cor}
                  aria-hidden="true"
                  className={cx('pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-ink', m.cor)}
                  style={{ left: `${xAtivo}%`, top: pct(m.y) }}
                />
              ))}
              <div
                role="status"
                className={cx(
                  'pointer-events-none absolute top-0 z-10 w-max min-w-[176px] rounded-[10px] border border-line bg-slate px-3 py-2.5 text-[12.5px] shadow-[0_14px_30px_-14px_var(--color-shadow)]',
                  xAtivo > 50 ? '-translate-x-full' : '',
                )}
                style={{ left: `calc(${xAtivo}% + ${xAtivo > 50 ? -14 : 14}px)` }}
              >
                <p className="font-[560] text-paper">{rotular(ponto.rotulo)}</p>
                <dl className="tabular mt-1.5 grid grid-cols-[auto_auto] items-center gap-x-5 gap-y-1 text-silver">
                  <dt className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-0.5 w-3.5 bg-orange" />
                    {rotulos.tratado}
                  </dt>
                  <dd className="text-right font-[560] text-paper">{f.brlInteiro(ponto.tratado)}</dd>
                  <dt className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-0.5 w-3.5 bg-silver" />
                    {rotulos.controle}
                  </dt>
                  <dd className="text-right font-[560] text-paper">{f.brlInteiro(ponto.controle)}</dd>
                  <dt className="mt-1 border-t border-line pt-1.5">{rotulos.ganho}</dt>
                  <dd className="mt-1 border-t border-line pt-1.5 text-right font-[620] text-paper">+{f.brlInteiro(ponto.tratado - ponto.controle)}</dd>
                </dl>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div aria-hidden="true" className="mt-3 flex justify-between pr-[66px] font-mono text-[11px] text-silver sm:pr-[70px] sm:pl-[58px]">
        {rotulosX.map((rotulo, i) => (
          // No mobile, só rótulos alternados (e sempre o último) para não encavalar.
          <span key={rotulo} className={i % 2 === 1 && i !== rotulosX.length - 1 ? 'hidden sm:inline' : undefined}>
            {rotulo}
          </span>
        ))}
      </div>

      <ul className="t-apoio mt-5 flex flex-wrap gap-x-6 gap-y-2 text-silver">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-5 bg-orange" />
          {rotulos.tratado}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-5 bg-silver" />
          {rotulos.controle}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-5 rounded-[2px] bg-orange/30" />
          {rotulos.ganho}
        </li>
      </ul>
    </div>
  )
}
