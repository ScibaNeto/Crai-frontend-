import type { Session } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { COLUNAS_EMPRESA, type Empresa } from './empresa'
import { getSupabase, supabaseConfigurado } from './supabase'
import { SessaoContext, type Perfil, type SessaoValor } from './useSessao'

/** Lê perfil e empresa. Lança em erro de leitura (rede, RLS) para não confundir falha com "sem empresa". */
async function lerPerfilEEmpresa(usuarioId: string): Promise<{ perfil: Perfil | null; empresa: Empresa | null }> {
  const supabase = await getSupabase()
  const { data: perfil, error: erroPerfil } = await supabase
    .from('perfis')
    .select('id, nome_completo, email, cargo, empresa_ativa_id')
    .eq('id', usuarioId)
    .maybeSingle()
  if (erroPerfil) throw erroPerfil
  if (!perfil) return { perfil: null, empresa: null }

  let empresa: Empresa | null = null
  if (perfil.empresa_ativa_id) {
    const { data, error } = await supabase
      .from('empresas')
      .select(COLUNAS_EMPRESA)
      .eq('id', perfil.empresa_ativa_id)
      .maybeSingle()
    if (error) throw error
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
  // Leituras seguidas que falharam (0 = a última deu certo).
  const [falhas, setFalhas] = useState(0)

  const ultimoUsuario = useRef<string | null | undefined>(undefined)
  // Cada evento do auth dispara uma leitura assíncrona. Só a mais recente pode gravar o estado:
  // sem isto, uma leitura antiga que termina depois do "Sair" trazia a sessão encerrada de volta.
  const leituraAtual = useRef(0)

  const carregarDados = useCallback(async (s: Session | null) => {
    const minha = ++leituraAtual.current
    if (!s) {
      setSessao(null)
      setPerfil(null)
      setEmpresa(null)
      setFalhas(0)
      setCarregando(false)
      return
    }
    try {
      const dados = await lerPerfilEEmpresa(s.user.id)
      if (minha !== leituraAtual.current) return
      // Tudo junto, para ninguém ver a sessão nova com a empresa antiga (ou vazia).
      setSessao(s)
      setPerfil(dados.perfil)
      setEmpresa(dados.empresa)
      setFalhas(0)
    } catch (erro) {
      // Falha de leitura: mantém perfil/empresa que já estavam carregados para o mesmo usuário
      // (em vez de apagar a empresa e mandar quem já tem conta de volta ao cadastro).
      if (minha !== leituraAtual.current) return
      console.error('[CRAI] Falha ao ler perfil/empresa:', erro)
      setSessao(s)
      setFalhas((n) => n + 1)
    } finally {
      if (minha === leituraAtual.current) setCarregando(false)
    }
  }, [])

  // Leitura falhou: tenta de novo sozinha a cada 5 s. Até lá as páginas tratam como "carregando", não como "sem empresa".
  useEffect(() => {
    if (!falhas || !sessao) return
    const t = window.setTimeout(() => void carregarDados(sessao), 5000)
    return () => window.clearTimeout(t)
  }, [falhas, sessao, carregarDados])

  useEffect(() => {
    if (!supabaseConfigurado) return
    let ativo = true
    let cancelarAssinatura: (() => void) | undefined

    getSupabase()
      .then((supabase) => {
        if (!ativo) return
        // onAuthStateChange já dispara INITIAL_SESSION ao assinar. Chamar o Supabase dentro do callback
        // pode travar o cliente, então a leitura roda fora dele (setTimeout).
        const { data } = supabase.auth.onAuthStateChange((_evento, s) => {
          const id = s?.user.id ?? null
          if (id !== ultimoUsuario.current) {
            ultimoUsuario.current = id
            // Trocou de usuário (login/logout): limpa o que era do anterior e as páginas esperam os dados novos.
            setPerfil(null)
            setEmpresa(null)
            setCarregando(true)
          }
          window.setTimeout(() => {
            if (ativo) void carregarDados(s)
          }, 0)
        })
        cancelarAssinatura = () => data.subscription.unsubscribe()
      })
      .catch((erro: unknown) => {
        console.error('[CRAI] Não foi possível iniciar o Supabase:', erro)
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
      cancelarAssinatura?.()
    }
  }, [carregarDados])

  const recarregar = useCallback(async () => {
    if (!supabaseConfigurado) return
    const { data } = await (await getSupabase()).auth.getSession()
    await carregarDados(data.session)
  }, [carregarDados])

  const sair = useCallback(async () => {
    if (!supabaseConfigurado) return
    await (await getSupabase()).auth.signOut()
  }, [])

  const valor = useMemo<SessaoValor>(
    () => ({ carregando, sessao, perfil, empresa, falhaLeitura: falhas > 0 && !empresa, recarregar, sair }),
    [carregando, sessao, perfil, empresa, falhas, recarregar, sair],
  )

  return <SessaoContext.Provider value={valor}>{children}</SessaoContext.Provider>
}
