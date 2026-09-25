import { useConteudo } from '../lib/i18n'

// Substitui o letreiro "CRAI" gigante e apagado com a seta por cima das letras.
// Se preferir tirar de vez, é só remover este componente do rodapé.

/** Marca "CRAI" nítida, com a seta laranja depois do I (sem cruzar as letras). */
export function MarcaRodape() {
  const { marca } = useConteudo().site.rodape
  return (
    <div className="border-t border-line">
      <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="group flex items-start gap-[0.12em] text-[clamp(4.5rem,14vw,9.5rem)] leading-[0.8] select-none">
          <span className="font-semibold tracking-[-0.06em] text-paper">CRAI</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[0.36em] w-[0.36em] text-orange transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18 18 6" />
            <path d="M8 6h10v10" />
          </svg>
        </div>

        <p className="t-apoio max-w-xs text-silver md:text-right">{marca}</p>
      </div>
    </div>
  )
}
