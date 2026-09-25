import type { Session } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { COLUNAS_EMPRESA, type Empresa } from './empresa'
import { getSupabase, supabaseConfigurado } from './supabase'
import { SessaoContext, type Perfil, type SessaoValor } from './useSessao'

async function lerPerfilEEmpresa(usuarioId: string): Promise<{ perfil: Perfil | null; empresa: Empresa | null }> {
  const supabase = getSupabase()
  const { data: perfil } = await supabase
    .from('perfis')
    .select('id, nome_completo, email, cargo, empresa_ativa_id')
    .eq('id', usuarioId)
    .maybeSingle()
  if (!perfil) return { perfil: null, empresa: null }

  let empresa: Empresa | null = null
  if (perfil.empresa_ativa_id) {
    const { data } = await supabase.from('empresas').select(COLUNAS_EMPRESA).eq('id', perfil.empresa_ativa_id).maybeSingle()
    empresa = data
  }
  const { empresa_ativa_id: _ignorado, ...resto } = perfil
  return { perfil: resto, empresa }
}

/** Sessão do Supabase Auth + perfil e empresa do usuário logado, disponíveis para o site inteiro. */
export function SessaoProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(supabaseConfigurado)
  const [sessao, setSessao] = useState<Session | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [empresa, setEmpresa] = useState<Empresa | null>(null)

  const ultimoUsuario = useRef<string | null | undefined>(undefined)

  const carregarDados = useCallback(async (s: Session | null) => {
    if (!s) {
      setSessao(null)
      setPerfil(null)
      setEmpresa(null)
      setCarregando(false)
      return
    }
    try {
      const dados = await lerPerfilEEmpresa(s.user.id)
      // Tudo junto, para ninguém ver a sessão nova com a empresa antiga (ou vazia).
      setSessao(s)
      setPerfil(dados.perfil)
      setEmpresa(dados.empresa)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    if (!supabaseConfigurado) return
    const supabase = getSupabase()
    let ativo = true
    // onAuthStateChange já dispara INITIAL_SESSION ao assinar. Chamar o Supabase dentro do callback
    // pode travar o cliente, então a leitura roda fora dele (setTimeout).
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => {
      const id = s?.user.id ?? null
      if (id !== ultimoUsuario.current) {
        ultimoUsuario.current = id
        // Trocou de usuário (login/logout): as páginas esperam os dados novos antes de decidir algo.
        setCarregando(true)
      }
      window.setTimeout(() => {
        if (ativo) void carregarDados(s)
      }, 0)
    })
    return () => {
      ativo = false
      data.subscription.unsubscribe()
    }
  }, [carregarDados])

  const recarregar = useCallback(async () => {
    if (!supabaseConfigurado) return
    const { data } = await getSupabase().auth.getSession()
    await carregarDados(data.session)
  }, [carregarDados])

  const sair = useCallback(async () => {
    if (!supabaseConfigurado) return
    await getSupabase().auth.signOut()
  }, [])

  const valor = useMemo<SessaoValor>(
    () => ({ carregando, sessao, perfil, empresa, recarregar, sair }),
    [carregando, sessao, perfil, empresa, recarregar, sair],
  )

  return <SessaoContext.Provider value={valor}>{children}</SessaoContext.Provider>
}
