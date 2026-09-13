import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { IconBolt, IconForecast, IconPlug, IconScale } from '../components/icons/Icons'
import { ScrollytellingSection } from '../components/motion/ScrollytellingSection'
import { home } from '../data/conteudo'
import { cx } from '../lib/cx'
import { EASE_EXPO } from '../lib/intro'

const ICONES = [IconPlug, IconForecast, IconBolt, IconScale]

function Ilustracao({ ativo }: { ativo: number }) {
  const { passos } = home.comoFunciona
  return (
    <div aria-hidden="true" className="rounded-[14px] border border-line bg-slate p-4 md:p-6">
      <LayoutGroup id="como-funciona">
        <ul className="grid grid-cols-2 gap-3">
          {passos.map((passo, i) => {
            const Icone = ICONES[i]
            const on = ativo === i
            return (
              <motion.li key={passo.numero} layout className="relative min-h-28 rounded-[8px] border border-line bg-ink/40 p-4 md:min-h-36 md:p-5">
                {on ? (
                  <motion.span
                    layoutId="como-funciona-ativo"
                    className="absolute inset-[-1px] rounded-[8px] border border-orange/70 bg-orange/[0.05]"
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  />
                ) : null}
                <span className="relative flex items-start justify-between">
                  <Icone size={26} className={cx('transition-colors duration-300', on ? 'text-orange' : 'text-silver')} />
                  <span className="t-label text-silver">{passo.numero}</span>
                </span>
                <span
                  className={cx(
                    'font-display relative mt-8 block text-[22px] leading-[1.1] tracking-[-0.01em] transition-colors duration-300 md:mt-12 md:text-[26px]',
                    on ? 'text-paper' : 'text-silver',
                  )}
                >
                  {passo.titulo}
                </span>
              </motion.li>
            )
          })}
        </ul>
      </LayoutGroup>

      <div className="mt-5 flex items-center gap-4 border-t border-line pt-5">
        <div className="flex gap-1.5">
          {passos.map((passo, i) => (
            <span key={passo.numero} className="relative block h-0.5 w-6 overflow-hidden bg-graphite/60">
              <motion.span
                className="absolute inset-y-0 left-0 bg-orange"
                initial={false}
                animate={{ width: i <= ativo ? '100%' : '0%' }}
                transition={{ duration: 0.45, ease: EASE_EXPO }}
              />
            </span>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={ativo}
            className="t-apoio text-silver"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {passos[ativo].estado}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function ComoFunciona() {
  const { comoFunciona } = home
  return (
    <section className="section-y" aria-labelledby="como-titulo">
      <div className="container-site">
        <div aria-hidden="true" className="ledger-rule" />
        <h2 id="como-titulo" className="t-h1 mt-8">
          {comoFunciona.titulo}
        </h2>
        <div className="mt-10 lg:mt-4">
          <ScrollytellingSection passos={comoFunciona.passos} ilustracao={(ativo) => <Ilustracao ativo={ativo} />} />
        </div>
      </div>
    </section>
  )
}
