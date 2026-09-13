import { motion } from 'framer-motion'
import { useRef, type KeyboardEvent } from 'react'
import { cx } from '../../lib/cx'

interface Opcao<T extends string> {
  value: T
  label: string
}

interface ToggleProps<T extends string> {
  id: string
  label: string
  options: readonly Opcao<T>[]
  value: T
  onChange: (value: T) => void
  hint?: string
  className?: string
}

/** Seletor segmentado com indicador deslizando por layoutId (10.7). Semântica de radiogroup. */
export function Toggle<T extends string>({ id, label, options, value, onChange, hint, className }: ToggleProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const labelId = `${id}-rotulo`
  const hintId = hint ? `${id}-dica` : undefined

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % options.length
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + options.length) % options.length
    if (next < 0) return
    e.preventDefault()
    onChange(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div className={cx('flex flex-col', className)}>
      <span id={labelId} className="t-apoio mb-2 text-silver">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="relative inline-grid w-full grid-flow-col auto-cols-fr rounded-[6px] border border-line bg-ink/60 p-1"
      >
        {options.map((o, i) => {
          const selected = o.value === value
          return (
            <button
              key={o.value}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(o.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cx(
                'relative h-10 rounded-[4px] px-4 text-[15px] font-[540] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
                selected ? 'text-ink' : 'text-silver hover:text-paper',
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`${id}-indicador`}
                  className="absolute inset-0 rounded-[4px] bg-paper"
                  transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>
      {hint ? (
        <p id={hintId} className="t-apoio mt-2 text-silver">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
