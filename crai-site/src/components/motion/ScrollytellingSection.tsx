import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../lib/cx'

export interface PassoScrolly {
  numero: string
  titulo: string
  texto: string
}

interface ScrollytellingSectionProps {
  passos: PassoScrolly[]
  ilustracao: (ativo: number) => ReactNode
}

/**
 * Scrollytelling (10.5): ilustração sticky à esquerda, passos à direita.
 * O passo que cruza o meio da tela vira o ativo. No mobile, empilha sem sticky.
 */
export function ScrollytellingSection({ passos, ilustracao }: ScrollytellingSectionProps) {
  const [ativo, setAtivo] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setAtivo(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [passos.length])

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">{ilustracao(ativo)}</div>
      </div>
      <ol className="lg:col-span-5 lg:col-start-8">
        {passos.map((passo, i) => (
          <li
            key={passo.numero}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-index={i}
            aria-current={ativo === i ? 'step' : undefined}
            className="relative border-t border-line py-8 lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center lg:py-12"
          >
            <span
              aria-hidden="true"
              className={cx(
                'absolute top-[-1px] left-0 h-px bg-orange transition-[width] duration-500 ease-[var(--ease-expo)]',
                ativo === i ? 'w-16' : 'w-0',
              )}
            />
            <span className={cx('t-apoio tabular transition-colors duration-300', ativo === i ? 'text-paper' : 'text-silver')}>
              {passo.numero}
            </span>
            <h3 className="t-h3 mt-2 text-paper">{passo.titulo}</h3>
            <p className="t-body measure mt-3 text-silver">{passo.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
