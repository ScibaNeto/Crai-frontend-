import { SelfDrawingSvg } from '../components/motion/SelfDrawingSvg'
import { Button } from '../components/ui/Button'
import { useConteudo } from '../lib/i18n'

export function Confirmacao() {
  const { confirmacao } = useConteudo()
  return (
    <section className="container-site pt-16 pb-24 md:pt-28 md:pb-40">
      <SelfDrawingSvg
        viewBox="0 0 96 96"
        width={96}
        height={96}
        title={confirmacao.marca}
        duration={620}
        stagger={560}
        threshold={0.1}
      >
        <circle data-draw={0} cx="48" cy="48" r="44" fill="none" stroke="var(--color-graphite)" strokeWidth="2" transform="rotate(-90 48 48)" />
        <path
          data-draw={1}
          d="M29 49.5 L42.5 63 L67 36"
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SelfDrawingSvg>

      <h1 className="t-h1 mt-10 max-w-[16em]">{confirmacao.titulo}</h1>
      <p className="t-body measure mt-5 text-silver">{confirmacao.texto}</p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        {confirmacao.links.map((link) => (
          <Button key={link.para} to={link.para} variant={link.variante}>
            {link.rotulo}
          </Button>
        ))}
      </div>
    </section>
  )
}
