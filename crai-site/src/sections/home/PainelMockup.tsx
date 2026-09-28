import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IconActivity, IconCalendar, IconCheck, IconExit, IconMessage } from '../../components/icons/Icons'
import { CountUp } from '../../components/motion/CountUp'
import { cx } from '../../lib/cx'
import { useConteudo, useFormato } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { useInView } from '../../lib/useInView'
import { useReducedMotion } from '../../lib/useReducedMotion'

// Curvas acumuladas do mês (0..1): o grupo de controle também recupera um pouco sozinho
// (retentativas obrigatórias do Pix Automático); a diferença entre as duas é o ganho incremental.
const W = 320
const H = 120
function curva(ganho: number) {
  const pts: string[] = []
  for (let d = 0; d <= 30; d++) {
    const base = 1 - Math.exp(-d / 9)
    const v = base * (0.42 + ganho * Math.min(1, d / 18))
    pts.push(`${((d / 30) * W).toFixed(1)},${(H - 8 - v * (H - 20)).toFixed(1)}`)
  }
  return pts
}
const TRATADO = curva(0.46)
const CONTROLE = curva(0)
const linha = (p: string[]) => `M${p.join(' L')}`
const area = (p: string[]) => `${linha(p)} L${W},${H} L0,${H} Z`

const ICONE = {
  ok: { Icon: IconCheck, cor: 'text-[#5fd39a] bg-[#5fd39a]/10' },
  agenda: { Icon: IconCalendar, cor: 'text-amber bg-amber/10' },
  risco: { Icon: IconActivity, cor: 'text-orange bg-orange/10' },
  msg: { Icon: IconMessage, cor: 'text-paper bg-paper/10' },
  saida: { Icon: IconExit, cor: 'text-silver bg-silver/10' },
} as const

type Tipo = keyof typeof ICONE
const isTipo = (t: string): t is Tipo => t in ICONE

/** Mockup do painel (IrisFlow: aparelho em perspectiva com halo e anéis; SVGator: loading/feeds animados). */
export function PainelMockup({ ativo = true }: { ativo?: boolean }) {
  const { mockup } = useConteudo().home.hero
  const formato = useFormato()
  const reduced = useReducedMotion()
  const [ref, visivel] = useInView<HTMLDivElement>({ threshold: 0.25 })
  const [passo, setPasso] = useState(0)
  const rodando = ativo && visivel && !reduced

  useEffect(() => {
    if (!rodando) return
    const id = window.setInterval(() => setPasso((n) => n + 1), 2600)
    return () => window.clearInterval(id)
  }, [rodando])

  const total = mockup.eventos.length
  const recentes = [0, 1, 2].map((k) => {
    const idx = (((passo - k) % total) + total) % total
    return { chave: passo - k, ...mockup.eventos[idx] }
  })

  const desenhar = ativo && visivel

  return (
    <div ref={ref} className="glass-panel w-full overflow-hidden text-left" role="img" aria-label={mockup.aria}>
      {/* Barra da janela */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="mx-auto rounded-full bg-ink/60 px-3 py-1 text-[11px] text-silver">{mockup.janela}</span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-silver">{mockup.etiqueta}</span>
      </div>

      <div aria-hidden="true" className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-[600] tracking-[-0.01em] text-paper">{mockup.titulo}</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5fd39a]/25 bg-[#5fd39a]/[0.07] px-2.5 py-1 text-[11px] text-[#9fe6c2]">
            <span className="pulse-dot" />
            {mockup.status}
          </span>
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {mockup.kpis.map((kpi, i) => (
            <div
              key={kpi.rotulo}
              className={cx(
                'rounded-[10px] border p-2.5 sm:p-3',
                i === 2 ? 'border-orange/40 bg-orange/[0.08]' : 'border-line bg-ink/40',
              )}
            >
              <p className="truncate text-[10.5px] text-silver sm:text-[11.5px]">{kpi.rotulo}</p>
              <p className={cx('mt-1 text-[15px] font-[680] tracking-[-0.02em] sm:text-[20px]', i === 2 ? 'text-amber' : 'text-paper')}>
                {desenhar ? <CountUp value={kpi.valor} format={formato.brlInteiro} duration={1400} /> : formato.brlInteiro(0)}
              </p>
              <p className="mt-0.5 hidden truncate text-[10.5px] text-silver/80 sm:block">{kpi.nota}</p>
            </div>
          ))}
        </div>

        {/* Gráfico tratado × controle */}
        <div className="mt-4 rounded-[10px] border border-line bg-ink/40 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-silver">
            <span>{mockup.grafico}</span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-[2px] w-3 bg-orange" />
                {mockup.tratado}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0 w-3 border-t border-dashed border-silver" />
                {mockup.controle}
              </span>
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-[92px] w-full sm:h-[110px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mock-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ef9311" stopOpacity="0.38" />
                <stop offset="1" stopColor="#ef9311" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(166,170,173,0.1)" />
            ))}
            <motion.path
              d={area(TRATADO)}
              fill="url(#mock-area)"
              initial={{ opacity: 0 }}
              animate={desenhar ? { opacity: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.9 }}
            />
            <motion.path
              d={linha(CONTROLE)}
              fill="none"
              stroke="#a6aaad"
              strokeWidth="1.4"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={desenhar ? { opacity: 0.8 } : undefined}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.path
              d={linha(TRATADO)}
              fill="none"
              stroke="#ef9311"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              animate={desenhar ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.8, delay: 0.4, ease: EASE_EXPO }}
            />
            <motion.circle
              cx={W}
              cy={Number(TRATADO[30].split(',')[1])}
              r="4"
              fill="#ffb86c"
              initial={{ scale: 0, opacity: 0 }}
              animate={desenhar ? { scale: 1, opacity: 1 } : undefined}
              transition={{ delay: 2.1, duration: 0.4 }}
            />
          </svg>
        </div>

        {/* Feed de atividade */}
        <p className="mt-4 text-[11px] tracking-[0.08em] text-silver uppercase">{mockup.eventosTitulo}</p>
        <ul className="relative mt-2 flex h-[136px] flex-col gap-2 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {recentes.map((ev) => {
              const { Icon, cor } = ICONE[isTipo(ev.tipo) ? ev.tipo : 'msg']
              return (
                <motion.li
                  key={ev.chave}
                  layout
                  initial={{ opacity: 0, y: -18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                  className="flex h-10 shrink-0 items-center gap-3 rounded-[10px] border border-line bg-ink/50 px-3"
                >
                  <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full', cor)}>
                    <Icon size={14} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-paper">{ev.texto}</span>
                  <span className="shrink-0 text-[11.5px] text-silver tabular">{ev.valor}</span>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
