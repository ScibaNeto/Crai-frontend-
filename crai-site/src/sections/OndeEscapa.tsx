import { IconCardFail, IconClockRetry, IconExit } from '../components/icons/Icons'
import { HorizontalRail } from '../components/motion/HorizontalRail'
import { useConteudo } from '../lib/i18n'

const ICONES = {
  falha: IconCardFail,
  cega: IconClockRetry,
  cancelamento: IconExit,
}

/** Três blocos sem numeração — não é sequência. Colunas abertas, separadas por filete, como num relatório. */
export function OndeEscapa() {
  const { escapa } = useConteudo().home
  return (
    <section className="container-site section-y" aria-labelledby="escapa-titulo">
      <div aria-hidden="true" className="ledger-rule" />
      <h2 id="escapa-titulo" className="t-h1 mt-8 max-w-[14em]">
        {escapa.titulo}
      </h2>
      <div className="mt-12 md:mt-16">
        <HorizontalRail ariaLabel={escapa.trilhoAria}>
          {escapa.blocos.map((bloco) => {
            const Icone = ICONES[bloco.id as keyof typeof ICONES]
            return (
              <article key={bloco.id} className="group relative h-full border-t border-line pt-6 md:pt-8">
                <span
                  aria-hidden="true"
                  className="absolute top-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100"
                />
                <Icone size={26} className="text-silver transition-colors duration-300 group-hover:text-paper" />
                <h3 className="t-h2 mt-8 md:mt-12">{bloco.titulo}</h3>
                <p className="t-body mt-4 text-silver">{bloco.texto}</p>
              </article>
            )
          })}
        </HorizontalRail>
      </div>
    </section>
  )
}
