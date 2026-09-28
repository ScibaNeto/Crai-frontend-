import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { EASE_EXPO, useIntroReady } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { AmbientBackground } from '../motion/AmbientBackground'
import { RevealWords } from '../motion/Reveal'

interface PageShellProps {
  titulo: ReactNode
  lead?: ReactNode
  badge?: ReactNode
  children?: ReactNode
  className?: string
}

/**
 * Abertura padrão das páginas internas: fundo ambiente suave, h1 palavra a palavra e lead que sobe.
 * Mesma linguagem do hero da Home, em escala menor.
 */
export function PageShell({ titulo, lead, badge, children, className }: PageShellProps) {
  const ready = useIntroReady()
  const reduced = useReducedMotion()
  return (
    <div className={className}>
      <div className="relative overflow-hidden">
        <AmbientBackground variant="suave" />
        <div className="container-site relative pt-14 pb-12 md:pt-24 md:pb-20">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {typeof titulo === 'string' ? (
              <RevealWords texto={titulo} as="h1" className={cx('t-h1 max-w-[16em]')} start={ready} />
            ) : (
              <h1 className={cx('t-h1 max-w-[16em]')}>{titulo}</h1>
            )}
            {badge}
          </div>
          {lead ? (
            <motion.p
              className="t-body measure mt-6 text-silver"
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0.12 : 0.8, delay: reduced ? 0 : 0.35, ease: EASE_EXPO }}
            >
              {lead}
            </motion.p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  )
}
