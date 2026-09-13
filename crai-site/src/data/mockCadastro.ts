// Dados 100% fictícios para pré-preenchimento. Não usar CNPJ, banco ou chave reais.

export const empresa = {
  razaoSocial: 'NimbusFlow Tecnologia Ltda',
  nomeFantasia: 'NimbusFlow',
  cnpj: '12.345.678/0001-90',
  site: 'nimbusflow.com.br',
  segmento: 'SaaS de gestão para clínicas',
  mrrFaixa: 'R$ 25 mil a R$ 75 mil',
  mrr: 50000,
  assinantes: 500,
}

export const responsavel = {
  nome: 'Ana Ribeiro',
  cargo: 'Head de Receita',
  email: 'ana.ribeiro@nimbusflow.com.br',
  telefone: '(11) 98888-1200',
  senha: 'demonstracao', // campo password, nunca exibir em claro
}

export const operacao = {
  plano: 'premium' as const,
  cobranca: 'Pix Automático',
  inicio: '2026-10-01',
  aceitouTermos: true,
  aceitouComunicacao: false,
}

// Pré-preenchimento do formulário de contato, derivado do mesmo responsável fictício.
export const contato = {
  nome: responsavel.nome,
  email: responsavel.email,
  empresa: empresa.nomeFantasia,
  assunto: 'Quero entender o Premium',
  mensagem:
    'Olá, time da CRAI. Temos cerca de 500 assinantes e queremos entender como funciona a apuração da receita preservada no Premium e quanto tempo leva a integração.',
}
