import { Button } from '../components/ui/Button'
import { useConteudo } from '../lib/i18n'

export function ModeloComercial() {
  const { modelo } = useConteudo().home
  return (
    <section className="container-site section-y" aria-labelledby="modelo-titulo">
      <div aria-hidden="true" className="ledger-rule" />
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
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

        {/* Extrato: borda serrilhada, linhas pontilhadas de guia e filete duplo de total. */}
        <div className="receipt bg-slate px-6 pt-9 pb-7 md:px-8 md:pt-11 lg:col-span-5 lg:col-start-8">
          <h3 className="t-label text-silver">{modelo.extratoTitulo}</h3>
          <dl className="mt-5">
            {modelo.extrato.map((linha) => (
              <div key={linha.rotulo} className="flex items-baseline gap-3 py-3">
                <dt className="flex min-w-0 flex-1 items-baseline gap-3 text-silver after:min-w-6 after:flex-1 after:border-b after:border-dotted after:border-graphite after:content-['']">
                  {linha.rotulo}
                </dt>
                <dd className="text-right font-mono text-[14px] text-paper">{linha.valor}</dd>
              </div>
            ))}
          </dl>
          <div aria-hidden="true" className="mt-4 border-t-[3px] border-double border-silver/30" />
        </div>
      </div>
    </section>
  )
}
