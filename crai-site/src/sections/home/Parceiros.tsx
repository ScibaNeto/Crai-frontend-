import { motion } from 'framer-motion'
import { Spotlight } from '../../components/motion/Spotlight'
import { useConteudo } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { CabecalhoSecao } from './CabecalhoSecao'

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')

/** Parceiros validadores: cards com monograma, cargo e empresa. Nenhum logotipo de terceiros. */
export function Parceiros() {
  const { parceiros } = useConteudo().home
  return (
    <section className="section-y relative border-t border-line" aria-labelledby="parceiros-titulo">
      <div className="container-site">
        <CabecalhoSecao id="parceiros-titulo" eyebrow={parceiros.eyebrow} titulo={parceiros.titulo} lead={parceiros.lead} />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {parceiros.pessoas.map((p, i) => (
            <motion.li
              key={p.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_EXPO }}
            >
              <Spotlight className="group h-full rounded-[18px] border border-line bg-slate/40 p-6 md:p-8">
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-orange to-amber text-[18px] font-[700] text-ink transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                >
                  {iniciais(p.nome)}
                </span>
                <p className="t-h3 mt-6">{p.nome}</p>
                <p className="t-apoio mt-1 text-paper">
                  {p.papel} · <span className="text-amber">{p.empresa}</span>
                </p>
                <p className="t-apoio mt-5 border-t border-line pt-4 text-silver">{p.area}</p>
              </Spotlight>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
