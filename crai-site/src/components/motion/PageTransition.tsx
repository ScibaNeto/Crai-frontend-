import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'

const completo: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_EXPO } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } },
}

const reduzido: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
}

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.div variants={reduced ? reduzido : completo} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}
