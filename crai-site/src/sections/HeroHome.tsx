import { motion } from 'framer-motion'
import { AmbientBackground } from '../components/motion/AmbientBackground'
import { MagneticButton } from '../components/motion/MagneticButton'
import { RevealWords } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { home } from '../data/conteudo'
import { EASE_EXPO, useIntroReady } from '../lib/intro'
import { useReducedMotion } from '../lib/useReducedMotion'
import { HeroChart } from './HeroChart'

export function HeroHome() {
  const ready = useIntroReady()
  const reduced = useReducedMotion()
  const { hero } = home

  const entra = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduced ? 0.12 : 0.7, delay: reduced ? 0 : delay, ease: EASE_EXPO },
  })

  return (
    <section className="relative overflow-hidden">
      <AmbientBackground />
      <div className="container-site relative pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div aria-hidden="true" className="editorial-grid" />

        <RevealWords texto={hero.titulo} as="h1" className="t-display relative max-w-[12em]" start={ready} />

        {/* Filete de livro-caixa que se estende sob o título. */}
        <motion.div
          aria-hidden="true"
          className="ledger-rule relative mt-10 md:mt-14"
          style={{ transformOrigin: '0 50%' }}
          initial={reduced ? false : { scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE_EXPO }}
        />

        <div className="relative mt-10 grid items-start gap-14 md:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.p className="t-body measure text-silver" {...entra(0.5)}>
              {hero.subtitulo}
            </motion.p>
            <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...entra(0.62)}>
              <MagneticButton>
                <Button to={hero.acaoPrimaria.para} size="lg">
                  {hero.acaoPrimaria.rotulo}
                </Button>
              </MagneticButton>
              <Button to={hero.acaoSecundaria.para} variant="ghost" size="lg">
                {hero.acaoSecundaria.rotulo}
              </Button>
            </motion.div>
            <motion.p className="t-apoio mt-6 text-silver" {...entra(0.74)}>
              {hero.apoio}
            </motion.p>
          </div>
          <motion.div className="lg:col-span-7" {...entra(0.25)}>
            <HeroChart />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
