import { Button } from '../components/ui/Button'
import { useConteudo } from '../lib/i18n'

export function Fechamento() {
  const { fechamento } = useConteudo().home
  return (
    <section className="container-site section-y" aria-labelledby="fechamento-titulo">
      <div aria-hidden="true" className="ledger-rule" />
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h2 id="fechamento-titulo" className="t-display max-w-[10em]">
            {fechamento.titulo}
          </h2>
          <p className="t-body measure mt-6 text-silver">{fechamento.texto}</p>
        </div>
        <div className="lg:col-span-4">
          <Button to={fechamento.acao.para} size="lg">
            {fechamento.acao.rotulo}
          </Button>
        </div>
      </div>
    </section>
  )
}
