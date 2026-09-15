import type { StatusCobranca } from '../data/mockPainel'
import { cx } from '../lib/cx'
import { useConteudo } from '../lib/i18n'

const PONTO: Record<StatusCobranca, string> = {
  recuperada: 'bg-orange',
  reagendada: 'bg-amber/70',
  tentativa: 'bg-silver',
  controle: 'border border-silver bg-transparent',
  naoRecuperada: 'bg-graphite',
}

export function StatusCobrancaTag({ status, compacto = false }: { status: StatusCobranca; compacto?: boolean }) {
  const rotulos = useConteudo().painel.status
  return (
    <span className={cx('inline-flex items-center gap-2 whitespace-nowrap', status === 'recuperada' ? 'text-paper' : 'text-silver')}>
      <span aria-hidden="true" className={cx('h-2 w-2 shrink-0 rounded-full', PONTO[status])} />
      <span className={compacto ? 'sr-only' : undefined}>{rotulos[status]}</span>
    </span>
  )
}
