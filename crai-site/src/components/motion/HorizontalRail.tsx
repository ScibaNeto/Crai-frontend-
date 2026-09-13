import { Children, type ReactNode } from 'react'

interface HorizontalRailProps {
  children: ReactNode
  ariaLabel: string
}

/** Trilho horizontal (10.6): scroll-snap no mobile, grade de 3 no desktop. Sem scroll-jacking. */
export function HorizontalRail({ children, ariaLabel }: HorizontalRailProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className="rail -mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 pb-2 focus-visible:outline-offset-[-2px] md:mx-0 md:snap-none md:overflow-visible md:px-0 md:pb-0"
    >
      <ul className="flex gap-4 md:grid md:grid-cols-3 md:gap-6">
        {Children.map(children, (child) => (
          <li className="w-[84%] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none">{child}</li>
        ))}
      </ul>
    </div>
  )
}
