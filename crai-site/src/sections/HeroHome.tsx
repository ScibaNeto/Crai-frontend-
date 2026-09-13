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
      <div className="container-site relative grid items-center gap-14 pt-14 pb-20 md:pt-24 md:pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-28 lg:pb-36">
        <div className="lg:col-span-7">
          <RevealWords texto={hero.titulo} as="h1" className="t-display max-w-[11em]" start={ready} />
          <motion.p className="t-body measure mt-7 text-silver" {...entra(0.5)}>
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
        <motion.div className="lg:col-span-5" {...entra(0.25)}>
          <HeroChart />
        </motion.div>
      </div>
    </section>
  )
}
