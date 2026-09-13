import { mulberry32 } from '../lib/prng'

// Dados do painel de demonstração (NimbusFlow, fictícia). Tudo determinístico:
// séries escritas à mão ou geradas com seed fixa, calculadas uma vez no carregamento do módulo.

export type Periodo = '30d' | '90d' | '12m'

export interface PontoSerie {
  rotulo: string
  controle: number // % da receita em risco recuperada pelo grupo de controle
  tratado: number // % recuperada pelo grupo que recebeu a ação da CRAI
}

export interface Indicadores {
  receitaEmRisco: number
  receitaRecuperada: number
  ganhoIncremental: number
  taxaRecuperacao: number // 25% do ganho incremental
  receitaPreservada: number
  taxaRetencao: number // 20% da receita preservada
  taxaCrai: number
}

export type MotivoFalha = 'Saldo insuficiente' | 'Limite excedido' | 'Autorização revogada' | 'Erro na instituição'

export type StatusCobranca = 'Recuperada' | 'Reagendada' | 'Em tentativa' | 'Grupo de controle' | 'Não recuperada'

export interface Cobranca {
  id: string
  assinante: string
  valor: number
  motivo: MotivoFalha
  janela: string
  status: StatusCobranca
  tentativa: number
}

export interface RiscoCancelamento {
  id: string
  assinante: string
  plano: string
  sinal: string
  risco: 'Alto' | 'Médio'
  acao: string
}

function indicadores(receitaEmRisco: number, receitaRecuperada: number, ganhoIncremental: number, receitaPreservada: number): Indicadores {
  const taxaRecuperacao = Math.round(ganhoIncremental * 0.25 * 100) / 100
  const taxaRetencao = Math.round(receitaPreservada * 0.2 * 100) / 100
  return {
    receitaEmRisco,
    receitaRecuperada,
    ganhoIncremental,
    taxaRecuperacao,
    receitaPreservada,
    taxaRetencao,
    taxaCrai: Math.round((taxaRecuperacao + taxaRetencao) * 100) / 100,
  }
}

const um = (n: number) => Math.round(n * 10) / 10

// 12 meses, escrito à mão: começa perto do controle (implantação) e se afasta.
const serie12m: PontoSerie[] = [
  { rotulo: 'Out', controle: 34.2, tratado: 35.1 },
  { rotulo: 'Nov', controle: 35.0, tratado: 39.8 },
  { rotulo: 'Dez', controle: 33.8, tratado: 44.6 },
  { rotulo: 'Jan', controle: 34.6, tratado: 47.9 },
  { rotulo: 'Fev', controle: 35.4, tratado: 50.2 },
  { rotulo: 'Mar', controle: 34.9, tratado: 51.8 },
  { rotulo: 'Abr', controle: 35.8, tratado: 53.1 },
  { rotulo: 'Mai', controle: 35.2, tratado: 53.9 },
  { rotulo: 'Jun', controle: 36.1, tratado: 54.6 },
  { rotulo: 'Jul', controle: 35.6, tratado: 55.2 },
  { rotulo: 'Ago', controle: 36.4, tratado: 55.9 },
  { rotulo: 'Set', controle: 36.0, tratado: 56.3 },
]

function gerarSerie(seed: number, pontos: number, rotulo: (i: number) => string): PontoSerie[] {
  const rand = mulberry32(seed)
  return Array.from({ length: pontos }, (_, i) => ({
    rotulo: rotulo(i),
    controle: um(35.2 + (rand() - 0.5) * 2.6),
    tratado: um(53.4 + i * (2.4 / pontos) + (rand() - 0.5) * 3.2),
  }))
}

function dataCurta(base: Date, somaDias: number) {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + somaDias)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

const inicio30d = new Date(2026, 7, 14)

export const periodos: Record<Periodo, { rotulo: string; indicadores: Indicadores; serie: PontoSerie[] }> = {
  '30d': {
    rotulo: 'Últimos 30 dias',
    indicadores: indicadores(5120, 2940, 1030, 2180),
    serie: gerarSerie(3017, 15, (i) => dataCurta(inicio30d, i * 2)),
  },
  '90d': {
    rotulo: '90 dias',
    indicadores: indicadores(15380, 8910, 3090, 6420),
    serie: gerarSerie(9011, 13, (i) => `Sem ${i + 1}`),
  },
  '12m': {
    rotulo: '12 meses',
    indicadores: indicadores(58900, 30400, 9870, 23800),
    serie: serie12m,
  },
}

export const ordemPeriodos: Periodo[] = ['30d', '90d', '12m']

export const serieReferencia = serie12m

export const empresaPainel = 'NimbusFlow Tecnologia'

type LinhaCobranca = [string, number, MotivoFalha, string, StatusCobranca, number]

const linhas: LinhaCobranca[] = [
  ['Clínica Vale Verde', 99, 'Saldo insuficiente', 'Dia 10 · 8h–11h', 'Recuperada', 2],
  ['Odonto Serra Azul', 149, 'Limite excedido', 'Dia 12 · 9h–12h', 'Reagendada', 1],
  ['Instituto Pele Viva', 119, 'Saldo insuficiente', 'Dia 6 · 7h–10h', 'Recuperada', 1],
  ['Clínica Horizonte', 89, 'Erro na instituição', 'Dia 11 · 10h–13h', 'Recuperada', 2],
  ['Fisio Movimento', 79, 'Saldo insuficiente', 'Dia 15 · 8h–11h', 'Grupo de controle', 2],
  ['Centro Médico Aurora', 249, 'Autorização revogada', '—', 'Não recuperada', 1],
  ['Clínica Bem-Estar Sul', 99, 'Saldo insuficiente', 'Dia 13 · 12h–15h', 'Em tentativa', 3],
  ['Ortho Prime', 129, 'Limite excedido', 'Dia 20 · 9h–12h', 'Reagendada', 2],
  ['Clínica Santa Luzia', 99, 'Saldo insuficiente', 'Dia 5 · 8h–11h', 'Recuperada', 1],
  ['Espaço Nutri Leve', 79, 'Saldo insuficiente', 'Dia 7 · 18h–21h', 'Grupo de controle', 1],
  ['Clínica Ponte Alta', 119, 'Erro na instituição', 'Dia 11 · 9h–12h', 'Recuperada', 1],
  ['Vita Dermatologia', 149, 'Saldo insuficiente', 'Dia 25 · 8h–11h', 'Reagendada', 2],
  ['Pediatria Pequeno Passo', 99, 'Limite excedido', 'Dia 10 · 13h–16h', 'Recuperada', 3],
  ['Clínica Mar Aberto', 89, 'Saldo insuficiente', 'Dia 14 · 8h–11h', 'Não recuperada', 3],
  ['Oftalmo Visão Clara', 129, 'Saldo insuficiente', 'Dia 6 · 9h–12h', 'Recuperada', 2],
  ['Clínica Jardim Norte', 99, 'Autorização revogada', '—', 'Grupo de controle', 1],
  ['Psico Equilíbrio', 79, 'Saldo insuficiente', 'Dia 16 · 19h–22h', 'Em tentativa', 2],
  ['Clínica Três Rios', 119, 'Limite excedido', 'Dia 21 · 8h–11h', 'Reagendada', 1],
  ['Cardio Vale', 249, 'Saldo insuficiente', 'Dia 5 · 10h–13h', 'Recuperada', 1],
  ['Clínica Nova Esperança', 99, 'Erro na instituição', 'Dia 12 · 8h–11h', 'Recuperada', 2],
  ['Studio Fisio Ativa', 89, 'Saldo insuficiente', 'Dia 18 · 7h–10h', 'Grupo de controle', 2],
  ['Clínica Alto da Serra', 129, 'Saldo insuficiente', 'Dia 9 · 9h–12h', 'Não recuperada', 3],
  ['Odonto Sorriso Leste', 149, 'Limite excedido', 'Dia 22 · 12h–15h', 'Reagendada', 1],
  ['Clínica Boa Vista', 99, 'Saldo insuficiente', 'Dia 8 · 8h–11h', 'Recuperada', 1],
]

export const cobrancas: Cobranca[] = linhas.map(([assinante, valor, motivo, janela, status, tentativa], i) => ({
  id: `cb-${String(i + 1).padStart(3, '0')}`,
  assinante,
  valor,
  motivo,
  janela,
  status,
  tentativa,
}))

export const riscosCancelamento: RiscoCancelamento[] = [
  { id: 'rc-1', assinante: 'Clínica Horizonte', plano: 'Plano Clínica', sinal: 'Uso caiu 48% nas últimas 4 semanas', risco: 'Alto', acao: 'Contato do time de sucesso do cliente' },
  { id: 'rc-2', assinante: 'Ortho Prime', plano: 'Plano Rede', sinal: 'Duas cobranças falharam em sequência', risco: 'Alto', acao: 'Oferecer pausa de um mês' },
  { id: 'rc-3', assinante: 'Vita Dermatologia', plano: 'Plano Clínica', sinal: 'Pediu exportação completa dos dados', risco: 'Alto', acao: 'Perguntar o motivo, sem oferta' },
  { id: 'rc-4', assinante: 'Espaço Nutri Leve', plano: 'Plano Essencial', sinal: 'Nenhum acesso do administrador há 21 dias', risco: 'Médio', acao: 'Enviar resumo de uso do mês' },
  { id: 'rc-5', assinante: 'Clínica Três Rios', plano: 'Plano Clínica', sinal: 'Usuários ativos caíram de 12 para 5', risco: 'Médio', acao: 'Sugerir plano menor' },
  { id: 'rc-6', assinante: 'Psico Equilíbrio', plano: 'Plano Essencial', sinal: 'Chamado de suporte sem resposta há 6 dias', risco: 'Médio', acao: 'Priorizar o chamado em aberto' },
  { id: 'rc-7', assinante: 'Cardio Vale', plano: 'Plano Rede', sinal: 'Visitou a página de cancelamento', risco: 'Alto', acao: 'Oferecer conversa com o time, se quiser' },
  { id: 'rc-8', assinante: 'Clínica Boa Vista', plano: 'Plano Clínica', sinal: 'Recurso de agenda sem uso há 30 dias', risco: 'Médio', acao: 'Oferecer treinamento para a equipe' },
]
