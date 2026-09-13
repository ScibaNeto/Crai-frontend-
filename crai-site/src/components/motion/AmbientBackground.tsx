import type { CSSProperties } from 'react'
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

/** Gradiente cônico girando devagar + partículas em SVG (10.2). Sem canvas. */
export function AmbientBackground() {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ambient-cone" />
      {reduced ? null : (
        <svg className="motion-decor absolute inset-0 h-full w-full">
          {PARTICULAS.map((p, i) => (
            <circle
              key={i}
              className="particle"
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.r}
              fill="var(--color-paper)"
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
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  )
}
