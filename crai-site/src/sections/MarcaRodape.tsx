import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useConteudo } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'
import { useReducedMotion } from '../lib/useReducedMotion'

const LETRAS = ['C', 'R', 'A', 'I']

/**
 * Marca "CRAI" do rodapé: letras sobem de trás de uma máscara e a seta laranja se desenha ao entrar
 * na tela (SVGator: animated logos + self-drawing). No hover a seta dá um passo para cima.
 */
export function MarcaRodape() {
  const { marca } = useConteudo().site.rodape
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.5 })
  const mostrar = visto || reduced

  return (
    <div className="relative overflow-hidden border-t border-line">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[8%] h-80 w-[60%] rounded-full bg-orange/10 blur-[90px]"
      />
      <div className="container-site relative flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div
          ref={ref}
          className="group flex items-start gap-[0.12em] text-[clamp(4.5rem,14vw,9.5rem)] leading-[0.8] select-none"
          aria-hidden="true"
        >
          <span className="flex overflow-hidden pb-[0.06em] font-semibold tracking-[-0.06em] text-paper">
            {LETRAS.map((l, i) => (
              <motion.span
                key={l}
                className="inline-block"
                initial={reduced ? false : { y: '105%' }}
                animate={mostrar ? { y: '0%' } : undefined}
                transition={{ duration: 0.9, delay: i * 0.07, ease: EASE_EXPO }}
              >
                {l}
              </motion.span>
            ))}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-[0.36em] w-[0.36em] text-orange transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M6 18 18 6"
              initial={reduced ? false : { pathLength: 0 }}
              animate={mostrar ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE_EXPO }}
            />
            <motion.path
              d="M8 6h10v10"
              initial={reduced ? false : { pathLength: 0 }}
              animate={mostrar ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.4, delay: 0.75, ease: EASE_EXPO }}
            />
          </svg>
        </div>
        <span className="sr-only">CRAI</span>

        <motion.p
          className="t-apoio max-w-xs text-silver md:text-right"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={mostrar ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_EXPO }}
        >
          {marca}
        </motion.p>
      </div>
    </div>
  )
}
