/**
 * Um Supabase de mentira para os testes do LOGIN REAL: a sessão, a renovação do token, o
 * "sair" e as três tabelas do cadastro que o painel lê (`empresas`, `membros_empresa`,
 * `perfis`). Nada aqui fala com a rede.
 *
 * Quem usa troca o módulo do site por este, ANTES dos imports:
 *
 *   vi.mock('../lib/supabase', () => import('./testes/supabaseFalso').then((m) => m.moduloFalso()))
 */
import { vi } from 'vitest'

const b64url = (texto: string): string => {
  const bytes = new TextEncoder().encode(texto)
  let binario = ''
  for (const b of bytes) binario += String.fromCharCode(b)
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Um JWT com as claims pedidas. A assinatura é de mentira: quem a confere é o backend. */
export function tokenFalso(claims: Record<string, unknown>): string {
  return `${b64url(JSON.stringify({ alg: 'ES256', typ: 'JWT' }))}.${b64url(JSON.stringify(claims))}.assinatura-de-mentira`
}

export const EMPRESA_ID = '3f2b8a6e-1c4d-4e5f-9a7b-0c1d2e3f4a5b'
export const USUARIO_ID = '9d8c7b6a-5e4f-4a3b-8c2d-1e0f9a8b7c6d'

export const claimsDeDono = (extra: Record<string, unknown> = {}) => ({
  aud: 'authenticated',
  sub: USUARIO_ID,
  empresa_id: EMPRESA_ID,
  tenant_id: EMPRESA_ID,
  papel: 'owner',
  plano: 'premium',
  ...extra,
})

type Linha = Record<string, unknown>

export interface EstadoFalso {
  /** O token da sessão aberta; `null` é "ninguém logado". */
  sessao: string | null
  /** O que `refreshSession` devolve; `null` é "a sessão acabou". */
  renovado: string | null
  /** Falha de rede ao ler a sessão. */
  semRede: boolean
  /** A renovação falha (rede, muitas chamadas), mas a sessão continua aberta. */
  falhaNaRenovacao: boolean
  /** `getSession` devolve um erro com este status (400: o token de renovação não vale mais). */
  statusDoErroDaSessao: number | null
  /** As leituras das tabelas respondem com erro (o login continua funcionando). */
  erroNasTabelas: boolean
  /** O banco responde à alteração com este código de erro (P0001, 42501; '' é falha de rede). */
  codigoDoErroNaAlteracao: string | null
  tabelas: { empresas: Linha[]; membros_empresa: Linha[]; perfis: Linha[] }
  /** O banco recusa a alteração (regra de acesso): nenhuma linha muda. */
  recusarAlteracao: boolean
  renovacoes: number
  saidas: number
  ouvintes: ((evento: string) => void)[]
}

// O estado mora em `globalThis`: os testes recarregam os módulos (`vi.resetModules`) e este
// arquivo é importado de novo; o teste e o módulo de mentira precisam enxergar o mesmo estado.
const CHAVE = '__crai_supabase_falso__'
const global = globalThis as unknown as Record<string, EstadoFalso | undefined>
export const estado: EstadoFalso = (global[CHAVE] ??= {
  sessao: null,
  renovado: null,
  semRede: false,
  falhaNaRenovacao: false,
  statusDoErroDaSessao: null,
  erroNasTabelas: false,
  codigoDoErroNaAlteracao: null,
  tabelas: { empresas: [], membros_empresa: [], perfis: [] },
  recusarAlteracao: false,
  renovacoes: 0,
  saidas: 0,
  ouvintes: [],
})

/** Volta ao começo: logado como dono de uma empresa premium, com duas pessoas na equipe. */
export function reiniciarSupabaseFalso(): void {
  estado.sessao = tokenFalso(claimsDeDono())
  estado.renovado = tokenFalso(claimsDeDono())
  estado.semRede = false
  estado.falhaNaRenovacao = false
  estado.statusDoErroDaSessao = null
  estado.erroNasTabelas = false
  estado.codigoDoErroNaAlteracao = null
  estado.recusarAlteracao = false
  estado.renovacoes = 0
  estado.saidas = 0
  estado.ouvintes = []
  estado.tabelas = {
    empresas: [
      { id: EMPRESA_ID, razao_social: 'Aurora Sistemas Ltda', nome_fantasia: 'Aurora Sistemas', cnpj: '12345678000195', created_at: '2026-09-24T12:00:00Z' },
      { id: 'outra-empresa', razao_social: 'Empresa de Outro Cliente', nome_fantasia: null, cnpj: '99999999000199', created_at: '2026-01-01T12:00:00Z' },
    ],
    membros_empresa: [
      { empresa_id: EMPRESA_ID, usuario_id: USUARIO_ID, papel: 'owner', created_at: '2026-09-24T12:00:00Z' },
      { empresa_id: EMPRESA_ID, usuario_id: 'colega', papel: 'membro', created_at: '2026-09-28T12:00:00Z' },
      { empresa_id: 'outra-empresa', usuario_id: 'estranho', papel: 'owner', created_at: '2026-01-01T12:00:00Z' },
    ],
    perfis: [
      { id: USUARIO_ID, nome_completo: 'Marina Duarte', email: 'marina@aurora.com.br' },
      { id: 'colega', nome_completo: 'Rafael Costa', email: 'rafael@aurora.com.br' },
      { id: 'estranho', nome_completo: 'Pessoa de Outra Empresa', email: 'x@outra.com.br' },
    ],
  }
}

/** Uma consulta encadeável (`select().eq().in().order()`), que resolve em `{ data, error }`. */
function consulta(tabela: keyof EstadoFalso['tabelas']) {
  let linhas = estado.tabelas[tabela]
  let alteracao: Linha | null = null
  let filtros: ((l: Linha) => boolean)[] = []
  const resultado = () => {
    if (estado.semRede || estado.erroNasTabelas) return { data: null, error: { message: 'sem rede' } }
    const escolhidas = linhas.filter((l) => filtros.every((f) => f(l)))
    if (alteracao) {
      if (estado.codigoDoErroNaAlteracao !== null) return { data: null, error: { message: 'erro do banco', code: estado.codigoDoErroNaAlteracao } }
      if (estado.recusarAlteracao) return { data: [], error: null }
      for (const l of escolhidas) Object.assign(l, alteracao)
    }
    return { data: escolhidas, error: null }
  }
  const q = {
    select: () => q,
    update: (novo: Linha) => {
      alteracao = novo
      return q
    },
    eq: (coluna: string, valor: unknown) => {
      filtros = [...filtros, (l) => l[coluna] === valor]
      return q
    },
    in: (coluna: string, valores: unknown[]) => {
      filtros = [...filtros, (l) => valores.includes(l[coluna])]
      return q
    },
    order: (coluna: string) => {
      linhas = [...linhas].sort((a, b) => String(a[coluna]).localeCompare(String(b[coluna])))
      return q
    },
    maybeSingle: async () => {
      const r = resultado()
      return { data: r.data ? (r.data[0] ?? null) : null, error: r.error }
    },
    then: (resolver: (r: { data: Linha[] | null; error: { message: string; code?: string } | null }) => unknown) => Promise.resolve(resultado()).then(resolver),
  }
  return q
}

const clienteFalso = {
  auth: {
    getSession: vi.fn(async () => {
      if (estado.semRede) return { data: { session: null }, error: { message: 'sem rede' } }
      if (estado.statusDoErroDaSessao !== null) return { data: { session: null }, error: { message: 'sessão inválida', status: estado.statusDoErroDaSessao } }
      return { data: { session: estado.sessao ? { access_token: estado.sessao } : null }, error: null }
    }),
    refreshSession: vi.fn(async () => {
      estado.renovacoes += 1
      if (estado.falhaNaRenovacao) return { data: { session: null }, error: { message: 'muitas chamadas', status: 429 } }
      if (!estado.renovado) {
        // Como o Supabase de verdade: a sessão é apagada e o aviso de "saiu" dispara ANTES
        // de a renovação devolver o erro.
        estado.sessao = null
        for (const avisar of estado.ouvintes) avisar('SIGNED_OUT')
        return { data: { session: null }, error: { message: 'sessão encerrada', status: 400 } }
      }
      estado.sessao = estado.renovado
      return { data: { session: { access_token: estado.renovado } }, error: null }
    }),
    signOut: vi.fn(async () => {
      estado.saidas += 1
      estado.sessao = null
      for (const avisar of estado.ouvintes) avisar('SIGNED_OUT')
      return { error: null }
    }),
    onAuthStateChange: vi.fn((avisar: (evento: string) => void) => {
      estado.ouvintes.push(avisar)
      return { data: { subscription: { unsubscribe: () => { estado.ouvintes = estado.ouvintes.filter((o) => o !== avisar) } } } }
    }),
  },
  from: (tabela: string) => consulta(tabela as keyof EstadoFalso['tabelas']),
}

/** O que entra no lugar de `src/lib/supabase.ts`. */
export function moduloFalso() {
  return { supabaseConfigurado: true, getSupabase: async () => clienteFalso }
}
