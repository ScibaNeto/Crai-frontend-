import type { CSSProperties } from 'react'
import { cx } from '../../lib/cx'
import { mulberry32 } from '../../lib/prng'

// Grade 21×21 decorativa. NÃO é um QR code real: os módulos são sorteados com seed fixa.

const N = 21
const CANTOS: [number, number][] = [
  [0, 0],
  [0, N - 7],
  [N - 7, 0],
]

function marcador(r: number, c: number): boolean | null {
  for (const [zr, zc] of CANTOS) {
    const dr = r - zr
    const dc = c - zc
    if (dr >= -1 && dr <= 7 && dc >= -1 && dc <= 7) {
      if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return false
      const borda = dr === 0 || dr === 6 || dc === 0 || dc === 6
      const miolo = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
      return borda || miolo
    }
  }
  return null
}

const MODULOS = (() => {
  const rand = mulberry32(2126)
  const celulas: { r: number; c: number; sorteio: number }[] = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const m = marcador(r, c)
      const cheio = m === null ? rand() > 0.52 : m
      const sorteio = rand()
      if (cheio) celulas.push({ r, c, sorteio })
    }
  }
  const ordem = [...celulas].sort((a, b) => a.sorteio - b.sorteio)
  return celulas.map((cel) => ({ ...cel, ordem: ordem.indexOf(cel) }))
})()

export type EstadoQr = 'ocioso' | 'formando' | 'pronto'

interface PixQrPlaceholderProps {
  estado: EstadoQr
  /** Tempo para todos os módulos aparecerem, em ms. */
  duracao?: number
  className?: string
}

export function PixQrPlaceholder({ estado, duracao = 1200, className }: PixQrPlaceholderProps) {
  const ativo = estado !== 'ocioso'
  const total = MODULOS.length
  return (
    <svg viewBox="-5 -5 31 31" className={cx('block h-auto w-full', className)} aria-hidden="true">
      <circle
        cx={10.5}
        cy={10.5}
        r={15}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={0.35}
      />
      <circle
        cx={10.5}
        cy={10.5}
        r={15}
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth={0.55}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        transform="rotate(-90 10.5 10.5)"
        style={{
          strokeDashoffset: estado === 'pronto' ? 0 : 1,
          transition: 'stroke-dashoffset 420ms cubic-bezier(.65,0,.35,1)',
        }}
      />
      {MODULOS.map((m) => (
        <rect
          key={`${m.r}-${m.c}`}
          x={m.c + 0.08}
          y={m.r + 0.08}
          width={0.84}
          height={0.84}
          rx={0.14}
          fill="var(--color-paper)"
          style={
            {
              opacity: ativo ? 1 : 0.07,
              transition: `opacity 140ms ease ${ativo ? Math.round((m.ordem / total) * duracao) : 0}ms`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  )
}
