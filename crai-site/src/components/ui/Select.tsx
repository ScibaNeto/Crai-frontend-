import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import { IconChevronDown } from '../icons/Icons'
import { FocusLine } from './Field'

type Opcao = string | { value: string; label: string }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  options: Opcao[]
  hint?: ReactNode
  wrapperClassName?: string
}

export function Select({ id, label, options, hint, wrapperClassName, className, ...rest }: SelectProps) {
  const hintId = hint ? `${id}-dica` : undefined
  return (
    <div className={cx('flex flex-col', wrapperClassName)}>
      <label htmlFor={id} className="t-apoio mb-2 text-silver">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-describedby={hintId}
          className={cx(
            'peer w-full cursor-pointer appearance-none rounded-t-[4px] border-0 border-b border-graphite bg-slate/45 py-2.5 pr-10 pl-3 text-[16px] text-paper outline-none transition-colors hover:border-silver disabled:cursor-not-allowed disabled:text-silver disabled:hover:border-graphite',
            className,
          )}
          {...rest}
        >
          {options.map((opcao) => {
            const o = typeof opcao === 'string' ? { value: opcao, label: opcao } : opcao
            return (
              <option key={o.value} value={o.value} className="bg-slate text-paper">
                {o.label}
              </option>
            )
          })}
        </select>
        <FocusLine />
        <IconChevronDown size={18} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-silver" />
      </div>
      {hint ? (
        <p id={hintId} className="t-apoio mt-2 text-silver">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
