import { IconCheck } from '../components/icons/Icons'
import { TiltCard } from '../components/motion/TiltCard'
import { Button } from '../components/ui/Button'
import { planosPagina } from '../data/conteudo'
import { premium, standard } from '../data/planos'

/** Dois cards em degrau: o Premium envolve visualmente o bloco "Tudo do Standard". Nenhum preço mensal. */
export function PlanCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-6">
      <TiltCard className="rounded-[14px] lg:col-span-5">
        <article className="flex h-full flex-col rounded-[14px] border border-line bg-slate p-6 md:p-8" aria-labelledby="plano-standard">
          <h2 id="plano-standard" className="t-h3">
            {standard.nome}
          </h2>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="t-number text-paper">{standard.taxa}</span>
            <span className="text-silver">{standard.base}</span>
          </p>
          <p className="t-apoio mt-4 text-silver">{standard.resumo}</p>
          <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
            {standard.itens.map((item) => (
              <li key={item} className="flex gap-3">
                <IconCheck size={20} className="mt-[3px] shrink-0 text-silver" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <Button to="/cadastro" variant="ghost" className="w-full">
              {standard.cta}
            </Button>
          </div>
        </article>
      </TiltCard>

      <TiltCard className="rounded-[14px] lg:col-span-7">
        <article className="glow-focus rounded-[14px] border border-line bg-slate p-6 md:p-8 lg:pt-12" aria-labelledby="plano-premium">
          <h2 id="plano-premium" className="t-h3">
            {premium.nome}
          </h2>

          <div className="mt-6 rounded-[8px] border border-line bg-ink/50 p-5">
            <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-[560] text-paper">{planosPagina.standardIncluido}</span>
              <span className="t-apoio text-silver">
                {standard.taxa} {standard.base}
              </span>
            </p>
            <ul className="t-apoio mt-4 grid gap-x-6 gap-y-2 text-silver sm:grid-cols-2">
              {standard.itens.map((item) => (
                <li key={item} className="flex gap-2">
                  <IconCheck size={16} className="mt-[3px] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="t-apoio mt-7 text-silver">{planosPagina.premiumSoma}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="t-number text-paper">{premium.taxa}</span>
            <span className="text-silver">{premium.base}</span>
          </p>
          <p className="t-apoio mt-4 text-silver">{premium.resumo}</p>

          <ul className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {premium.itens.map((item) => (
              <li key={item} className="flex gap-3">
                <IconCheck size={20} className="mt-[3px] shrink-0 text-silver" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Button to="/cadastro" className="w-full sm:w-auto">
              {premium.cta}
            </Button>
          </div>
        </article>
      </TiltCard>
    </div>
  )
}
