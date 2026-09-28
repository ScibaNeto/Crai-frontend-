import { motion, useInView } from 'framer-motion'
import { Fragment, useRef, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Entrada discreta ao entrar na viewport. Uso contido — o protagonista de cada página é outro efeito. */
export function Reveal({ children, delay = 0, y = 14, className }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0.12 : 0.6, delay: reduced ? 0 : delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  )
}

interface RevealWordsProps {
  texto: string
  as?: 'h1' | 'h2' | 'p'
  className?: string
  /** Só começa quando true (ex.: depois do preloader). */
  start?: boolean
  delay?: number
  /** Anima ao entrar na viewport em vez de ao montar. */
  noScroll?: boolean
  /** Trecho final do texto que ganha o gradiente laranja/âmbar animado. */
  destaque?: string
  id?: string
}

/**
 * Tipografia expressiva (SVGator: expressive typography; IrisFlow: word-rise com máscara):
 * palavra a palavra, subindo de trás de uma máscara, 60ms de escalonamento.
 */
export function RevealWords({ texto, as: Tag = 'h1', className, start = true, delay = 0, noScroll = false, destaque, id }: RevealWordsProps) {
  const reduced = useReducedMotion()
  // O gatilho de rolagem observa o título inteiro: as palavras nascem recortadas (clip-path) e o
  // IntersectionObserver não as considera visíveis.
  const ref = useRef<HTMLHeadingElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.5 })
  const palavras = texto.split(' ')
  const nDestaque = destaque && texto.endsWith(destaque) ? destaque.split(' ').length : 0
  const inicioDestaque = palavras.length - nDestaque

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {nDestaque ? (
          <>
            {palavras.slice(0, inicioDestaque).join(' ')} <span className="text-gradient">{destaque}</span>
          </>
        ) : (
          texto
        )}
      </Tag>
    )
  }

  const alvo = { clipPath: 'inset(0% 0% 0% 0%)', y: '0em' }
  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palavras.map((palavra, i) => (
          <Fragment key={`${palavra}-${i}`}>
            <motion.span
              className={cx('-mb-[0.14em] inline-block pb-[0.14em] will-change-transform', i >= inicioDestaque && nDestaque ? 'text-gradient' : undefined)}
              initial={{ clipPath: 'inset(0% 0% 100% 0%)', y: '0.42em' }}
              animate={start && (!noScroll || visto) ? alvo : undefined}
              transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE_EXPO }}
            >
              {palavra}
            </motion.span>
            {i < palavras.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
