import { useId, useLayoutEffect, useRef, type ReactNode, type SVGProps } from 'react'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface SelfDrawingSvgProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  children: ReactNode
  /** Duração de cada traço, em ms. Sobrescreva por elemento com data-duration. */
  duration?: number
  /** Atraso entre um passo e o próximo, em ms. O passo vem de data-draw="n" / data-fade="n". */
  stagger?: number
  threshold?: number
  /** Presente = SVG informativo (role="img" + <title>). Ausente = decorativo (aria-hidden). */
  title?: string
  description?: string
}

/**
 * Auto-desenho (10.4). Elementos com [data-draw] têm o traço animado via strokeDashoffset
 * a partir de getTotalLength(); elementos com [data-fade] aparecem por opacidade.
 * Dispara uma vez, quando 35% do bloco entra na viewport.
 */
export function SelfDrawingSvg({
  children,
  duration = 700,
  stagger = 180,
  threshold = 0.35,
  title,
  description,
  ...rest
}: SelfDrawingSvgProps) {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const uid = useId()
  const titleId = `${uid}-titulo`
  const descId = `${uid}-desc`

  useLayoutEffect(() => {
    const svg = ref.current
    if (!svg || reduced) return

    const draws = Array.from(svg.querySelectorAll<SVGGeometryElement>('[data-draw]'))
    const fades = Array.from(svg.querySelectorAll<SVGElement>('[data-fade]'))
    const timers: number[] = []

    const passo = (el: Element, attr: 'draw' | 'fade', i: number) => {
      const valor = (el as SVGElement).dataset[attr]
      const n = valor === undefined || valor === '' ? i : Number(valor)
      const atraso = (el as SVGElement).dataset.delay
      return atraso !== undefined ? Number(atraso) : n * stagger
    }

    draws.forEach((el) => {
      const len = el.getTotalLength()
      el.style.transition = 'none'
      el.style.strokeDasharray = `${len} ${len}`
      el.style.strokeDashoffset = `${len}`
    })
    fades.forEach((el) => {
      el.style.transition = 'none'
      el.style.opacity = '0'
    })

    const run = () => {
      let fim = 0
      draws.forEach((el, i) => {
        const delay = passo(el, 'draw', i)
        const dur = Number(el.dataset.duration ?? duration)
        fim = Math.max(fim, delay + dur)
        el.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.65,0,.35,1) ${delay}ms`
        el.style.strokeDashoffset = '0'
      })
      fades.forEach((el, i) => {
        const delay = passo(el, 'fade', i)
        const dur = Number(el.dataset.duration ?? 420)
        fim = Math.max(fim, delay + dur)
        el.style.transition = `opacity ${dur}ms ease ${delay}ms`
        el.style.opacity = ''
      })
      // Terminado o desenho, limpa o tracejado para o SVG voltar ao estado natural.
      timers.push(
        window.setTimeout(() => {
          draws.forEach((el) => {
            el.style.transition = ''
            el.style.strokeDasharray = ''
            el.style.strokeDashoffset = ''
          })
          fades.forEach((el) => {
            el.style.transition = ''
          })
        }, fim + 60),
      )
    }

    if (typeof IntersectionObserver === 'undefined') {
      run()
      return () => timers.forEach(window.clearTimeout)
    }

    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          // força o navegador a aplicar o estado inicial antes de iniciar a transição
          svg.getBoundingClientRect()
          raf = requestAnimationFrame(run)
        }
      },
      { threshold },
    )
    io.observe(svg)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      timers.forEach(window.clearTimeout)
      draws.forEach((el) => {
        el.style.transition = ''
        el.style.strokeDasharray = ''
        el.style.strokeDashoffset = ''
      })
      fades.forEach((el) => {
        el.style.transition = ''
        el.style.opacity = ''
      })
    }
  }, [reduced, duration, stagger, threshold])

  const informativo = Boolean(title)

  return (
    <svg
      ref={ref}
      role={informativo ? 'img' : undefined}
      aria-hidden={informativo ? undefined : true}
      aria-labelledby={informativo ? titleId : undefined}
      aria-describedby={informativo && description ? descId : undefined}
      {...rest}
    >
      {informativo ? <title id={titleId}>{title}</title> : null}
      {informativo && description ? <desc id={descId}>{description}</desc> : null}
      {children}
    </svg>
  )
}
