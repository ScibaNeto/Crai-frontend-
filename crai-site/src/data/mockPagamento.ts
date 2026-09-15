import type { Conteudo } from './conteudo.pt'

// Autorização de cobrança fictícia. Nenhum dado aqui corresponde a conta ou chave real.

export const autorizacaoBase = {
  titular: 'NimbusFlow Tecnologia Ltda',
  documento: '12.345.678/0001-90',
  agencia: '0001',
  conta: '123456-7',
  chavePix: 'financeiro@nimbusflow.com.br',
  diaApuracao: 5,
  limitePorCobranca: 2000,
  autorizado: true,
}

/** Autorização pré-preenchida; a instituição vem da lista do copy no idioma atual. */
export function mockPagamento(c: Conteudo) {
  return { ...autorizacaoBase, instituicao: c.pagamento.instituicoes[0] }
}
