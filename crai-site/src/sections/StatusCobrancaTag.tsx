import type { StatusCobranca } from '../data/mockPainel'
import { cx } from '../lib/cx'

const PONTO: Record<StatusCobranca, string> = {
  Recuperada: 'bg-orange',
  Reagendada: 'bg-amber/70',
  'Em tentativa': 'bg-silver',
  'Grupo de controle': 'border border-silver bg-transparent',
  'Não recuperada': 'bg-graphite',
}

export function StatusCobrancaTag({ status, compacto = false }: { status: StatusCobranca; compacto?: boolean }) {
  return (
    <span className={cx('inline-flex items-center gap-2 whitespace-nowrap', status === 'Recuperada' ? 'text-paper' : 'text-silver')}>
      <span aria-hidden="true" className={cx('h-2 w-2 shrink-0 rounded-full', PONTO[status])} />
      <span className={compacto ? 'sr-only' : undefined}>{status}</span>
    </span>
  )
}
