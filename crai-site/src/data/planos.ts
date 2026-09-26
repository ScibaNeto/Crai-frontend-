import type { Plano } from '../lib/simulador'
import type { Conteudo } from './conteudo.pt'

export interface PlanoInfo {
  id: Plano
  nome: string
  titulo: string
  resumo: string
  /** Número grande do card. */
  valor: string
  /** Texto ao lado do número; vazio quando o plano usa `detalhe`. */
  base: string
  /** Linha abaixo do número (o Premium explica a soma das duas taxas); vazio no Standard. */
  detalhe: string
  inclui: string
  itens: string[]
  cta: string
}

/** Os dois planos, com o texto do idioma do copy recebido. Nenhum preço mensal. */
export function getPlanos(c: Conteudo): Record<Plano, PlanoInfo> {
  return {
    standard: { id: 'standard', ...c.planos.standard },
    premium: { id: 'premium', ...c.planos.premium },
  }
}
