import type { PointerEvent, ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface SpotlightProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}

/** Borda e brilho que seguem o cursor (SVGator: hover effects). Sem mouse, fica só o card. */
export function Spotlight({ children, className, as: Tag = 'div' }: SpotlightProps) {
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag className={cx('spotlight', className)} onPointerMove={onPointerMove}>
      {children}
    </Tag>
  )
}
