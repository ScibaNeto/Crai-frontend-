import { IconArrowRight, IconCheck } from '../../components/icons/Icons'
import { CountUp } from '../../components/motion/CountUp'
import { Reveal } from '../../components/motion/Reveal'
import { Spotlight } from '../../components/motion/Spotlight'
import { Button } from '../../components/ui/Button'
import { cx } from '../../lib/cx'
import { useConteudo, useFormato } from '../../lib/i18n'
import { CabecalhoSecao } from './CabecalhoSecao'

type PlanoHome = ReturnType<typeof useConteudo>['home']['preco']['planos'][number]

function CardPlano({ plano }: { plano: PlanoHome }) {
  const destaque = Boolean(plano.selo)
  const corpo = (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div className="flex items-center justify-between gap-3">
        <h3 className="t-h3">{plano.nome}</h3>
        {plano.selo ? <span className="rounded-full bg-orange px-2.5 py-0.5 text-[12px] font-[650] text-ink">{plano.selo}</span> : null}
      </div>
      <p className="t-apoio mt-2 text-silver">{plano.resumo}</p>
      <p className="mt-8 flex items-end gap-2">
        <span className={cx('text-[72px] leading-[0.9] font-[700] tracking-[-0.05em]', destaque ? 'text-gradient' : 'text-paper')}>
          {plano.prefixo}
          <CountUp value={plano.taxa} format={(v) => String(Math.round(v))} duration={1100} />%
        </span>
        <span className="pb-2 text-[14px] text-silver">{plano.unidade}</span>
      </p>
      <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
        {plano.itens.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] text-paper">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/15 text-amber">
              <IconCheck size={13} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
  return destaque ? (
    <div className="beam h-full">
      <div className="beam__inner">{corpo}</div>
    </div>
  ) : (
    <Spotlight className="h-full rounded-[18px] border border-line bg-slate/40">{corpo}</Spotlight>
  )
}

/** Preço: R$ 0 de entrada, os dois planos (Premium com borda de feixe girando) e o exemplo do modelo. */
export function Preco() {
  const { preco } = useConteudo().home
  const formato = useFormato()
  return (
    <section className="section-y relative border-t border-line" aria-labelledby="preco-titulo">
      <div className="container-site">
        <CabecalhoSecao id="preco-titulo" eyebrow={preco.eyebrow} titulo={preco.titulo} lead={preco.lead} />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {preco.planos.map((p, i) => (
            <Reveal key={p.nome} delay={i * 0.1} className="h-full">
              <CardPlano plano={p} />
            </Reveal>
          ))}

          <Reveal delay={0.2} className="h-full">
            <div className="receipt flex h-full flex-col rounded-b-[18px] bg-paper/[0.04] p-6 pt-8 md:p-8 md:pt-10">
              <p className="text-[12.5px] font-[600] tracking-[0.14em] text-silver uppercase">{preco.exemplo.titulo}</p>
              <dl className="mt-6 flex flex-col">
                {preco.exemplo.linhas.map((l) => (
                  <div key={l.rotulo} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-4">
                    <dt className="text-[15px] text-silver">{l.rotulo}</dt>
                    <dd className="text-[28px] font-[680] tracking-[-0.03em] text-paper">
                      <CountUp value={l.valor} format={formato.brlInteiro} duration={1200} />
                      <span className="ml-1 text-[14px] font-[450] text-silver">{preco.exemplo.porMes}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="t-apoio mt-5 text-silver">{preco.exemplo.nota}</p>
              <p className="mt-auto flex items-center gap-3 pt-8 text-[14px] text-paper">
                <span className="pulse-dot" aria-hidden="true" />
                {preco.garantia}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <Button to={preco.acao.para} variant="ghost" size="lg" className="group rounded-full">
            {preco.acao.rotulo}
            <IconArrowRight size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
