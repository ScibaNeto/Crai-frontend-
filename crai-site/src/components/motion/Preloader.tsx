import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Wordmark } from '../ui/Wordmark'

/** Wordmark com a seta se desenhando (~900ms) e fade de 240ms. Total ≤ 1,2s. */
export function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 940)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.24, ease: 'easeOut' } }}
      aria-hidden="true"
    >
      <Wordmark className="text-[56px] md:text-[72px]" duration={0.86} delay={0.04} strokeWidth={3} decorative />
    </motion.div>
  )
}
