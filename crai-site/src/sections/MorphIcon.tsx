import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { useConteudo } from '../lib/i18n'
import { useInView } from '../lib/useInView'
import { useReducedMotion } from '../lib/useReducedMotion'

// Morphing (10.8) — único lugar do site. Os pares de paths têm exatamente os mesmos comandos e pontos:
// contorno com M + 8 curvas C + Z (fatura com canto dobrado → círculo) e glifo com M L M L (× → ✓).
const FATURA =
  'M20 5 C23 5 26 5 29 5 C31.67 7.67 34.33 10.33 37 13 C37 23 37 33 37 43 C32.67 43 28.33 43 24 43 C19.67 43 15.33 43 11 43 C11 36.67 11 30.33 11 24 C11 17.67 11 11.33 11 5 C14 5 17 5 20 5 Z'
const CIRCULO =
  'M24 7 C28.51 7 32.83 8.79 36.02 11.98 C39.21 15.17 41 19.49 41 24 C41 28.51 39.21 32.83 36.02 36.02 C32.83 39.21 28.51 41 24 41 C19.49 41 15.17 39.21 11.98 36.02 C8.79 32.83 7 28.51 7 24 C7 19.49 8.79 15.17 11.98 11.98 C15.17 8.79 19.49 7 24 7 Z'
const XIS = 'M19 20 L29 30 M29 20 L19 30'
const CHECK = 'M16.5 24.5 L21.5 29.5 M21.5 29.5 L31.5 18.5'

const SILVER = '#A6AAAD'
const LARANJA = '#EF9311'

export function MorphIcon() {
  const { morph } = useConteudo().produto.recuperacao
  const reduced = useReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.6 })
  const [confirmado, setConfirmado] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const titleId = useId()

  useEffect(() => {
    if (!inView) return
    timer.current = window.setTimeout(() => setConfirmado(true), reduced ? 0 : 450)
    return () => window.clearTimeout(timer.current)
  }, [inView, reduced])

  function repetir() {
    if (reduced) return
    window.clearTimeout(timer.current)
    setConfirmado(false)
    timer.current = window.setTimeout(() => setConfirmado(true), 700)
  }

  const transition = { duration: reduced ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] as const }
  const cor = confirmado ? LARANJA : SILVER

  return (
    <div ref={ref} onMouseEnter={repetir} className="flex items-center gap-5 rounded-[14px] border border-line bg-slate p-5 md:p-6">
      <svg viewBox="0 0 48 48" width={72} height={72} role="img" aria-labelledby={titleId} className="shrink-0">
        <title id={titleId}>{morph.titulo}</title>
        <motion.path
          initial={false}
          animate={{ d: confirmado ? CIRCULO : FATURA, stroke: cor }}
          transition={transition}
          fill="none"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <motion.path
          initial={false}
          animate={{ d: confirmado ? CHECK : XIS, stroke: cor }}
          transition={transition}
          fill="none"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-display text-[22px] leading-[1.2] text-paper" aria-live="polite">
        {confirmado ? morph.depois : morph.antes}
      </p>
    </div>
  )
}
