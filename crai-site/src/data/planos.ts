import type { Plano } from '../lib/simulador'

export interface PlanoInfo {
  id: Plano
  nome: string
  taxa: string
  base: string
  resumo: string
  itens: string[]
  cta: string
}

export const standard: PlanoInfo = {
  id: 'standard',
  nome: 'Standard',
  taxa: '25%',
  base: 'sobre o ganho incremental',
  resumo: 'Recuperação de cobranças que falharam, cobrada só sobre o que ficou acima do grupo de controle.',
  itens: [
    'Recuperação de cobranças que falharam',
    'Inferência de liquidez e reagendamento',
    'Comunicação multicanal com o assinante',
    'Medição com grupo de controle',
    'Painel de resultado',
  ],
  cta: 'Começar com Standard',
}

export const premium: PlanoInfo = {
  id: 'premium',
  nome: 'Premium',
  taxa: '+ 20%',
  base: 'sobre a receita preservada',
  resumo: 'Tudo do Standard, mais retenção de quem sinaliza que vai sair.',
  itens: [
    'Sinais de risco de cancelamento',
    'Ação de retenção sem fricção no cancelamento',
    'Janela de apuração de 6 meses sobre a receita preservada',
    'Integração por SDK',
  ],
  cta: 'Começar com Premium',
}

export const planos = { standard, premium }
