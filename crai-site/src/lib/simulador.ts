export const PREMISSAS = {
  taxaFalha: 0.1, // 10% do MRR tropeça na cobrança
  ganhoIncremental: 0.2, // 20% da receita em risco, acima do grupo de controle
  feeRecuperacao: 0.25, // Standard
  feeRetencao: 0.2, // Premium
  receitaPreservadaSobreMrr: 0.045, // default derivado do cliente de referência — confirmar
}

// confirmar: faixa de MRR atendida hoje
export const FAIXA_ATENDIDA = { min: 25_000, max: 500_000 }

export type Plano = 'standard' | 'premium'

export interface ResultadoSimulacao {
  receitaEmRisco: number
  ganhoIncrementalRS: number
  taxaStandard: number
  receitaPreservada: number
  taxaRetencao: number
  taxaCrai: number
  ficaComVoce: number
  foraDaFaixa: boolean
}

const centavos = (valor: number) => Math.round(valor * 100) / 100

export function simular(mrr: number, plano: Plano, premissas = PREMISSAS): ResultadoSimulacao {
  const base = Math.max(0, Number.isFinite(mrr) ? mrr : 0)

  // Recuperação
  const receitaEmRisco = base * premissas.taxaFalha
  const ganhoIncrementalRS = receitaEmRisco * premissas.ganhoIncremental
  const taxaStandard = ganhoIncrementalRS * premissas.feeRecuperacao

  // Retenção (só Premium)
  const receitaPreservada = base * premissas.receitaPreservadaSobreMrr
  const taxaRetencao = receitaPreservada * premissas.feeRetencao

  // Totais
  const custoPremium = taxaStandard + taxaRetencao
  const liquidoPremium = ganhoIncrementalRS + receitaPreservada - custoPremium
  const liquidoStandard = ganhoIncrementalRS - taxaStandard

  const premium = plano === 'premium'

  return {
    receitaEmRisco: centavos(receitaEmRisco),
    ganhoIncrementalRS: centavos(ganhoIncrementalRS),
    taxaStandard: centavos(taxaStandard),
    receitaPreservada: premium ? centavos(receitaPreservada) : 0,
    taxaRetencao: premium ? centavos(taxaRetencao) : 0,
    taxaCrai: centavos(premium ? custoPremium : taxaStandard),
    ficaComVoce: centavos(premium ? liquidoPremium : liquidoStandard),
    foraDaFaixa: base < FAIXA_ATENDIDA.min || base > FAIXA_ATENDIDA.max,
  }
}
