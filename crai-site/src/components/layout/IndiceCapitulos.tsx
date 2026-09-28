import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface IndiceCapitulosProps {
  aria: string
  itens: { id: string; rotulo: string }[]
}

/**
 * Índice fixo das seções da página (IrisFlow: capítulos; SVGator: scrollytelling).
 * A pílula de vidro acompanha a seção que está no meio da tela; clicar rola até ela.
 */
export function IndiceCapitulos({ aria, itens }: IndiceCapitulosProps) {
  const reduced = useReducedMotion()
  const [ativo, setAtivo] = useState(itens[0]?.id ?? '')
  const trilho = useRef<HTMLOListElement>(null)

  // No celular o índice rola na horizontal: mantém a pílula ativa à vista, sem mexer na rolagem da página.
  useEffect(() => {
    const ol = trilho.current
    const a = ol?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!ol || !a) return
    // Posição relativa ao trilho. (a.offsetLeft era sempre 0: o offsetParent do link é o <li relative>.)
    const esquerda = a.getBoundingClientRect().left - ol.getBoundingClientRect().left + ol.scrollLeft
    ol.scrollTo({ left: Math.max(0, esquerda - 24), behavior: reduced ? 'auto' : 'smooth' })
  }, [ativo, reduced])

  useEffect(() => {
    const alvos = itens.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el))
    if (!alvos.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    alvos.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [itens])

  return (
    <nav aria-label={aria} className="sticky top-16 z-40 border-y border-line bg-ink/75 backdrop-blur-xl">
      <ol ref={trilho} className="container-site rail relative flex gap-1 overflow-x-auto py-2">
        {itens.map((item, i) => (
          <li key={item.id} className="relative shrink-0">
            {ativo === item.id ? (
              <motion.span
                layoutId="indice-capitulos"
                aria-hidden="true"
                className="nav-pill__glass"
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
              />
            ) : null}
            <a
              href={`#${item.id}`}
              aria-current={ativo === item.id ? 'location' : undefined}
              className={cx(
                'relative z-[1] flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors',
                ativo === item.id ? 'text-paper' : 'text-silver hover:text-paper',
              )}
            >
              <span className={cx('tabular text-[11px]', ativo === item.id ? 'text-orange' : 'text-graphite')}>0{i + 1}</span>
              {item.rotulo}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
