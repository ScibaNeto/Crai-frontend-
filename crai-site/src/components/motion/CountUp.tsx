import { useEffect, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { useFormato } from '../../lib/i18n'
import { useInView } from '../../lib/useInView'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface CountUpProps {
  value: number
  format?: (valor: number) => string
  duration?: number
  className?: string
}

/**
 * Contador (10.10): de 0 ao valor em 900ms com easing de saída, ao entrar na tela.
 * Se o valor mudar depois (simulador), anima do número atual até o novo.
 */
export function CountUp({ value, format, duration = 900, className }: CountUpProps) {
  const reduced = useReducedMotion()
  const formatoPadrao = useFormato()
  const fmt = format ?? formatoPadrao.brl
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.3 })
  const [display, setDisplay] = useState(0)
  const atual = useRef(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      atual.current = value
      return
    }
    const de = atual.current
    const inicio = performance.now()
    let raf = 0
    const tick = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / duration)
      const e = 1 - Math.pow(1 - t, 3)
      const v = t === 1 ? value : de + (value - de) * e
      atual.current = v
      setDisplay(v)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, inView, reduced, duration])

  return (
    <span ref={ref} className={cx('tabular', className)}>
      <span aria-hidden="true">{fmt(reduced ? value : display)}</span>
      <span className="sr-only">{fmt(value)}</span>
    </span>
  )
}
