import type { AuthError } from '@supabase/supabase-js'
import { getSupabase, supabaseConfigurado } from './supabase'

export type CodigoErroAuth = 'config' | 'credenciais' | 'nao_confirmado' | 'senha_fraca' | 'mesma_senha' | 'limite' | 'rede' | 'desconhecido'

export class ErroAuth extends Error {
  readonly codigo: CodigoErroAuth
  constructor(codigo: CodigoErroAuth, detalhe?: string) {
    super(detalhe ?? codigo)
    this.name = 'ErroAuth'
    this.codigo = codigo
  }
}

function traduzir(erro: AuthError): ErroAuth {
  const codigo = erro.code ?? ''
  if (erro.name === 'AuthRetryableFetchError' || erro.status === 0) return new ErroAuth('rede', erro.message)
  if (codigo === 'invalid_credentials') return new ErroAuth('credenciais')
  if (codigo === 'email_not_confirmed') return new ErroAuth('nao_confirmado')
  if (codigo === 'weak_password') return new ErroAuth('senha_fraca', erro.message)
  if (codigo === 'same_password') return new ErroAuth('mesma_senha')
  if (codigo.startsWith('over_') || erro.status === 429) return new ErroAuth('limite', erro.message)
  return new ErroAuth('desconhecido', erro.message)
}

export function codigoErroAuth(erro: unknown): CodigoErroAuth {
  if (erro instanceof ErroAuth) return erro.codigo
  if (erro instanceof TypeError) return 'rede'
  return 'desconhecido'
}

function exigirConfig() {
  if (!supabaseConfigurado) throw new ErroAuth('config')
  return getSupabase()
}

export async function entrar(email: string, senha: string): Promise<void> {
  const { error } = await exigirConfig().auth.signInWithPassword({ email: email.trim(), password: senha })
  if (error) throw traduzir(error)
}

/** Envia o link de nova senha. Não revela se o e-mail tem conta (o Supabase responde igual). */
export async function recuperarSenha(email: string): Promise<void> {
  const { error } = await exigirConfig().auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  })
  if (error) throw traduzir(error)
}

export async function redefinirSenha(senha: string): Promise<void> {
  const { error } = await exigirConfig().auth.updateUser({ password: senha })
  if (error) throw traduzir(error)
}
