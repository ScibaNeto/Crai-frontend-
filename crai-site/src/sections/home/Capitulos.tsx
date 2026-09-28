import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { cx } from '../../lib/cx'
import { useConteudo } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { CabecalhoSecao } from './CabecalhoSecao'
import { VisualPainel, VisualRecuperacao, VisualRetencao } from './CapitulosVisuais'

const VISUAIS: ComponentType<{ ativo: boolean }>[] = [VisualRecuperacao, VisualRetencao, VisualPainel]

/** true em telas de desktop (onde o visual fica preso ao lado). */
function useDesktop() {
  const [desk, setDesk] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const on = () => setDesk(mql.matches)
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [])
  return desk
}

function Capitulo({
  indice,
  onAtivo,
  ativo,
}: {
  indice: number
  onAtivo: (i: number) => void
  ativo: boolean
}) {
  const desktop = useDesktop()
  const { capitulos } = useConteudo().home
  const item = capitulos.itens[indice]
  const ref = useRef<HTMLDivElement>(null)
  const noCentro = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const visivel = useInView(ref, { amount: 0.3 })
  const Visual = VISUAIS[indice]

  useEffect(() => {
    if (noCentro) onAtivo(indice)
  }, [noCentro, indice, onAtivo])

  return (
    <div ref={ref} className="flex min-h-[auto] flex-col justify-center py-10 lg:min-h-[66vh] lg:py-0">
      <motion.div
        animate={{ opacity: ativo || !desktop ? 1 : 0.35 }}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
        className="max-w-[34em]"
      >
        <p className="flex items-center gap-4">
          <span className="text-[44px] leading-none font-[700] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,184,108,0.7)] md:text-[56px]">
            {item.numero}
          </span>
          <span className="text-[12.5px] font-[600] tracking-[0.14em] text-amber uppercase">{item.rotulo}</span>
        </p>
        <h3 className="t-h2 mt-5">{item.titulo}</h3>
        <p className="t-body mt-4 text-silver">{item.texto}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.passos.map((p) => (
            <li key={p} className="rounded-full border border-line bg-slate/40 px-3 py-1 text-[12.5px] text-paper">
              {p}
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Mobile/tablet: o visual vem junto do texto. Só é montado fora do desktop, para os intervalos
          das animações não rodarem escondidos (e não duplicar ids de SVG). */}
      {desktop ? null : (
        <div className="glass-panel mt-8 min-h-[400px] lg:hidden">
          <Visual ativo={visivel} />
        </div>
      )}
    </div>
  )
}

/**
 * Capítulos com visual fixo (IrisFlow: capítulos 01/02/03; SVGator: scrollytelling).
 * No desktop, o visual da esquerda fica preso e troca conforme o capítulo que cruza o centro da tela.
 */
export function Capitulos() {
  const { capitulos } = useConteudo().home
  const reduced = useReducedMotion()
  const desktop = useDesktop()
  const [ativo, setAtivo] = useState(0)
  const Visual = VISUAIS[ativo]

  return (
    <section className="section-y relative border-t border-line" aria-labelledby="capitulos-titulo" id="como-funciona">
      <div className="container-site">
        <CabecalhoSecao id="capitulos-titulo" eyebrow={capitulos.eyebrow} titulo={capitulos.titulo} lead={capitulos.lead} />

        <div className="mt-10 grid lg:mt-6 lg:grid-cols-12 lg:gap-12">
          {/* Painel fixo do desktop: não é montado no celular, onde ficava oculto mas ativo, rodando
              intervalos e registrando um gradiente que "roubava" o id do medidor visível. */}
          {desktop ? (
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[16vh] flex h-[68vh] items-center">
              <div className="relative w-full">
                <span aria-hidden="true" className="device__halo opacity-60" />
                <div className="glass-panel relative min-h-[470px] overflow-hidden" role="img" aria-label={`${capitulos.visual.aria}: ${capitulos.itens[ativo].rotulo}`}>
                  {/* Trilho de progresso dos capítulos */}
                  <div className="absolute inset-x-6 top-5 z-10 flex gap-2" aria-hidden="true">
                    {capitulos.itens.map((c, i) => (
                      <span key={c.numero} className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/10">
                        <motion.span
                          className="block h-full bg-orange"
                          initial={false}
                          animate={{ width: i <= ativo ? '100%' : '0%' }}
                          transition={{ duration: 0.6, ease: EASE_EXPO }}
                        />
                      </span>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ativo}
                      className="absolute inset-0 pt-8"
                      initial={{ opacity: 0, scale: reduced ? 1 : 0.96, filter: reduced ? 'none' : 'blur(6px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: reduced ? 1 : 1.02, filter: reduced ? 'none' : 'blur(6px)' }}
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                    >
                      <Visual ativo />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          ) : null}

          <div className={cx('lg:col-span-6')}>
            {capitulos.itens.map((c, i) => (
              <Capitulo key={c.numero} indice={i} onAtivo={setAtivo} ativo={ativo === i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
