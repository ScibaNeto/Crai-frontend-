import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  IconActivity,
  IconCalendar,
  IconChart,
  IconCheck,
  IconClock,
  IconCode,
  IconCompare,
  IconMessage,
  IconRefresh,
  IconShield,
  type IconProps,
} from '../components/icons/Icons'
import { getPlanos, type PlanoInfo } from '../data/planos'
import { cx } from '../lib/cx'
import { useConteudo } from '../lib/i18n'
import type { Plano } from '../lib/simulador'

/** Um ícone por item da lista, na ordem do copy. Item a mais no copy cai no check. */
const ICONES: Record<Plano, ComponentType<IconProps>[]> = {
  standard: [IconRefresh, IconCalendar, IconMessage, IconCompare, IconChart],
  premium: [IconActivity, IconShield, IconClock, IconCode],
}

const DESTINO: Record<Plano, string> = {
  standard: '/cadastro?plano=standard',
  premium: '/cadastro?plano=premium',
}

/** Standard e Premium lado a lado. O Standard é o card em destaque. Nenhum preço mensal. */
export function Planos() {
  const conteudo = useConteudo()
  const { planosPagina } = conteudo
  const { standard, premium } = getPlanos(conteudo)

  return (
    <div>
      <div className="mx-auto grid max-w-[896px] gap-4 min-[861px]:grid-cols-2">
        <CardPlano plano={standard} destaque />
        <CardPlano plano={premium} />
      </div>

      <div className="mt-12 grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
        <p className="t-apoio measure text-silver lg:col-span-7">{planosPagina.nota}</p>
        <p className="t-apoio text-paper lg:col-span-4 lg:col-start-9">{planosPagina.faixa}</p>
      </div>
    </div>
  )
}

function CardPlano({ plano, destaque = false }: { plano: PlanoInfo; destaque?: boolean }) {
  const icones = ICONES[plano.id]

  return (
    <article
      className={cx(
        'flex flex-col rounded-[22px] border bg-slate p-[22px] min-[421px]:p-7',
        destaque ? 'border-orange/45' : 'border-line',
      )}
    >
      <header className="flex min-h-[30px] items-center justify-between gap-3">
        <h2 className="m-0 text-[1.125rem] font-semibold">{plano.nome}</h2>
      </header>

      <h3 className="mt-[22px] text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em] min-[421px]:text-[1.875rem]">
        {plano.titulo}
      </h3>
      <p className="mt-3 text-[0.975rem] leading-[1.55] text-silver min-[861px]:min-h-[3.1em]">{plano.resumo}</p>

      {/* Altura mínima igual nos dois cards: o Premium tem a linha de detalhe e os botões ficam alinhados. */}
      <div className="mt-[26px] mb-[18px] flex flex-col gap-1.5 min-[861px]:mb-0 min-[861px]:min-h-[92px]">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[2.3rem] leading-none font-semibold tracking-[-0.03em] text-paper tabular-nums min-[421px]:text-[2.75rem]">
            {plano.valor}
          </span>
          {plano.base ? <span className="text-[0.95rem] text-silver">{plano.base}</span> : null}
        </div>
        {plano.detalhe ? <p className="mt-1 text-[0.9rem] leading-[1.45] text-silver">{plano.detalhe}</p> : null}
      </div>

      <Link
        to={DESTINO[plano.id]}
        className={cx(
          'mt-2 flex h-12 w-full items-center justify-center rounded-full border text-[0.975rem] font-semibold',
          'transition-colors duration-150 motion-reduce:transition-none',
          'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-orange',
          destaque
            ? 'border-orange bg-orange text-ink hover:border-amber hover:bg-amber'
            : 'border-line bg-transparent text-paper hover:border-silver',
        )}
      >
        {plano.cta}
      </Link>

      <p className="mt-[30px] mb-3.5 text-[0.95rem] font-semibold">{plano.inclui}</p>
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {plano.itens.map((item, i) => {
          const Icone = icones[i] ?? IconCheck
          return (
            <li key={item} className="flex items-start gap-3.5 text-[0.95rem] leading-[1.45]">
              <Icone size={18} strokeWidth={1.8} className={cx('mt-0.5 shrink-0', destaque ? 'text-orange' : 'text-silver')} />
              <span>{item}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
