import { PageShell } from '../components/layout/PageShell'
import { Card } from '../components/ui/Card'
import { empresaPagina } from '../data/conteudo'

function iniciais(nome: string) {
  const partes = nome.split(' ').filter((p) => p.length > 2)
  return `${partes[0]?.[0] ?? ''}${partes[partes.length - 1]?.[0] ?? ''}`
}

export function Empresa() {
  const { proposito, operacao, time, origem } = empresaPagina

  return (
    <PageShell titulo={empresaPagina.titulo} lead={empresaPagina.lead}>
      <section className="container-site pb-20 md:pb-28" aria-labelledby="proposito-titulo">
        <div className="grid gap-6 border-t border-line pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8">
          <h2 id="proposito-titulo" className="t-h2 lg:col-span-4">
            {proposito.titulo}
          </h2>
          <p className="t-quote text-paper lg:col-span-7 lg:col-start-6">{proposito.texto}</p>
        </div>
      </section>

      <section className="section-y border-t border-line" aria-labelledby="operacao-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="operacao-titulo" className="t-h2 lg:col-span-4">
            {operacao.titulo}
          </h2>
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {operacao.itens.map((item) => (
              <div key={item.titulo} className="border-t border-graphite pt-5">
                <dt className="t-apoio text-silver">{item.titulo}</dt>
                <dd className="t-body mt-2 text-paper">{item.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-y border-t border-line" aria-labelledby="time-titulo">
        <div className="container-site">
          <h2 id="time-titulo" className="t-h2">
            {time.titulo}
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {time.pessoas.map((pessoa) => (
              <Card as="li" key={pessoa.nome} className="flex flex-col p-6 md:p-8">
                <span aria-hidden="true" className="font-display text-[56px] leading-none tracking-[-0.03em] text-silver">
                  {iniciais(pessoa.nome)}
                </span>
                <h3 className="t-h3 mt-10">{pessoa.nome}</h3>
                <p className="t-apoio mt-2 text-silver">{pessoa.cargo}</p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-slate" aria-labelledby="origem-titulo">
        <div className="container-site grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="origem-titulo" className="t-h2 lg:col-span-4">
            {origem.titulo}
          </h2>
          <p className="t-body measure text-silver lg:col-span-7 lg:col-start-6">{origem.texto}</p>
        </div>
      </section>
    </PageShell>
  )
}
