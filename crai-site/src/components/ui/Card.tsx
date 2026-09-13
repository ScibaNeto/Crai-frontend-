import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'li' | 'aside'
  children: ReactNode
}

export function Card({ as: Tag = 'div', className, children, ...rest }: CardProps) {
  return (
    <Tag className={cx('rounded-[14px] border border-line bg-slate', className)} {...rest}>
      {children}
    </Tag>
  )
}
