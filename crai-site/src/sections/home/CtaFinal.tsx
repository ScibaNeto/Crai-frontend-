import { IconArrowRight } from '../../components/icons/Icons'
import { AmbientBackground } from '../../components/motion/AmbientBackground'
import { MagneticButton } from '../../components/motion/MagneticButton'
import { Reveal, RevealWords } from '../../components/motion/Reveal'
import { Button } from '../../components/ui/Button'
import { useConteudo } from '../../lib/i18n'

/** Fechamento: painel grande com o fundo ambiente, convite ao diagnóstico gratuito. */
export function CtaFinal() {
  const { cta } = useConteudo().home
  return (
    <section className="container-site pb-24 md:pb-32" aria-labelledby="cta-titulo">
      <div className="relative overflow-hidden rounded-[28px] border border-orange/25 bg-slate/40 px-6 py-20 text-center md:px-12 md:py-28">
        <AmbientBackground />
        <div className="relative">
          <Reveal>
            <p className="eyebrow justify-center">{cta.eyebrow}</p>
          </Reveal>
          <RevealWords id="cta-titulo" texto={cta.titulo} as="h2" noScroll className="t-h1 mx-auto mt-6 max-w-[14em]" />
          <Reveal delay={0.15}>
            <p className="t-body measure mx-auto mt-6 text-silver">{cta.texto}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton>
                <Button to={cta.acaoPrimaria.para} size="lg" className="group btn-glow rounded-full">
                  {cta.acaoPrimaria.rotulo}
                  <IconArrowRight size={18} />
                </Button>
              </MagneticButton>
              <Button to={cta.acaoSecundaria.para} variant="ghost" size="lg" className="rounded-full border-paper/15 bg-paper/[0.03]">
                {cta.acaoSecundaria.rotulo}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
