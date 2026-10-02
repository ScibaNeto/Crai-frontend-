import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { Reveal, RevealWords } from '../components/motion/Reveal'
import { Spotlight } from '../components/motion/Spotlight'
import { Card } from '../components/ui/Card'
import { TextoRico } from '../components/ui/TextoRico'
import { useConteudo } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'
import { CtaFinal } from '../sections/home/CtaFinal'
import { Parceiros } from '../sections/home/Parceiros'

export function Empresa() {
  const { empresaPagina } = useConteudo()
  const { proposito, operacao, time, origem, declaracao } = empresaPagina

  return (
    <PageShell titulo={empresaPagina.titulo} lead={empresaPagina.lead}>
      {/* Propósito */}
      <section className="container-site pb-20 md:pb-28" aria-labelledby="proposito-titulo">
        <div className="grid gap-6 border-t border-line pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8">
          <RevealWords id="proposito-titulo" as="h2" noScroll texto={proposito.titulo} className="t-h2 lg:col-span-4" />
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="t-quote text-paper">
              <span aria-hidden="true" className="mr-1 text-orange">“</span>
              {proposito.texto}
              <span aria-hidden="true" className="ml-1 text-orange">”</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Missão, visão e valores */}
      <section className="section-y border-t border-line" aria-labelledby="declaracao-titulo">
        <div className="container-site">
          <Reveal>
            <p id="declaracao-titulo" className="eyebrow">
              {declaracao.eyebrow}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="beam h-full">
                <div className="beam__inner p-7 md:p-10">
                  <h3 className="text-[12.5px] font-[650] tracking-[0.14em] text-amber uppercase">{declaracao.missao.rotulo}</h3>
                  <p className="mt-5 text-[21px] leading-[1.4] font-[520] tracking-[-0.015em] text-paper md:text-[24px]">{declaracao.missao.texto}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <Spotlight className="h-full rounded-[18px] border border-line bg-slate/40 p-7 md:p-10">
                <h3 className="text-[12.5px] font-[650] tracking-[0.14em] text-silver uppercase">{declaracao.visao.rotulo}</h3>
                <p className="mt-5 text-[21px] leading-[1.4] font-[520] tracking-[-0.015em] text-paper md:text-[24px]">{declaracao.visao.texto}</p>
              </Spotlight>
            </Reveal>
          </div>

          <h3 className="t-h3 mt-16">{declaracao.valoresTitulo}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {declaracao.valores.map((v, i) => (
              <motion.li
                key={v.nome}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_EXPO }}
              >
                <Spotlight className="group h-full rounded-[18px] border border-line bg-slate/40 p-6">
                  <span className="text-[34px] leading-none font-[700] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-amber)_70%,transparent)] transition-colors duration-500 group-hover:text-orange/30">
                    0{i + 1}
                  </span>
                  <p className="t-h3 mt-5">{v.nome}</p>
                  <p className="t-apoio mt-3 text-silver">{v.texto}</p>
                </Spotlight>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como opera */}
      <section className="section-y border-t border-line" aria-labelledby="operacao-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <RevealWords id="operacao-titulo" as="h2" noScroll texto={operacao.titulo} className="t-h2 lg:col-span-4" />
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {operacao.itens.map((item, i) => (
              <Reveal key={item.titulo} delay={i * 0.08}>
                <div className="group border-t border-graphite pt-5 transition-colors duration-500 hover:border-orange">
                  <dt className="t-apoio text-silver transition-colors group-hover:text-amber">{item.titulo}</dt>
                  <dd className="t-body mt-2 text-paper">
                    <TextoRico texto={item.texto} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Time */}
      <section className="section-y border-t border-line" aria-labelledby="time-titulo">
        <div className="container-site">
          <RevealWords id="time-titulo" as="h2" noScroll texto={time.titulo} className="t-h2" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {time.pessoas.map((pessoa, i) => (
              <motion.li
                key={pessoa.nome}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_EXPO }}
              >
                <Card className="group flex h-full flex-col overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={pessoa.foto}
                      alt={pessoa.nome}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="foto-time aspect-[4/5] w-full object-cover object-top"
                    />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="t-h3">{pessoa.nome}</h3>
                    <p className="t-apoio mt-2 text-silver">{pessoa.cargo}</p>
                  </div>
                </Card>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Parceiros />

      {/* Origem */}
      <section className="hatch section-y bg-slate" aria-labelledby="origem-titulo">
        <div className="container-site grid gap-6 lg:grid-cols-12 lg:gap-8">
          <RevealWords id="origem-titulo" as="h2" noScroll texto={origem.titulo} className="t-h2 lg:col-span-4" />
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="t-body measure text-silver">{origem.texto}</p>
          </Reveal>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <CtaFinal />
      </div>
    </PageShell>
  )
}
