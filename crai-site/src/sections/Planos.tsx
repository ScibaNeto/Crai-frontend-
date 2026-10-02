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
import { CountUp } from '../components/motion/CountUp'
import { Reveal } from '../components/motion/Reveal'
import { Spotlight } from '../components/motion/Spotlight'
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

/** Standard e Premium lado a lado. O Premium é o card em destaque, igual à seção de preço da Home. Nenhum preço mensal. */
export function Planos() {
  const conteudo = useConteudo()
  const { planosPagina } = conteudo
  const { standard, premium } = getPlanos(conteudo)

  return (
    <div>
      <div className="mx-auto grid max-w-[896px] gap-4 min-[861px]:grid-cols-2">
        <Reveal className="h-full">
          <CardPlano plano={standard} />
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <CardPlano plano={premium} destaque />
        </Reveal>
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
  // "25%" / "45%": o número conta ao entrar na tela; o resto do texto fica como está.
  const numero = Number.parseFloat(plano.valor)
  const sufixo = Number.isNaN(numero) ? '' : plano.valor.replace(String(numero), '')

  const corpo = (
    <article className="flex h-full flex-col p-[22px] min-[421px]:p-7">
      <header className="flex min-h-[30px] items-center justify-between gap-3">
        <h2 className="m-0 text-[1.125rem] font-semibold">{plano.nome}</h2>
        {plano.selo ? <span className="rounded-full bg-orange px-2.5 py-0.5 text-[12px] font-[650] text-on-accent">{plano.selo}</span> : null}
      </header>

      <h3 className="mt-[22px] text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em] min-[421px]:text-[1.875rem]">
        {plano.titulo}
      </h3>
      <p className="mt-3 text-[0.975rem] leading-[1.55] text-silver min-[861px]:min-h-[3.1em]">{plano.resumo}</p>

      {/* Altura mínima igual nos dois cards: o Premium tem a linha de detalhe e os botões ficam alinhados. */}
      <div className="mt-[26px] mb-[18px] flex flex-col gap-1.5 min-[861px]:mb-0 min-[861px]:min-h-[92px]">
        <div className="flex items-baseline gap-2.5">
          <span
            className={cx(
              'text-[2.6rem] leading-none font-[700] tracking-[-0.04em] tabular-nums min-[421px]:text-[3.4rem]',
              destaque ? 'text-gradient' : 'text-paper',
            )}
          >
            {Number.isNaN(numero) ? (
              plano.valor
            ) : (
              <>
                <CountUp value={numero} format={(v) => String(Math.round(v))} duration={1100} />
                {sufixo}
              </>
            )}
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
            ? 'btn-shine relative border-orange bg-orange text-on-accent hover:border-amber hover:bg-amber hover:shadow-[0_10px_30px_-10px_rgba(239,147,17,0.7)]'
            : 'border-line bg-transparent text-paper hover:border-silver hover:bg-paper/[0.03]',
        )}
      >
        {plano.cta}
      </Link>

      <p className="mt-[30px] mb-3.5 text-[0.95rem] font-semibold">{plano.inclui}</p>
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {plano.itens.map((item, i) => {
          const Icone = icones[i] ?? IconCheck
          return (
            <li key={item} className="flex items-start gap-3.5 text-[0.95rem] leading-[1.45] transition-transform duration-300 hover:translate-x-1">
              <Icone size={18} strokeWidth={1.8} className={cx('mt-0.5 shrink-0', destaque ? 'text-orange' : 'text-silver')} />
              <span>{item}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )

  return destaque ? (
    <div className="beam h-full rounded-[22px]">
      <div className="beam__inner rounded-[21px]">{corpo}</div>
    </div>
  ) : (
    <Spotlight className="h-full rounded-[22px] border border-line bg-slate/60">{corpo}</Spotlight>
  )
}
