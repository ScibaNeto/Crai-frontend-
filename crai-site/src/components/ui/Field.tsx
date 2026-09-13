import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

const controle =
  'peer w-full rounded-t-[4px] border-0 border-b border-graphite bg-slate/45 px-3 pt-2.5 pb-2.5 text-[16px] text-paper outline-none transition-colors placeholder:text-silver/70 hover:border-silver disabled:cursor-not-allowed disabled:text-silver disabled:hover:border-graphite'

/** Sublinhado laranja de 2px que cresce a partir do centro no foco (10.7). */
export function FocusLine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-center scale-x-0 bg-orange transition-transform duration-[220ms] ease-[var(--ease-expo)] peer-focus:scale-x-100"
    />
  )
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  hint?: ReactNode
  wrapperClassName?: string
  suffix?: ReactNode
}

export function Field({ id, label, hint, wrapperClassName, className, suffix, ...rest }: FieldProps) {
  const hintId = hint ? `${id}-dica` : undefined
  return (
    <div className={cx('flex flex-col', wrapperClassName)}>
      <label htmlFor={id} className="t-apoio mb-2 text-silver">
        {label}
      </label>
      <div className="relative">
        <input id={id} aria-describedby={hintId} className={cx(controle, suffix ? 'pr-10' : undefined, className)} {...rest} />
        <FocusLine />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-silver">{suffix}</span> : null}
      </div>
      {hint ? (
        <p id={hintId} className="t-apoio mt-2 text-silver">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  hint?: ReactNode
  wrapperClassName?: string
}

export function TextArea({ id, label, hint, wrapperClassName, className, ...rest }: TextAreaProps) {
  const hintId = hint ? `${id}-dica` : undefined
  return (
    <div className={cx('flex flex-col', wrapperClassName)}>
      <label htmlFor={id} className="t-apoio mb-2 text-silver">
        {label}
      </label>
      <div className="relative">
        <textarea id={id} aria-describedby={hintId} className={cx(controle, 'min-h-36 resize-y leading-[1.55]', className)} {...rest} />
        <FocusLine />
      </div>
      {hint ? (
        <p id={hintId} className="t-apoio mt-2 text-silver">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  label: ReactNode
  hint?: ReactNode
  wrapperClassName?: string
}

export function Checkbox({ id, label, hint, wrapperClassName, ...rest }: CheckboxProps) {
  const hintId = hint ? `${id}-dica` : undefined
  return (
    <div className={cx('flex items-start gap-3', wrapperClassName)}>
      <span className="relative mt-[3px] inline-flex h-5 w-5 shrink-0">
        <input
          id={id}
          type="checkbox"
          aria-describedby={hintId}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-[4px] border border-silver/60 bg-transparent transition-colors checked:border-paper checked:bg-paper hover:border-silver focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          {...rest}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute inset-0 h-5 w-5 text-ink opacity-0 transition-opacity peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 10.5l3.2 3.2L15 6.8" />
        </svg>
      </span>
      <span className="flex flex-col gap-0.5">
        <label htmlFor={id} className="cursor-pointer text-[15px] leading-[1.5] text-paper">
          {label}
        </label>
        {hint ? (
          <span id={hintId} className="t-apoio text-silver">
            {hint}
          </span>
        ) : null}
      </span>
    </div>
  )
}
