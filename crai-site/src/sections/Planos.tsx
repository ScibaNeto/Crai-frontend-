import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from '../components/icons/Icons'
import { getPlanos } from '../data/planos'
import { cx, interpolar } from '../lib/cx'
import { useConteudo } from '../lib/i18n'
import type { Plano } from '../lib/simulador'
import { useReducedMotion } from '../lib/useReducedMotion'

interface CardPlano {
  id: Plano
  nome: string
  taxas: { valor: string; base: string }[]
  resumo: string
  itens: string[]
  cta: string
  destino: string
}

/** Standard e Premium lado a lado, com o mesmo tamanho. Passar o mouse destaca; clicar seleciona. Nenhum preço mensal. */
export function Planos() {
  const conteudo = useConteudo()
  const { planosPagina } = conteudo
  const { standard, premium } = getPlanos(conteudo)
  const reduced = useReducedMotion()
  const [selecionado, setSelecionado] = useState<Plano | null>(null)
  const [sobMouse, setSobMouse] = useState<Plano | null>(null)

  // O premium soma as duas taxas: a do Standard e a da retenção.
  const cards: CardPlano[] = [
    {
      ...standard,
      taxas: [{ valor: standard.taxa, base: standard.base }],
      destino: '/cadastro?plano=standard',
    },
    {
      ...premium,
      taxas: [
        { valor: standard.taxa, base: standard.base },
        { valor: premium.taxa, base: premium.base },
      ],
      itens: [planosPagina.standardIncluido, ...premium.itens],
      destino: '/cadastro?plano=premium',
    },
  ]

  // O card sob o mouse cresce; sem mouse em cima, o card clicado fica maior.
  const ativo = sobMouse ?? selecionado

  return (
    <div>
      <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 md:gap-8" onMouseLeave={() => setSobMouse(null)}>
        {cards.map((plano) => {
          const emDestaque = ativo === plano.id
          const escolhido = selecionado === plano.id
          const outroEmDestaque = ativo !== null && !emDestaque

          return (
            <motion.article
              key={plano.id}
              role="button"
              tabIndex={0}
              aria-pressed={escolhido}
              aria-label={interpolar(planosPagina.selecionarAria, { plano: plano.nome })}
              onMouseEnter={() => setSobMouse(plano.id)}
              onClick={() => setSelecionado(plano.id)}
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelecionado(plano.id)
                }
              }}
              animate={{
                scale: reduced ? 1 : emDestaque ? 1.04 : 1,
                opacity: outroEmDestaque ? 0.72 : 1,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{ zIndex: emDestaque ? 1 : 0 }}
              className={cx(
                'relative flex h-full cursor-pointer flex-col rounded-[14px] border bg-slate p-6 outline-none md:p-8',
                'transition-[border-color,box-shadow] duration-200',
                'focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                escolhido
                  ? 'border-orange shadow-[0_0_48px_-12px_rgba(239,147,17,0.45)]'
                  : emDestaque
                    ? 'border-amber/50'
                    : 'border-line',
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="t-h3">{plano.nome}</h2>
                {escolhido ? <span className="t-apoio text-orange">{planosPagina.selecionado}</span> : null}
              </div>

              <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
                {plano.taxas.map((taxa) => (
                  <div key={taxa.base}>
                    <p className="text-5xl leading-none font-semibold tracking-tight text-paper tabular-nums md:text-6xl">{taxa.valor}</p>
                    <p className="t-apoio mt-2 text-silver">{taxa.base}</p>
                  </div>
                ))}
              </div>

              <p className="t-apoio mt-6 text-silver">{plano.resumo}</p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                {plano.itens.map((item) => (
                  <li key={item} className="t-apoio flex gap-3 text-paper">
                    <IconCheck size={16} className="mt-[3px] shrink-0 text-silver" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  to={plano.destino}
                  onClick={(e) => e.stopPropagation()}
                  className={cx(
                    'block rounded-[8px] px-5 py-3 text-center text-sm font-semibold transition-colors',
                    'focus-visible:ring-2 focus-visible:ring-amber focus-visible:outline-none',
                    escolhido || emDestaque ? 'bg-orange text-ink hover:bg-amber' : 'border border-graphite text-paper hover:border-silver',
                  )}
                >
                  {plano.cta}
                </Link>
              </div>
            </motion.article>
          )
        })}
      </div>

      <div className="mt-12 grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
        <p className="t-apoio measure text-silver lg:col-span-7">{planosPagina.nota}</p>
        <p className="t-apoio text-paper lg:col-span-4 lg:col-start-9">{planosPagina.faixa}</p>
      </div>
    </div>
  )
}
