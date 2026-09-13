import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Tone = 'beta' | 'neutral' | 'gain'

const tones: Record<Tone, string> = {
  beta: 'border-amber/40 text-amber',
  neutral: 'border-line text-silver',
  gain: 'border-orange/35 text-orange',
}

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-[4px] border px-2 py-0.5 font-mono text-[12px] leading-[1.45] font-[500] whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
