import { motion } from 'framer-motion'
import { useId } from 'react'
import { cx } from '../../lib/cx'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { LOGO_A, LOGO_LETRAS, LOGO_RATIO, LOGO_SETA, LOGO_VIEWBOX, SETA_CAIXA } from './logoCrai'

interface WordmarkProps {
  /** Mudar o valor revela a seta de novo. */
  drawKey?: number
  /** Nasce com a seta completa, sem animação. */
  instant?: boolean
  duration?: number
  delay?: number
  /** O tamanho acompanha o font-size do pai: a altura do logo é ~1em. */
  className?: string
  /** Quando está dentro de um link que já tem nome acessível. */
  decorative?: boolean
}

/**
 * Logo oficial da CRAI. Sobre o fundo escuro: C, R e I em paper, o A em silver e a seta em laranja.
 * A seta se revela da esquerda para a direita, subindo junto com a curva.
 */
export function Wordmark({
  drawKey = 0,
  instant = false,
  duration = 0.4,
  delay = 0,
  className,
  decorative = false,
}: WordmarkProps) {
  const reduced = useReducedMotion()
  const skip = instant || reduced
  const clipId = `crai-seta-${useId().replace(/:/g, '')}`

  return (
    <span
      className={cx('inline-flex leading-none select-none', className)}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'CRAI'}
      aria-hidden={decorative ? true : undefined}
    >
      <svg
        viewBox={LOGO_VIEWBOX}
        className="block h-[1em] w-auto overflow-visible"
        style={{ aspectRatio: String(LOGO_RATIO) }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              key={`revela-${drawKey}`}
              x={SETA_CAIXA.x}
              y={SETA_CAIXA.y}
              height={SETA_CAIXA.altura}
              initial={skip ? false : { width: 0 }}
              animate={{ width: SETA_CAIXA.largura }}
              transition={{ duration, delay, ease: EASE_EXPO }}
            />
          </clipPath>
        </defs>
        <path fill="var(--color-paper)" fillRule="evenodd" d={LOGO_LETRAS} />
        <path fill="var(--color-silver)" fillRule="evenodd" d={LOGO_A} />
        <g clipPath={`url(#${clipId})`}>
          <path fill="var(--color-orange)" fillRule="evenodd" d={LOGO_SETA} />
        </g>
      </svg>
    </span>
  )
}
