import type { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'
import type { Empresa } from './empresa'

export interface Perfil {
  id: string
  nome_completo: string
  email: string | null
  cargo: string | null
}

export interface SessaoValor {
  /** true até a primeira leitura da sessão (e da empresa, se houver login). */
  carregando: boolean
  sessao: Session | null
  perfil: Perfil | null
  empresa: Empresa | null
  /** Relê perfil e empresa (ex.: logo depois de concluir o cadastro). */
  recarregar: () => Promise<void>
  sair: () => Promise<void>
}

export const SessaoContext = createContext<SessaoValor | null>(null)

export function useSessao() {
  const ctx = useContext(SessaoContext)
  if (!ctx) throw new Error('useSessao precisa de <SessaoProvider> acima na árvore.')
  return ctx
}
