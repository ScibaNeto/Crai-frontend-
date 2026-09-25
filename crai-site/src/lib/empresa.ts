import type { Database } from './database.types'

export type EmpresaRow = Database['public']['Tables']['empresas']['Row']
export type FaixaMrr = Database['public']['Enums']['faixa_mrr']

/** Colunas da empresa que o site usa. */
export type Empresa = Pick<
  EmpresaRow,
  'id' | 'razao_social' | 'nome_fantasia' | 'cnpj' | 'plano' | 'status' | 'faixa_mrr' | 'qtd_clientes_ativos' | 'email_financeiro'
>

export const COLUNAS_EMPRESA =
  'id, razao_social, nome_fantasia, cnpj, plano, status, faixa_mrr, qtd_clientes_ativos, email_financeiro' as const

/**
 * MRR representativo de cada faixa, só para as estimativas do simulador.
 * O valor real vem da integração com a cobrança do cliente.
 */
const MRR_POR_FAIXA: Record<FaixaMrr, number> = {
  ate_25k: 20_000,
  '25k_75k': 50_000,
  '75k_200k': 137_500,
  '200k_500k': 350_000,
  acima_500k: 600_000,
}

export function mrrEstimado(faixa: FaixaMrr | null): number {
  return faixa ? MRR_POR_FAIXA[faixa] : MRR_POR_FAIXA['25k_75k']
}

export function nomeExibicao(empresa: Pick<Empresa, 'nome_fantasia' | 'razao_social'>): string {
  return empresa.nome_fantasia || empresa.razao_social
}
