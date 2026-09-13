import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { home } from '../data/conteudo'

export function ModeloComercial() {
  const { modelo } = home
  return (
    <section className="container-site section-y border-t border-line" aria-labelledby="modelo-titulo">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2 id="modelo-titulo" className="t-h1">
            {modelo.titulo}
          </h2>
          <p className="t-body measure mt-6 text-silver">{modelo.texto}</p>
          <div className="mt-8">
            <Button to={modelo.link.para} variant="link">
              {modelo.link.rotulo}
            </Button>
          </div>
        </div>

        <Card className="glow-focus p-6 md:p-8 lg:col-span-5 lg:col-start-8">
          <h3 className="t-apoio text-silver">{modelo.extratoTitulo}</h3>
          <dl className="mt-3 divide-y divide-line">
            {modelo.extrato.map((linha) => (
              <div key={linha.rotulo} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-silver">{linha.rotulo}</dt>
                <dd className="tabular text-right font-[540] text-paper">{linha.valor}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </section>
  )
}
