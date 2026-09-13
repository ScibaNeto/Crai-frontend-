import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Rotação máxima em graus. */
  max?: number
}

/** Falso 3D (10.9): perspectiva de 900px, até ±6°, brilho laranja seguindo o cursor. Só mouse. */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || reduced || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotY = (px - 0.5) * 2 * max
    const rotX = -(py - 0.5) * 2 * max
    el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
  }

  function onPointerLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cx('tilt-card relative', className)}
      style={{ transition: 'transform 120ms ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
      {reduced ? null : <span aria-hidden="true" className="tilt-glow" />}
    </div>
  )
}
