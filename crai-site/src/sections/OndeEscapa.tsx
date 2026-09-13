import { IconCardFail, IconClockRetry, IconExit } from '../components/icons/Icons'
import { HorizontalRail } from '../components/motion/HorizontalRail'
import { Card } from '../components/ui/Card'
import { home } from '../data/conteudo'

const ICONES = {
  falha: IconCardFail,
  cega: IconClockRetry,
  cancelamento: IconExit,
}

/** Três blocos sem numeração — não é sequência. */
export function OndeEscapa() {
  const { escapa } = home
  return (
    <section className="container-site section-y" aria-labelledby="escapa-titulo">
      <h2 id="escapa-titulo" className="t-h2">
        {escapa.titulo}
      </h2>
      <div className="mt-10 md:mt-14">
        <HorizontalRail ariaLabel={escapa.trilhoAria}>
          {escapa.blocos.map((bloco) => {
            const Icone = ICONES[bloco.id as keyof typeof ICONES]
            return (
              <Card key={bloco.id} as="article" className="group h-full p-6 transition-colors duration-300 hover:border-silver/30 md:p-8">
                <Icone size={28} className="text-silver transition-colors duration-300 group-hover:text-paper" />
                <h3 className="t-h3 mt-10">{bloco.titulo}</h3>
                <p className="t-body mt-3 text-silver">{bloco.texto}</p>
              </Card>
            )
          })}
        </HorizontalRail>
      </div>
    </section>
  )
}
