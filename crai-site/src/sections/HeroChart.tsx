import { motion } from 'framer-motion'
import { home } from '../data/conteudo'
import { useIntroReady } from '../lib/intro'
import { useReducedMotion } from '../lib/useReducedMotion'

// Faturamento (silver) que cai num vale; recuperação parcial (laranja) que sobe sem voltar ao patamar.
const LINHA_FATURAMENTO =
  'M0 96 C40 92 80 84 120 86 C160 88 190 90 220 94 C250 98 262 150 290 196 C305 218 320 222 350 220 C390 217 430 222 480 220'
const LINHA_RECUPERACAO = 'M314 217 C344 212 370 176 400 160 C430 146 452 140 480 136'
const AREA_RECUPERADA =
  'M314 217 C344 212 370 176 400 160 C430 146 452 140 480 136 L480 220 C430 222 390 217 350 220 C335 221 322 219 314 217 Z'

const EASE_DESENHO = [0.65, 0, 0.35, 1] as const

/** Hero animado (10.2): silver 800ms → laranja 700ms com 300ms de atraso → área a 12%. */
export function HeroChart() {
  const ready = useIntroReady()
  const reduced = useReducedMotion()
  const { grafico } = home.hero

  const t0 = 0.35
  const silver = { delay: t0, duration: 0.8 }
  const laranja = { delay: t0 + 0.8 + 0.3, duration: 0.7 }
  const area = laranja.delay + laranja.duration

  function tracado(tempo: { delay: number; duration: number }) {
    if (reduced) return { initial: false as const }
    return {
      initial: { pathLength: 0, opacity: 0 },
      animate: ready ? { pathLength: 1, opacity: 1 } : undefined,
      transition: {
        pathLength: { delay: tempo.delay, duration: tempo.duration, ease: EASE_DESENHO },
        opacity: { delay: tempo.delay, duration: 0.01 },
      },
    }
  }

  function aparece(delay: number) {
    if (reduced) return { initial: false as const }
    return {
      initial: { opacity: 0 },
      animate: ready ? { opacity: 1 } : undefined,
      transition: { delay, duration: 0.5 },
    }
  }

  return (
    <figure className="relative border-b border-line pb-5">
      <figcaption className="t-label flex items-center justify-between gap-4 border-b border-line pb-3 text-silver">
        <span>{grafico.rotulos.faturamento}</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
          {grafico.rotulos.recuperado}
        </span>
      </figcaption>

      <div className="relative mt-5">
        <svg viewBox="0 60 480 180" className="block h-auto w-full overflow-visible" role="img" aria-labelledby="hero-grafico-titulo hero-grafico-desc">
          <title id="hero-grafico-titulo">{grafico.titulo}</title>
          <desc id="hero-grafico-desc">{grafico.descricao}</desc>

          {[100, 160, 220].map((y) => (
            <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="var(--color-line)" strokeWidth="1" />
          ))}

          <motion.path
            d={AREA_RECUPERADA}
            fill="var(--color-orange)"
            initial={reduced ? false : { fillOpacity: 0 }}
            animate={ready || reduced ? { fillOpacity: 0.12 } : undefined}
            style={reduced ? { fillOpacity: 0.12 } : undefined}
            transition={{ delay: area, duration: 0.6 }}
          />
          <motion.path
            d={LINHA_FATURAMENTO}
            fill="none"
            stroke="var(--color-silver)"
            strokeWidth="2.5"
            strokeLinecap="round"
            {...tracado(silver)}
          />
          <motion.path
            d={LINHA_RECUPERACAO}
            fill="none"
            stroke="var(--color-orange)"
            strokeWidth="3"
            strokeLinecap="round"
            {...tracado(laranja)}
          />
          <motion.circle cx="480" cy="136" r="4.5" fill="var(--color-orange)" {...aparece(area)} />
        </svg>

        <motion.span
          aria-hidden="true"
          className="t-label pointer-events-none absolute text-silver"
          style={{ left: '24%', top: '58%' }}
          {...aparece(silver.delay + 0.6)}
        >
          {grafico.rotulos.falha}
        </motion.span>
      </div>
    </figure>
  )
}
