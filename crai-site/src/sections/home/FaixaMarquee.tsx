import { Marquee } from '../../components/motion/Marquee'
import { useConteudo } from '../../lib/i18n'

/** Faixa contínua com o que a CRAI cobre, logo abaixo do hero. */
export function FaixaMarquee() {
  const { marquee } = useConteudo().home
  return (
    <div className="border-y border-line bg-slate/30 py-5">
      <Marquee
        ariaLabel={marquee.aria}
        duracao={42}
        itens={marquee.itens.map((t) => (
          <span key={t} className="text-[15px] font-[520] tracking-[-0.005em] whitespace-nowrap text-silver md:text-[17px]">
            {t}
          </span>
        ))}
      />
    </div>
  )
}
