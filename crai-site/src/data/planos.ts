import type { Plano } from '../lib/simulador'
import type { Conteudo } from './conteudo.pt'

export interface PlanoInfo {
  id: Plano
  nome: string
  taxa: string
  base: string
  resumo: string
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
