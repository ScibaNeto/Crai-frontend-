import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'

/** Filete laranja no topo que acompanha a leitura da página. */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  if (reduced) return null
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />
}
