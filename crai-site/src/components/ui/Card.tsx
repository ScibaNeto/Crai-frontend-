import type { HTMLAttributes, PointerEvent, ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'li' | 'aside'
  children: ReactNode
}

/**
 * Superfície padrão: vidro quente (IrisFlow: .panel com backdrop-filter) com borda e brilho que seguem
 * o cursor (SVGator: hover effects). Entra subindo de leve ao montar.
 */
export function Card({ as: Tag = 'div', className, children, onPointerMove, ...rest }: CardProps) {
  function mover(e: PointerEvent<HTMLElement>) {
    if (e.pointerType === 'mouse') {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    onPointerMove?.(e)
  }
  return (
    <Tag className={cx('card-glass spotlight anim-entrada rounded-[18px]', className)} onPointerMove={mover} {...rest}>
      {children}
    </Tag>
  )
}
