import { motion } from 'framer-motion'
import { Fragment, type ReactNode } from 'react'
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
}

/** Tipografia expressiva (10.3): palavra a palavra com máscara, 60ms de escalonamento. Só no hero da Home e no 404. */
export function RevealWords({ texto, as: Tag = 'h1', className, start = true, delay = 0 }: RevealWordsProps) {
  const reduced = useReducedMotion()
  const palavras = texto.split(' ')

  if (reduced) {
    return (
      <Tag className={className}>
        <motion.span initial={{ opacity: 0 }} animate={start ? { opacity: 1 } : undefined} transition={{ duration: 0.12 }}>
          {texto}
        </motion.span>
      </Tag>
    )
  }

  return (
    <Tag className={className}>
      {palavras.map((palavra, i) => (
        <Fragment key={`${palavra}-${i}`}>
          <motion.span
            className="-mb-[0.14em] inline-block pb-[0.14em] will-change-transform"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)', y: '0.32em' }}
            animate={start ? { clipPath: 'inset(0% 0% 0% 0%)', y: '0em' } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE_EXPO }}
          >
            {palavra}
          </motion.span>
          {i < palavras.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
