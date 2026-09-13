import type { CSSProperties } from 'react'
import { cx } from '../../lib/cx'

/** Bloco de skeleton com varredura diagonal de 1,6s (10.12). Componha com a forma real do conteúdo. */
export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div aria-hidden="true" className={cx('skeleton', className)} style={style} />
}
