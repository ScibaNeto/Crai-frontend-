import { home } from '../data/conteudo'

/** Bloco de honestidade, 12/12, fundo slate com hachura discreta. */
export function NaoFazemos() {
  const { naoFaz } = home
  return (
    <section className="hatch section-y bg-slate" aria-labelledby="naofaz-titulo">
      <div className="container-site">
        <h2 id="naofaz-titulo" className="t-h1">
          {naoFaz.titulo}
        </h2>
        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {naoFaz.itens.map((item) => (
            <li key={item.titulo} className="border-t border-graphite pt-6">
              <h3 className="t-h2">{item.titulo}</h3>
              <p className="t-body mt-4 text-silver">{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
