import { useEffect } from 'react'
import { Wordmark } from '../components/ui/Wordmark'
import { useConteudo } from '../lib/i18n'

/**
 * Erro de renderização em qualquer rota (errorElement do roteador). Fica fora do layout de propósito:
 * se o erro veio do cabeçalho ou do rodapé, repeti-los aqui só quebraria de novo.
 */
export function ErroInesperado() {
  const { erroInesperado } = useConteudo()

  useEffect(() => {
    document.title = erroInesperado.tituloAba
  }, [erroInesperado.tituloAba])

  return (
    <main className="container-site flex min-h-dvh flex-col justify-center py-20">
      <span className="text-[26px]" aria-hidden="true">
        <Wordmark instant decorative />
      </span>
      <h1 className="t-h1 mt-10 max-w-[15em]">{erroInesperado.titulo}</h1>
      <p className="t-body measure mt-6 text-silver">{erroInesperado.texto}</p>
      <div className="mt-10">
        {/* Link comum (não <Link>): recarrega a página e zera o estado que causou o erro. */}
        <a
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-[4px] bg-orange px-6 text-[16px] font-[560] text-ink transition-colors hover:bg-amber focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber"
        >
          {erroInesperado.inicio}
        </a>
      </div>
    </main>
  )
}
