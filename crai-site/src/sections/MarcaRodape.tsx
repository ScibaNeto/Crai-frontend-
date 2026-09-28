import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useConteudo } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'
import { useReducedMotion } from '../lib/useReducedMotion'
import { LOGO_A, LOGO_LETRAS, LOGO_SETA, LOGO_VIEWBOX, SETA_CAIXA } from '../components/ui/logoCrai'

/**
 * Logo grande do rodapé: sobe de trás de uma máscara e a seta laranja se revela ao entrar na tela.
 * No hover a seta dá um passo para cima.
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
          className="group w-[clamp(15rem,44vw,31rem)] select-none"
          aria-hidden="true"
        >
          <div className="overflow-hidden pb-[0.5%]">
            <motion.svg
              viewBox={LOGO_VIEWBOX}
              className="block h-auto w-full overflow-visible"
              focusable="false"
              initial={reduced ? false : { y: '105%' }}
              animate={mostrar ? { y: '0%' } : undefined}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
            >
              <defs>
                <clipPath id="crai-seta-rodape">
                  <motion.rect
                    x={SETA_CAIXA.x}
                    y={SETA_CAIXA.y}
                    height={SETA_CAIXA.altura}
                    initial={reduced ? false : { width: 0 }}
                    animate={mostrar ? { width: SETA_CAIXA.largura } : undefined}
                    transition={{ duration: 0.7, delay: 0.45, ease: EASE_EXPO }}
                  />
                </clipPath>
              </defs>
              <path fill="var(--color-paper)" fillRule="evenodd" d={LOGO_LETRAS} />
              <path fill="var(--color-silver)" fillRule="evenodd" d={LOGO_A} />
              <g className="transition-transform duration-300 group-hover:translate-x-[10px] group-hover:-translate-y-[10px] motion-reduce:transition-none">
                <g clipPath="url(#crai-seta-rodape)">
                  <path fill="var(--color-orange)" fillRule="evenodd" d={LOGO_SETA} />
                </g>
              </g>
            </motion.svg>
          </div>
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
