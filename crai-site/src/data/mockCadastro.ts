import type { Conteudo } from './conteudo.pt'

// Dados 100% fictícios para pré-preenchimento. Não usar CNPJ, banco ou chave reais.
// O que depende de idioma (segmento, faixa, cargo, forma de cobrança, assunto, mensagem)
// é lido do copy em `mockCadastro(c)`; o resto é neutro e fica nas constantes abaixo.

export const empresaBase = {
  razaoSocial: 'NimbusFlow Tecnologia Ltda',
  nomeFantasia: 'NimbusFlow',
  cnpj: '12.345.678/0001-90',
  site: 'nimbusflow.com.br',
  mrr: 50000,
  assinantes: 500,
}

export const responsavelBase = {
  nome: 'Ana Ribeiro',
  email: 'ana.ribeiro@nimbusflow.com.br',
  telefone: '(11) 98888-1200',
  senha: 'demonstracao', // campo password, nunca exibir em claro
}

export const operacaoBase = {
  plano: 'premium' as const,
  inicio: '2026-10-01',
  aceitouTermos: true,
  aceitouComunicacao: false,
}

/** Formulários pré-preenchidos no idioma do copy recebido. */
export function mockCadastro(c: Conteudo) {
  return {
    empresa: {
      ...empresaBase,
      segmento: c.cadastro.empresa.segmentos[0],
      mrrFaixa: c.cadastro.empresa.faixas[1],
    },
    responsavel: {
      ...responsavelBase,
      cargo: c.cadastro.mock.cargo,
    },
    operacao: {
      ...operacaoBase,
      cobranca: c.cadastro.mock.cobranca,
    },
    // Pré-preenchimento do formulário de contato, derivado do mesmo responsável fictício.
    contato: {
      nome: responsavelBase.nome,
      email: responsavelBase.email,
      empresa: empresaBase.nomeFantasia,
      assunto: c.contatoPagina.assuntos[0],
      mensagem: c.cadastro.mock.mensagem,
    },
  }
}
