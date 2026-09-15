import { mulberry32 } from '../lib/prng'
import type { Conteudo } from './conteudo.pt'

// Dados do painel de demonstração (NimbusFlow, fictícia). Tudo determinístico:
// séries escritas à mão ou geradas com seed fixa, calculadas uma vez no carregamento do módulo.
// Nenhum texto visível vive aqui: motivos, status, riscos e casos são ids que apontam para o copy
// (`conteudo.*.ts`), e os rótulos do eixo do tempo são estruturados para formatar no idioma atual.

export type Periodo = '30d' | '90d' | '12m'

export type RotuloSerie = { tipo: 'data'; data: Date } | { tipo: 'semana'; n: number } | { tipo: 'mes'; mes: number }

export interface PontoSerie {
  rotulo: RotuloSerie
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

export type MotivoFalha = keyof Conteudo['painel']['motivos']
export type StatusCobranca = keyof Conteudo['painel']['status']
export type RiscoNivel = keyof Conteudo['painel']['retencao']['riscos']
export type PlanoAssinante = keyof Conteudo['painel']['retencao']['planosAssinante']
export type CasoRetencao = keyof Conteudo['painel']['retencao']['casos']

/** Janela estimada de liquidez: dia do mês e faixa de horas (24h). */
export interface JanelaEstimada {
  dia: number
  de: number
  ate: number
}

export interface Cobranca {
  id: string
  assinante: string
  valor: number
  motivo: MotivoFalha
  janela: JanelaEstimada | null
  status: StatusCobranca
  tentativa: number
}

export interface RiscoCancelamento {
  id: CasoRetencao
  assinante: string
  plano: PlanoAssinante
  risco: RiscoNivel
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

// 12 meses, escrito à mão: começa perto do controle (implantação) e se afasta. Out → Set.
const valores12m: [number, number][] = [
  [34.2, 35.1],
  [35.0, 39.8],
  [33.8, 44.6],
  [34.6, 47.9],
  [35.4, 50.2],
  [34.9, 51.8],
  [35.8, 53.1],
  [35.2, 53.9],
  [36.1, 54.6],
  [35.6, 55.2],
  [36.4, 55.9],
  [36.0, 56.3],
]
const serie12m: PontoSerie[] = valores12m.map(([controle, tratado], i) => ({
  rotulo: { tipo: 'mes', mes: (9 + i) % 12 },
  controle,
  tratado,
}))

function gerarSerie(seed: number, pontos: number, rotulo: (i: number) => RotuloSerie): PontoSerie[] {
  const rand = mulberry32(seed)
  return Array.from({ length: pontos }, (_, i) => ({
    rotulo: rotulo(i),
    controle: um(35.2 + (rand() - 0.5) * 2.6),
    tratado: um(53.4 + i * (2.4 / pontos) + (rand() - 0.5) * 3.2),
  }))
}

function somarDias(base: Date, dias: number) {
  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + dias)
}

const inicio30d = new Date(2026, 7, 14)

export const periodos: Record<Periodo, { indicadores: Indicadores; serie: PontoSerie[] }> = {
  '30d': {
    indicadores: indicadores(5120, 2940, 1030, 2180),
    serie: gerarSerie(3017, 15, (i) => ({ tipo: 'data', data: somarDias(inicio30d, i * 2) })),
  },
  '90d': {
    indicadores: indicadores(15380, 8910, 3090, 6420),
    serie: gerarSerie(9011, 13, (i) => ({ tipo: 'semana', n: i + 1 })),
  },
  '12m': {
    indicadores: indicadores(58900, 30400, 9870, 23800),
    serie: serie12m,
  },
}

export const ordemPeriodos: Periodo[] = ['30d', '90d', '12m']

export const serieReferencia = serie12m

export const empresaPainel = 'NimbusFlow Tecnologia'

const janela = (dia: number, de: number, ate: number): JanelaEstimada => ({ dia, de, ate })

type LinhaCobranca = [string, number, MotivoFalha, JanelaEstimada | null, StatusCobranca, number]

const linhas: LinhaCobranca[] = [
  ['Clínica Vale Verde', 99, 'saldo', janela(10, 8, 11), 'recuperada', 2],
  ['Odonto Serra Azul', 149, 'limite', janela(12, 9, 12), 'reagendada', 1],
  ['Instituto Pele Viva', 119, 'saldo', janela(6, 7, 10), 'recuperada', 1],
  ['Clínica Horizonte', 89, 'instituicao', janela(11, 10, 13), 'recuperada', 2],
  ['Fisio Movimento', 79, 'saldo', janela(15, 8, 11), 'controle', 2],
  ['Centro Médico Aurora', 249, 'revogada', null, 'naoRecuperada', 1],
  ['Clínica Bem-Estar Sul', 99, 'saldo', janela(13, 12, 15), 'tentativa', 3],
  ['Ortho Prime', 129, 'limite', janela(20, 9, 12), 'reagendada', 2],
  ['Clínica Santa Luzia', 99, 'saldo', janela(5, 8, 11), 'recuperada', 1],
  ['Espaço Nutri Leve', 79, 'saldo', janela(7, 18, 21), 'controle', 1],
  ['Clínica Ponte Alta', 119, 'instituicao', janela(11, 9, 12), 'recuperada', 1],
  ['Vita Dermatologia', 149, 'saldo', janela(25, 8, 11), 'reagendada', 2],
  ['Pediatria Pequeno Passo', 99, 'limite', janela(10, 13, 16), 'recuperada', 3],
  ['Clínica Mar Aberto', 89, 'saldo', janela(14, 8, 11), 'naoRecuperada', 3],
  ['Oftalmo Visão Clara', 129, 'saldo', janela(6, 9, 12), 'recuperada', 2],
  ['Clínica Jardim Norte', 99, 'revogada', null, 'controle', 1],
  ['Psico Equilíbrio', 79, 'saldo', janela(16, 19, 22), 'tentativa', 2],
  ['Clínica Três Rios', 119, 'limite', janela(21, 8, 11), 'reagendada', 1],
  ['Cardio Vale', 249, 'saldo', janela(5, 10, 13), 'recuperada', 1],
  ['Clínica Nova Esperança', 99, 'instituicao', janela(12, 8, 11), 'recuperada', 2],
  ['Studio Fisio Ativa', 89, 'saldo', janela(18, 7, 10), 'controle', 2],
  ['Clínica Alto da Serra', 129, 'saldo', janela(9, 9, 12), 'naoRecuperada', 3],
  ['Odonto Sorriso Leste', 149, 'limite', janela(22, 12, 15), 'reagendada', 1],
  ['Clínica Boa Vista', 99, 'saldo', janela(8, 8, 11), 'recuperada', 1],
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

// Sinal e ação sugerida de cada linha ficam em `conteudo.*.ts` → painel.retencao.casos[id].
export const riscosCancelamento: RiscoCancelamento[] = [
  { id: 'rc-1', assinante: 'Clínica Horizonte', plano: 'clinica', risco: 'alto' },
  { id: 'rc-2', assinante: 'Ortho Prime', plano: 'rede', risco: 'alto' },
  { id: 'rc-3', assinante: 'Vita Dermatologia', plano: 'clinica', risco: 'alto' },
  { id: 'rc-4', assinante: 'Espaço Nutri Leve', plano: 'essencial', risco: 'medio' },
  { id: 'rc-5', assinante: 'Clínica Três Rios', plano: 'clinica', risco: 'medio' },
  { id: 'rc-6', assinante: 'Psico Equilíbrio', plano: 'essencial', risco: 'medio' },
  { id: 'rc-7', assinante: 'Cardio Vale', plano: 'rede', risco: 'alto' },
  { id: 'rc-8', assinante: 'Clínica Boa Vista', plano: 'clinica', risco: 'medio' },
]
