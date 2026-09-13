import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface PageShellProps {
  titulo: ReactNode
  lead?: ReactNode
  badge?: ReactNode
  children?: ReactNode
  className?: string
}

/** Abertura padrão das páginas internas: um h1, um lead, alinhados à esquerda. */
export function PageShell({ titulo, lead, badge, children, className }: PageShellProps) {
  return (
    <div className={className}>
      <div className="container-site pt-14 pb-12 md:pt-24 md:pb-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className={cx('t-h1 max-w-[18em]')}>{titulo}</h1>
          {badge}
        </div>
        {lead ? <p className="t-body measure mt-5 text-silver">{lead}</p> : null}
      </div>
      {children}
    </div>
  )
}
