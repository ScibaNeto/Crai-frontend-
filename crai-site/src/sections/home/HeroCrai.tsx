import { motion } from 'framer-motion'
import { IconArrowRight } from '../../components/icons/Icons'
import { AmbientBackground } from '../../components/motion/AmbientBackground'
import { MagneticButton } from '../../components/motion/MagneticButton'
import { RevealWords } from '../../components/motion/Reveal'
import { Button } from '../../components/ui/Button'
import { useConteudo } from '../../lib/i18n'
import { EASE_EXPO, useIntroReady } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { PainelMockup } from './PainelMockup'

/**
 * Hero da Home no molde do IrisFlow: selo com data, título que sobe palavra a palavra com trecho
 * em gradiente, fatos com marcador, e o painel em perspectiva com halo pulsante e anéis que expandem.
 */
export function HeroCrai() {
  const ready = useIntroReady()
  const reduced = useReducedMotion()
  const { hero } = useConteudo().home

  const entra = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduced ? 0.12 : 0.8, delay: reduced ? 0 : delay, ease: EASE_EXPO },
  })

  return (
    <section className="relative flex min-h-[min(100svh,920px)] items-center overflow-hidden" aria-labelledby="hero-titulo">
      <AmbientBackground />
      <div className="container-site relative grid grid-cols-1 items-center gap-14 pt-10 pb-24 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-6">
          <motion.p className="chip" {...entra(0.05)}>
            <span className="chip__tag">{hero.selo.tag}</span>
            {hero.selo.texto}
          </motion.p>

          <RevealWords
            id="hero-titulo"
            texto={hero.titulo}
            destaque={hero.destaque}
            as="h1"
            className="mt-7 max-w-[14em] text-[40px] leading-[1.03] font-[680] tracking-[-0.04em] sm:text-[54px] lg:text-[56px] xl:text-[64px]"
            start={ready}
            delay={0.1}
          />

          <motion.p className="t-body measure mt-7 text-silver md:text-[18px]" {...entra(0.5)}>
            {hero.subtitulo}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...entra(0.62)}>
            <MagneticButton>
              <Button to={hero.acaoPrimaria.para} size="lg" className="group btn-glow rounded-full">
                {hero.acaoPrimaria.rotulo}
                <IconArrowRight size={18} />
              </Button>
            </MagneticButton>
            <Button to={hero.acaoSecundaria.para} variant="ghost" size="lg" className="rounded-full border-paper/15 bg-paper/[0.03] backdrop-blur">
              {hero.acaoSecundaria.rotulo}
            </Button>
          </motion.div>

          <motion.ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-silver" {...entra(0.74)}>
            {hero.fatos.map((f) => (
              <li key={f} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
                {f}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="device lg:col-span-6"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: reduced ? 0.12 : 1.1, delay: reduced ? 0 : 0.26, ease: EASE_EXPO }}
        >
          <span aria-hidden="true" className="device__halo" />
          <span aria-hidden="true" className="device__ring" />
          <span aria-hidden="true" className="device__ring device__ring--2" />
          <div className="device__screen mx-auto max-w-[560px]">
            <PainelMockup ativo={ready} />
          </div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:grid">
        <span className="scroll-cue__line" />
        <span className="text-[11px] tracking-[0.22em] text-silver uppercase">{hero.rolar}</span>
      </div>
    </section>
  )
}
