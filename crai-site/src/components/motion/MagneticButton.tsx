import { motion, useSpring } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  /** Fração da distância ao centro que o botão acompanha. */
  strength?: number
  /** Deslocamento máximo, em px. */
  max?: number
}

/** Atração sutil do botão em direção ao cursor. Só mouse; desligado com movimento reduzido. */
export function MagneticButton({ children, className, strength = 0.22, max = 7 }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 })

  const limitar = (v: number) => Math.max(-max, Math.min(max, v))

  function onPointerMove(e: PointerEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el || reduced || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    x.set(limitar((e.clientX - (rect.left + rect.width / 2)) * strength))
    y.set(limitar((e.clientY - (rect.top + rect.height / 2)) * strength))
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} className={cx('inline-flex', className)} style={{ x, y }} onPointerMove={onPointerMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}
