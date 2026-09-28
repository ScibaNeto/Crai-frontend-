import { motion } from 'framer-motion'
import { IconCardFail, IconClockRetry, IconExit } from '../../components/icons/Icons'
import { CountUp } from '../../components/motion/CountUp'
import { Reveal } from '../../components/motion/Reveal'
import { Spotlight } from '../../components/motion/Spotlight'
import { useConteudo, useLang } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { CabecalhoSecao } from './CabecalhoSecao'

const ICONES = { falha: IconCardFail, cega: IconClockRetry, cancelamento: IconExit } as const
const isIcone = (id: string): id is keyof typeof ICONES => id in ICONES

/** O problema em números (contadores ao entrar na tela) + as três formas de perda em cards com spotlight. */
export function Numeros() {
  const { numeros, escapa } = useConteudo().home
  const lang = useLang()
  const inteiro = (v: number) => Math.round(v).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')

  return (
    <section className="section-y relative" aria-labelledby="numeros-titulo">
      <div className="container-site">
        <CabecalhoSecao id="numeros-titulo" eyebrow={numeros.eyebrow} titulo={numeros.titulo} lead={numeros.lead} />

        <dl className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {numeros.stats.map((s, i) => (
            <motion.div
              key={s.texto}
              className="flex flex-col bg-ink p-6 md:p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_EXPO }}
            >
              <dt className="order-2 mt-4 text-[15px] leading-[1.5] text-paper">{s.texto}</dt>
              <dd className="order-1 text-[46px] leading-none font-[700] tracking-[-0.045em] md:text-[54px]">
                {s.tipo === 'milBrl' ? (
                  <span className="text-gradient">
                    R$&nbsp;
                    <CountUp value={s.de} format={inteiro} duration={1300} />
                    {lang === 'pt' ? ' mil' : 'k'}
                  </span>
                ) : (
                  <span className={i === 0 ? 'text-gradient' : 'text-paper'}>
                    <CountUp value={s.de} format={inteiro} duration={1300} />
                    {s.ate ? (
                      <>
                        –<CountUp value={s.ate} format={inteiro} duration={1500} />
                      </>
                    ) : null}
                    %
                  </span>
                )}
              </dd>
              <dd className="order-3 mt-auto pt-6 text-[12px] text-silver">{s.fonte}</dd>
            </motion.div>
          ))}
        </dl>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {escapa.blocos.map((b, i) => {
            const Icon = isIcone(b.id) ? ICONES[b.id] : IconExit
            return (
              <li key={b.id}>
                <Reveal delay={i * 0.08} className="h-full">
                <Spotlight className="group h-full rounded-[18px] border border-line bg-slate/40 p-6 md:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-[12px] border border-orange/30 bg-orange/10 text-amber transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={22} />
                  </span>
                  <h3 className="t-h3 mt-6">{b.titulo}</h3>
                  <p className="t-apoio mt-3 text-silver md:text-[15px]">{b.texto}</p>
                </Spotlight>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
