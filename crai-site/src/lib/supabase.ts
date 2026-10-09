import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Chaves públicas do projeto Supabase (vêm do .env.local). A publishable key é feita para ficar no
// navegador: quem protege os dados é o RLS do banco, não o segredo da chave.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const chavePublica = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

let cliente: Promise<SupabaseClient<Database>> | null = null

/** true quando o .env.local tem URL e chave. Sem elas o site continua de pé; só o que usa o banco avisa. */
export const supabaseConfigurado = Boolean(url && chavePublica)

/**
 * Cliente único, criado na primeira chamada. A biblioteca (~215 kB) é carregada sob demanda, num
 * chunk separado: assim ela não atrasa a primeira pintura de nenhuma página.
 * Rejeita se o .env.local não estiver configurado.
 */
export function getSupabase(): Promise<SupabaseClient<Database>> {
  if (!url || !chavePublica) {
    return Promise.reject(
      new Error('Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env.local'),
    )
  }
  cliente ??= import('@supabase/supabase-js')
    .then(({ createClient }) =>
      createClient<Database>(url, chavePublica, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      }),
    )
    .catch((erro: unknown) => {
      // Falha ao baixar o chunk (rede): permite tentar de novo na próxima chamada.
      cliente = null
      throw erro
    })
  return cliente
}

/**
 * true se o navegador guarda uma sessão do Supabase (chave `sb-<projeto>-auth-token`). Serve para o cabeçalho
 * não mostrar "Entrar / Criar conta" a quem provavelmente está logado enquanto a sessão ainda é conferida.
 * Só olha o nome da chave; não lê o token.
 */
export function temSessaoGuardada(): boolean {
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const chave = window.localStorage.key(i)
      if (chave?.startsWith('sb-') && chave.endsWith('-auth-token')) return true
    }
  } catch {
    // localStorage bloqueado: trata como visitante.
  }
  return false
}
