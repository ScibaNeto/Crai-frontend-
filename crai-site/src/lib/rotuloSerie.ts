import type { RotuloSerie } from '../data/mockPainel'
import { interpolar } from './cx'
import { useConteudo, useFormato } from './i18n'

/** Converte o rótulo estruturado de um ponto da série (data, semana ou mês) em texto no idioma atual. */
export function useRotuloSerie() {
  const { painel } = useConteudo()
  const f = useFormato()
  return (rotulo: RotuloSerie) => {
    if (rotulo.tipo === 'data') return f.dataCurta(rotulo.data)
    if (rotulo.tipo === 'semana') return interpolar(painel.semana, { n: rotulo.n })
    return painel.meses[rotulo.mes]
  }
}
