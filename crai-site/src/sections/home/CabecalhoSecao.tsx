import { Reveal, RevealWords } from '../../components/motion/Reveal'
import { cx } from '../../lib/cx'

interface CabecalhoSecaoProps {
  id: string
  eyebrow: string
  titulo: string
  lead?: string
  centro?: boolean
  className?: string
}

/** Abertura de seção: rótulo com filete, h2 palavra a palavra ao entrar na tela e lead que sobe. */
export function CabecalhoSecao({ id, eyebrow, titulo, lead, centro = false, className }: CabecalhoSecaoProps) {
  return (
    <div className={cx(centro && 'mx-auto text-center', className)}>
      <Reveal>
        <p className={cx('eyebrow', centro && 'justify-center')}>{eyebrow}</p>
      </Reveal>
      <RevealWords
        id={id}
        texto={titulo}
        as="h2"
        noScroll
        className={cx('t-h1 mt-5 max-w-[17em]', centro && 'mx-auto')}
      />
      {lead ? (
        <Reveal delay={0.15}>
          <p className={cx('t-body measure mt-6 text-silver', centro && 'mx-auto')}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
