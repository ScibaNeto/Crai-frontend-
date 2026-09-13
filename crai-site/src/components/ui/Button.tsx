import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'

type Variant = 'primary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

interface Common {
  variant?: Variant
  size?: Size
  loading?: boolean
  className?: string
  children: ReactNode
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined }
type AsLink = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }

export type ButtonProps = AsButton | AsLink

const base =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-[560] tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber disabled:cursor-not-allowed disabled:opacity-60 select-none'

const variants: Record<Variant, string> = {
  primary: 'rounded-[4px] bg-orange text-ink hover:bg-amber',
  ghost: 'rounded-[4px] border border-graphite text-paper hover:border-silver hover:bg-paper/[0.03]',
  link: 'text-link rounded-none text-paper',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[14px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[16px]',
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', loading = false, className, children } = props
  const classes = cx(base, variants[variant], variant === 'link' ? 'px-0 py-0.5' : sizes[size], className)
  const content = (
    <>
      {loading ? <Spinner /> : null}
      {children}
    </>
  )

  if (props.to !== undefined) {
    const { to, variant: _v, size: _s, loading: _l, className: _c, children: _ch, ...rest } = props
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  const { variant: _v, size: _s, loading: _l, className: _c, children: _ch, to: _t, type = 'button', ...rest } = props
  return (
    <button type={type} className={classes} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  )
}
