import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Chaves públicas do projeto Supabase (vêm do .env.local). A publishable key é feita para ficar no
// navegador: quem protege os dados é o RLS do banco, não o segredo da chave.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const chavePublica = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

let cliente: SupabaseClient<Database> | null = null

/** true quando o .env.local tem URL e chave. Sem elas o site continua de pé; só o que usa o banco avisa. */
export const supabaseConfigurado = Boolean(url && chavePublica)

/** Cliente único, criado na primeira chamada. Lança erro se o .env.local não estiver configurado. */
export function getSupabase(): SupabaseClient<Database> {
  if (cliente) return cliente
  if (!url || !chavePublica) {
    throw new Error('Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env.local')
  }
  cliente = createClient<Database>(url, chavePublica, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  })
  return cliente
}
