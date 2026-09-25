import type { AuthError, PostgrestError } from '@supabase/supabase-js'
import type { Database } from './database.types'
import { normalizarCNPJ } from './cnpj'
import { somenteDigitos } from './format'
import { getSupabase, supabaseConfigurado } from './supabase'

type FaixaMrr = Database['public']['Enums']['faixa_mrr']
type PlanoCrai = Database['public']['Enums']['plano_crai']

/** Mesma ordem de `conteudo.*.cadastro.empresa.faixas` — o índice da opção escolhida vira o valor do banco. */
export const FAIXAS_MRR: readonly FaixaMrr[] = ['ate_25k', '25k_75k', '75k_200k', '200k_500k', 'acima_500k']

/** Mesma ordem de `conteudo.*.cadastro.empresa.segmentos` — salvo como código, independente do idioma. */
export const SEGMENTOS = ['gestao_clinicas', 'gestao_financeira', 'educacional', 'varejo', 'outro'] as const

export interface DadosCadastro {
  responsavel: { nome: string; email: string; senha: string; cargo: string; telefone: string }
  empresa: {
    razaoSocial: string
    nomeFantasia: string
    cnpj: string
    site: string
    segmento: string
    faixaMrr: FaixaMrr | null
    assinantes: string
  }
  operacao: { plano: PlanoCrai; inicio: string; aceitouTermos: boolean; aceitouComunicacao: boolean }
}

/**
 * O que ainda falta gravar depois do signUp. Vai no user_metadata porque, com confirmação de e-mail
 * ligada, o signUp não devolve sessão — e sem sessão o RLS não deixa gravar perfil nem empresa.
 * Assim que houver sessão (na hora ou ao voltar pelo link do e-mail), `concluirCadastroPendente` grava.
 */
interface CadastroPendente {
  perfil: {
    cargo: string | null
    telefone: string | null
    aceite_termos_em: string
    aceite_comunicacao_em: string | null
  }
  empresa: {
    razao_social: string
    cnpj: string
    nome_fantasia: string | null
    site: string | null
    segmento: string | null
    faixa_mrr: FaixaMrr | null
    qtd_clientes_ativos: number | null
    plano: PlanoCrai
    inicio_previsto: string | null
  }
}

export type CodigoErroCadastro =
  | 'config'
  | 'email_existente'
  | 'cnpj_existente'
  | 'cnpj_invalido'
  | 'senha_fraca'
  | 'email_invalido'
  | 'limite'
  | 'rede'
  | 'desconhecido'

export class ErroCadastro extends Error {
  readonly codigo: CodigoErroCadastro
  constructor(codigo: CodigoErroCadastro, detalhe?: string) {
    super(detalhe ?? codigo)
    this.name = 'ErroCadastro'
    this.codigo = codigo
  }
}

export type ResultadoCadastro = { status: 'pronto' } | { status: 'confirmar_email'; email: string }

function telefoneE164(valor: string): string | null {
  const d = somenteDigitos(valor)
  if (!d) return null
  return d.length === 10 || d.length === 11 ? `+55${d}` : `+${d}`
}

function vazioParaNulo(valor: string): string | null {
  const v = valor.trim()
  return v ? v : null
}

function montarPendente(d: DadosCadastro): CadastroPendente {
  const agora = new Date().toISOString()
  const assinantes = somenteDigitos(d.empresa.assinantes)
  return {
    perfil: {
      cargo: vazioParaNulo(d.responsavel.cargo),
      telefone: telefoneE164(d.responsavel.telefone),
      aceite_termos_em: agora,
      aceite_comunicacao_em: d.operacao.aceitouComunicacao ? agora : null,
    },
    empresa: {
      razao_social: d.empresa.razaoSocial.trim(),
      cnpj: normalizarCNPJ(d.empresa.cnpj),
      nome_fantasia: vazioParaNulo(d.empresa.nomeFantasia),
      site: vazioParaNulo(d.empresa.site),
      segmento: vazioParaNulo(d.empresa.segmento),
      faixa_mrr: d.empresa.faixaMrr,
      qtd_clientes_ativos: assinantes ? Number(assinantes) : null,
      plano: d.operacao.plano,
      inicio_previsto: d.operacao.inicio || null,
    },
  }
}

function erroDeAuth(erro: AuthError): ErroCadastro {
  const codigo = erro.code ?? ''
  if (erro.name === 'AuthRetryableFetchError' || erro.status === 0) return new ErroCadastro('rede', erro.message)
  if (codigo === 'user_already_exists' || codigo === 'email_exists') return new ErroCadastro('email_existente')
  if (codigo === 'weak_password') return new ErroCadastro('senha_fraca', erro.message)
  if (codigo === 'email_address_invalid' || codigo === 'email_address_not_authorized') return new ErroCadastro('email_invalido')
  if (codigo.startsWith('over_') || erro.status === 429) return new ErroCadastro('limite', erro.message)
  return new ErroCadastro('desconhecido', erro.message)
}

function erroDeBanco(erro: PostgrestError): ErroCadastro {
  if (erro.code === '23505') return new ErroCadastro('cnpj_existente')
  if (erro.code === '22023' || erro.code === '23514') return new ErroCadastro('cnpj_invalido')
  return new ErroCadastro('desconhecido', erro.message)
}

/** Cria a conta no Supabase Auth e, se já houver sessão, grava perfil e empresa na sequência. */
export async function cadastrar(d: DadosCadastro): Promise<ResultadoCadastro> {
  if (!supabaseConfigurado) throw new ErroCadastro('config')
  const supabase = getSupabase()
  const email = d.responsavel.email.trim()

  const { data, error } = await supabase.auth.signUp({
    email,
    password: d.responsavel.senha,
    options: {
      // O link do e-mail de confirmação volta para o cadastro, que conclui o que ficou pendente.
      emailRedirectTo: `${window.location.origin}/cadastro`,
      data: { nome_completo: d.responsavel.nome.trim(), cadastro_pendente: montarPendente(d) },
    },
  })
  if (error) throw erroDeAuth(error)

  // Com confirmação de e-mail ligada, e-mail já cadastrado volta como usuário sem identities.
  if (data.user && data.user.identities?.length === 0) throw new ErroCadastro('email_existente')

  if (!data.session) return { status: 'confirmar_email', email }

  await concluirCadastroPendente()
  return { status: 'pronto' }
}

/** true se o usuário logado ainda tem perfil/empresa por gravar. */
export async function temCadastroPendente(): Promise<boolean> {
  if (!supabaseConfigurado) return false
  const { data } = await getSupabase().auth.getSession()
  return Boolean(data.session?.user.user_metadata?.cadastro_pendente)
}

let emAndamento: Promise<boolean> | null = null

/**
 * Grava perfil e empresa guardados no signUp. Idempotente: se a empresa já foi criada numa
 * tentativa anterior, só limpa a pendência. Devolve true se havia algo pendente.
 */
export function concluirCadastroPendente(): Promise<boolean> {
  emAndamento ??= executarPendente().finally(() => {
    emAndamento = null
  })
  return emAndamento
}

async function executarPendente(): Promise<boolean> {
  const supabase = getSupabase()
  const { data: sessao } = await supabase.auth.getSession()
  const usuario = sessao.session?.user
  const pendente = usuario?.user_metadata?.cadastro_pendente as CadastroPendente | undefined
  if (!usuario || !pendente) return false

  const { perfil, empresa } = pendente

  const { data: perfilAtual, error: erroLeitura } = await supabase
    .from('perfis')
    .select('empresa_ativa_id')
    .eq('id', usuario.id)
    .single()
  if (erroLeitura) throw erroDeBanco(erroLeitura)

  const { error: erroPerfil } = await supabase
    .from('perfis')
    .update({
      cargo: perfil.cargo,
      telefone: perfil.telefone,
      aceite_termos_em: perfil.aceite_termos_em,
      aceite_privacidade_em: perfil.aceite_termos_em,
      aceite_comunicacao_em: perfil.aceite_comunicacao_em,
    })
    .eq('id', usuario.id)
  if (erroPerfil) throw erroDeBanco(erroPerfil)

  if (!perfilAtual.empresa_ativa_id) {
    const { error: erroEmpresa } = await supabase.rpc('criar_empresa', {
      p_razao_social: empresa.razao_social,
      p_cnpj: empresa.cnpj,
      p_nome_fantasia: empresa.nome_fantasia ?? undefined,
      p_site: empresa.site ?? undefined,
      p_segmento: empresa.segmento ?? undefined,
      p_faixa_mrr: empresa.faixa_mrr ?? undefined,
      p_qtd_clientes_ativos: empresa.qtd_clientes_ativos ?? undefined,
      p_plano: empresa.plano,
      p_inicio_previsto: empresa.inicio_previsto ?? undefined,
    })
    if (erroEmpresa) throw erroDeBanco(erroEmpresa)
  }

  await supabase.auth.updateUser({ data: { cadastro_pendente: null } })
  // Novo token já sai com empresa_id e papel (Custom Access Token Hook).
  await supabase.auth.refreshSession()
  return true
}

/**
 * Usuário já tem conta e sessão, mas a empresa não foi gravada (ex.: CNPJ recusado depois do signUp).
 * Regrava a pendência com os dados corrigidos do formulário e tenta concluir de novo.
 */
export async function concluirComDados(d: DadosCadastro): Promise<ResultadoCadastro> {
  const supabase = getSupabase()
  const { error } = await supabase.auth.updateUser({ data: { cadastro_pendente: montarPendente(d) } })
  if (error) throw erroDeAuth(error)
  await concluirCadastroPendente()
  return { status: 'pronto' }
}

export function codigoDoErro(erro: unknown): CodigoErroCadastro {
  if (erro instanceof ErroCadastro) return erro.codigo
  if (erro instanceof TypeError) return 'rede'
  return 'desconhecido'
}
