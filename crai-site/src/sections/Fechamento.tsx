import { Button } from '../components/ui/Button'
import { home } from '../data/conteudo'

export function Fechamento() {
  const { fechamento } = home
  return (
    <section className="container-site section-y" aria-labelledby="fechamento-titulo">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="fechamento-titulo" className="t-h1">
            {fechamento.titulo}
          </h2>
          <p className="t-body measure mt-4 text-silver">{fechamento.texto}</p>
        </div>
        <div className="lg:col-span-5">
          <Button to={fechamento.acao.para} size="lg">
            {fechamento.acao.rotulo}
          </Button>
        </div>
      </div>
    </section>
  )
}
