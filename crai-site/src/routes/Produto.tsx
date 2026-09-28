import { IconCardOff, IconFile, IconShield, IconSwap } from '../components/icons/Icons'
import { IndiceCapitulos } from '../components/layout/IndiceCapitulos'
import { PageShell } from '../components/layout/PageShell'
import { Reveal, RevealWords } from '../components/motion/Reveal'
import { Spotlight } from '../components/motion/Spotlight'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useConteudo } from '../lib/i18n'
import { FluxoRecuperacao } from '../sections/FluxoRecuperacao'
import { GrupoControle } from '../sections/GrupoControle'
import { CtaFinal } from '../sections/home/CtaFinal'
import { LiquidezIlustracao } from '../sections/LiquidezIlustracao'
import { MorphIcon } from '../sections/MorphIcon'
import { PainelPrints } from '../sections/PainelPrints'

const ICONES_DADOS = {
  entrada: IconFile,
  lgpd: IconShield,
  cartao: IconCardOff,
  gateway: IconSwap,
}

export function Produto() {
  const { produto } = useConteudo()
  const { recuperacao, liquidez, retencao, painel, dados, indice } = produto

  return (
    <PageShell titulo={produto.titulo} lead={produto.lead}>
      <IndiceCapitulos aria={indice.aria} itens={indice.itens} />
      {/* 1. Recuperação — protagonista: diagrama auto-desenhado */}
      <section id="recuperacao" className="container-site scroll-mt-32 pb-20 md:pb-32" aria-labelledby="recuperacao-titulo">
        <div className="grid gap-10 border-t border-line pt-16 md:pt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <RevealWords id="recuperacao-titulo" as="h2" noScroll texto={recuperacao.titulo} className="t-h2" />
            {recuperacao.paragrafos.map((p) => (
              <p key={p} className="t-body measure mt-5 text-silver">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <MorphIcon />
          </div>
        </div>
        <Reveal className="mt-12">
          <div className="glass-panel p-5 md:p-10">
            <FluxoRecuperacao />
          </div>
        </Reveal>
      </section>

      {/* 2. Inferência de liquidez */}
      <section id="liquidez" className="section-y scroll-mt-32 border-t border-line" aria-labelledby="liquidez-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <RevealWords id="liquidez-titulo" as="h2" noScroll texto={liquidez.titulo} className="t-h2" />
              <Badge>{liquidez.badge}</Badge>
            </div>
            <p className="t-body measure mt-5 text-paper">{liquidez.texto}</p>
            <p className="t-body measure mt-4 text-silver">{liquidez.nota}</p>
          </div>
          <div className="lg:col-span-7">
            <LiquidezIlustracao />
          </div>
        </div>
      </section>

      {/* 3. Retenção */}
      <section id="retencao" className="section-y scroll-mt-32 border-t border-line" aria-labelledby="retencao-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <RevealWords id="retencao-titulo" as="h2" noScroll texto={retencao.titulo} className="t-h2" />
            <p className="t-body measure mt-5 text-silver">{retencao.texto}</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="t-apoio text-paper">{retencao.sinaisTitulo}</h3>
                <ul className="mt-3 flex flex-col divide-y divide-line border-y border-line">
                  {retencao.sinais.map((s) => (
                    <li key={s} className="flex items-center gap-3 py-3 text-silver transition-colors duration-300 hover:text-paper">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="t-apoio text-paper">{retencao.acoesTitulo}</h3>
                <ul className="mt-3 flex flex-col divide-y divide-line border-y border-line">
                  {retencao.acoes.map((a) => (
                    <li key={a} className="flex items-center gap-3 py-3 text-silver transition-colors duration-300 hover:text-paper">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9 lg:self-center" aria-labelledby="compromisso-titulo">
            <Reveal>
            <div className="beam">
            <div className="beam__inner group p-6 md:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-[14px] border border-orange/30 bg-orange/10 text-amber">
                <IconShield size={26} />
              </span>
              <h3 id="compromisso-titulo" className="t-h3 mt-6">
                {retencao.compromisso.titulo}
              </h3>
              <p className="t-body mt-3 text-silver">{retencao.compromisso.texto}</p>
            </div>
            </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* 4. Medição */}
      <GrupoControle />

      {/* 5. Painel */}
      <section id="painel" className="section-y scroll-mt-32 border-t border-line" aria-labelledby="painel-titulo">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <RevealWords id="painel-titulo" as="h2" noScroll texto={painel.titulo} className="t-h2" />
              <p className="t-body measure mt-5 text-silver">{painel.texto}</p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Button to={painel.link.para} variant="link">
                {painel.link.rotulo}
              </Button>
            </div>
          </div>
          <Reveal className="mt-10">
            <PainelPrints />
          </Reveal>
        </div>
      </section>

      {/* 6. Dados e limites */}
      <section id="dados" className="section-y scroll-mt-32 border-t border-line" aria-labelledby="dados-titulo">
        <div className="container-site">
          <RevealWords id="dados-titulo" as="h2" noScroll texto={dados.titulo} className="t-h2" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {dados.itens.map((item, i) => {
              const Icone = ICONES_DADOS[item.id as keyof typeof ICONES_DADOS]
              return (
                <li key={item.id}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <Spotlight className="group h-full rounded-[18px] border border-line bg-slate/40 p-6">
                      <span className="grid h-11 w-11 place-items-center rounded-[12px] border border-line bg-ink/50 text-silver transition-all duration-500 group-hover:-rotate-6 group-hover:border-orange/40 group-hover:text-amber">
                        <Icone size={22} />
                      </span>
                      <h3 className="t-h3 mt-8">{item.titulo}</h3>
                      <p className="t-apoio mt-3 text-silver">{item.texto}</p>
                    </Spotlight>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <CtaFinal />
    </PageShell>
  )
}
