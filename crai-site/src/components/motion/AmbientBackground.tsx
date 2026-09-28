import type { CSSProperties } from 'react'
import { cx } from '../../lib/cx'
import { mulberry32 } from '../../lib/prng'
import { useReducedMotion } from '../../lib/useReducedMotion'

// 18 partículas com posição, tamanho, opacidade e deriva fixas (seed) — nada muda entre cargas.
const PARTICULAS = Array.from({ length: 18 }, (_, i) => {
  const rand = mulberry32(911 + i * 37)
  return {
    x: 3 + rand() * 94,
    y: 6 + rand() * 88,
    r: 0.9 + rand() * 2.1,
    opacidade: 0.1 + rand() * 0.38,
    dur: 11 + rand() * 13,
    delay: -rand() * 14,
    deriva: -(16 + rand() * 38),
  }
})

interface AmbientBackgroundProps {
  /** 'hero' = malha, blobs, grade, scan e partículas. 'suave' = o mesmo, mais discreto (páginas internas). */
  variant?: 'hero' | 'suave'
  className?: string
}

/**
 * Fundo ambiente (SVGator: ambient background motion + animated gradient; IrisFlow: mesh, blob-morph,
 * grade mascarada e linha de varredura). Só CSS e SVG, sem canvas. Movimento reduzido: fica estático.
 */
export function AmbientBackground({ variant = 'hero', className }: AmbientBackgroundProps) {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden="true" className={cx('aurora', variant === 'suave' && 'aurora--suave', className)}>
      <div className="aurora__mesh" />
      <div className="aurora__blob aurora__blob--a" />
      <div className="aurora__blob aurora__blob--b" />
      <div className="aurora__grid" />
      {variant === 'hero' ? <div className="aurora__scan" /> : null}
      {reduced ? null : (
        <svg className="motion-decor absolute inset-0 h-full w-full">
          {PARTICULAS.map((p, i) => (
            <circle
              key={i}
              className="particle"
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.r}
              fill={i % 4 === 0 ? 'var(--color-amber)' : 'var(--color-paper)'}
              opacity={p.opacidade}
              style={
                {
                  '--dur': `${p.dur}s`,
                  '--delay': `${p.delay}s`,
                  '--drift': `${p.deriva}px`,
                } as CSSProperties
              }
            />
          ))}
        </svg>
      )}
      <div className="aurora__fade" />
    </div>
  )
}
