import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface MarqueeProps {
  itens: ReactNode[]
  /** Duração de uma volta completa, em segundos. */
  duracao?: number
  className?: string
  ariaLabel?: string
}

/**
 * Faixa horizontal infinita (SVGator: horizontal scrolling). A segunda cópia é só visual (aria-hidden);
 * leitores de tela ouvem a lista uma vez. Pausa no hover; com movimento reduzido vira rolagem manual.
 */
export function Marquee({ itens, duracao = 38, className, ariaLabel }: MarqueeProps) {
  const trilho = (copia: boolean) => (
    <ul className="marquee__track" aria-hidden={copia || undefined}>
      {itens.map((item, i) => (
        <li key={i} className="flex shrink-0 items-center gap-12">
          {item}
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-orange/70" />
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className={cx('marquee', className)}
      style={{ '--marquee-dur': `${duracao}s` } as CSSProperties}
      role="region"
      aria-label={ariaLabel}
    >
      {trilho(false)}
      {trilho(true)}
    </div>
  )
}
