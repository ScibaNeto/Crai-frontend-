import { motion } from 'framer-motion'
import { cx } from '../../lib/cx'
import { EASE_EXPO } from '../../lib/intro'

interface StepperProps {
  steps: string[]
  current: number
  onStepClick: (index: number) => void
  label: string
}

export function Stepper({ steps, current, onStepClick, label }: StepperProps) {
  return (
    <nav aria-label={label}>
      <ol className="grid grid-cols-3 gap-3 md:gap-5">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={step}>
              <button
                type="button"
                onClick={() => onStepClick(i)}
                aria-current={active ? 'step' : undefined}
                className="group flex w-full flex-col items-start gap-3 rounded-[4px] pb-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
              >
                <span className="relative block h-0.5 w-full overflow-hidden bg-graphite/60" aria-hidden="true">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-orange"
                    initial={false}
                    animate={{ width: done ? '100%' : active ? '45%' : '0%' }}
                    transition={{ duration: 0.55, ease: EASE_EXPO }}
                  />
                </span>
                <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className={cx('font-mono text-[12px] leading-[1.6]', active || done ? 'text-paper' : 'text-silver')}>{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={cx(
                      'text-[13px] leading-[1.35] font-[520] break-words transition-colors sm:text-[15px]',
                      active ? 'text-paper' : 'text-silver group-hover:text-paper',
                    )}
                  >
                    {step}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
