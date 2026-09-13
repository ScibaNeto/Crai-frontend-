import { motion } from 'framer-motion'
import { cx } from '../../lib/cx'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface WordmarkProps {
  /** Mudar o valor redesenha a seta. */
  drawKey?: number
  /** Nasce com a seta completa, sem animação. */
  instant?: boolean
  duration?: number
  delay?: number
  /** Em unidades do viewBox (24 = altura da letra A). 4.5 ≈ 3px no tamanho do header. */
  strokeWidth?: number
  className?: string
  /** Quando está dentro de um link que já tem nome acessível. */
  decorative?: boolean
}

/** Wordmark tipográfico "CRAI" — nunca o logo. O A em silver, cruzado por uma seta ascendente laranja. */
export function Wordmark({
  drawKey = 0,
  instant = false,
  duration = 0.4,
  delay = 0,
  strokeWidth = 4.5,
  className,
  decorative = false,
}: WordmarkProps) {
  const reduced = useReducedMotion()
  const skip = instant || reduced

  const shaft = { duration: duration * 0.72, delay, ease: EASE_EXPO }
  const head = { duration: duration * 0.42, delay: delay + duration * 0.58, ease: EASE_EXPO }
  const initial = skip ? false : { pathLength: 0, opacity: 0 }

  return (
    <span
      className={cx('relative inline-flex items-baseline leading-none font-[680] tracking-[-0.04em] text-paper select-none', className)}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'CRAI'}
      aria-hidden={decorative ? true : undefined}
    >
      <span aria-hidden="true">CR</span>
      <span aria-hidden="true" className="relative text-silver">
        A
        <svg
          className="pointer-events-none absolute overflow-visible"
          style={{ left: '-0.1em', top: '0.14em', width: 'calc(100% + 0.2em)', height: '0.73em' }}
          viewBox="0 0 24 24"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            key={`haste-${drawKey}`}
            d="M2 21.5 L10 13.5 L22 3"
            stroke="var(--color-orange)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={initial}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...shaft, opacity: { duration: 0.01, delay } }}
          />
          <motion.path
            key={`ponta-${drawKey}`}
            d="M15 3 L22 3 L22 10"
            stroke="var(--color-orange)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={initial}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...head, opacity: { duration: 0.01, delay: head.delay } }}
          />
        </svg>
      </span>
      <span aria-hidden="true">I</span>
    </span>
  )
}
