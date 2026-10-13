/**
 * O LOGIN DE VERDADE do painel: a sessão do Supabase que o site da CRAI abriu.
 *
 * O painel mora no mesmo endereço do site (`/app`), então enxerga a mesma sessão que o
 * `/entrar` gravou. Ele não tem tela de login própria: sem sessão, manda a pessoa ao
 * `/entrar` do site e volta para cá depois.
 *
 * - Vale quando o site tem `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`. Sem elas,
 *   o painel continua com o login de desenvolvimento (`http.ts`), que só existe com o
 *   backend em modo de desenvolvimento.
 * - O token é o `access_token` da sessão. Quem o guarda e renova é o cliente do Supabase;
 *   este módulo não grava token em lugar nenhum.
 * - O backend lê do token a empresa (`tenant_id`), o papel e o plano. Quem os põe lá é a
 *   função `custom_access_token_hook` do projeto Supabase. O que a tela mostra de papel e
 *   de plano sai do mesmo token, para a tela nunca prometer o que o backend vai recusar.
 * - Nada do token nem dos dados lidos vai para o console.
 */
import { getSupabase, supabaseConfigurado } from '../../lib/supabase'
import { ErroApi } from './erros'
import type { Papel } from './tipos'
import { t } from '../lib/idioma'

/** Com as duas variáveis do Supabase, o painel usa a sessão do site. */
export const LOGIN_REAL = supabaseConfigurado

export type PlanoDoToken = 'essencial' | 'premium'

/**
 * A assinatura, como o hook do Supabase a grava no token (claim `assinatura`):
 * - `dispensada`: a chave `assinatura_obrigatoria` está desligada (como até o lançamento, no
 *   início de 2027): basta o login e a empresa;
 * - `ativa`: a chave está ligada e a empresa tem a assinatura ativa;
 * - `pendente`: a chave está ligada e a empresa ainda não assinou. O painel não abre: a pessoa é
 *   levada à página de pagamento do site.
 * Token sem a claim (emitido antes de 10/10/2026) vale `dispensada`.
 */
export type AssinaturaDoToken = 'dispensada' | 'ativa' | 'pendente'

/** O que o painel lê do token (os mesmos campos que o backend lê). */
export interface ContaDoToken {
  /** O identificador da empresa, igual ao `empresa_id` do Supabase. */
  empresaId: string
  /** O identificador do usuário (`sub`). */
  usuarioId: string | null
  /** Sem papel no token, o backend só deixa ler: a tela trata como membro. */
  papel: Papel
  plano: PlanoDoToken
  assinatura: AssinaturaDoToken
}

const PAPEIS: readonly Papel[] = ['owner', 'admin', 'membro']

function decodificarBase64Url(texto: string): string {
  const base64 = texto.replace(/-/g, '+').replace(/_/g, '/')
  const completo = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binario = atob(completo)
  const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

/**
 * Os campos do token que interessam à tela. Devolve `null` se o token não tem empresa (conta
 * sem empresa, ou token emitido antes de a empresa existir) ou não é um JWT legível.
 * A assinatura NÃO é conferida aqui: quem confere é o backend, a cada chamada.
 */
export function contaDoToken(token: string): ContaDoToken | null {
  const partes = token.split('.')
  if (partes.length !== 3) return null
  let claims: Record<string, unknown>
  try {
    claims = JSON.parse(decodificarBase64Url(partes[1])) as Record<string, unknown>
  } catch {
    return null
  }
  const empresaId = claims.tenant_id
  if (typeof empresaId !== 'string' || !empresaId.trim()) return null
  const papel = claims.papel
  return {
    empresaId,
    usuarioId: typeof claims.sub === 'string' ? claims.sub : null,
    papel: typeof papel === 'string' && (PAPEIS as readonly string[]).includes(papel) ? (papel as Papel) : 'membro',
    plano: claims.plano === 'premium' ? 'premium' : 'essencial',
    assinatura: claims.assinatura === 'pendente' || claims.assinatura === 'ativa' ? claims.assinatura : 'dispensada',
  }
}

/** Para onde o painel manda quem não tem sessão: o login do site, com a volta para a página pedida. */
export function enderecoDeLogin(): string {
  const aqui = `${window.location.pathname}${window.location.search}`
  return `/entrar?proximo=${encodeURIComponent(aqui)}`
}

/** Quem tem sessão mas não tem empresa termina o cadastro no site. */
export const ENDERECO_DE_CADASTRO = '/cadastro'
/** Quem tem empresa mas não tem a assinatura ativa (com a assinatura obrigatória) assina no site. */
export const ENDERECO_DE_PAGAMENTO = '/pagamento'
/** Depois de sair, a pessoa volta ao site. */
export const ENDERECO_DO_SITE = '/'

let saindo = false
/** A pessoa clicou em "Sair da conta" nesta aba (e não: a sessão venceu, ou ela saiu em outra aba). */
let saidaPedida = false
let navegar = (endereco: string): void => window.location.assign(endereco)
/** Sai do painel para outra página do site (documento novo, não rota do painel). Uma vez só. */
export function irPara(endereco: string): void {
  if (saindo) return
  saindo = true
  navegar(endereco)
}

/** Volta ao site (a sessão acabou, ou a pessoa saiu). */
export function voltarAoSite(): void {
  irPara(ENDERECO_DO_SITE)
}

/**
 * Só para os testes: desfaz o "já estou saindo" e, se pedido, troca a navegação por uma
 * função que só anota o endereço (o jsdom não navega para outro documento).
 */
export function reiniciarSaidaParaTeste(navegacao?: (endereco: string) => void): void {
  saindo = false
  saidaPedida = false
  renovacao = null
  if (navegacao) navegar = navegacao
}

const SEM_SESSAO = t('Entre na sua conta para abrir o painel.')
const SEM_EMPRESA = t('A sua conta ainda não tem uma empresa. Termine o cadastro no site para abrir o painel.')
const SEM_ASSINATURA = t('A sua empresa ainda não tem a assinatura ativa. Conclua a assinatura no site para abrir o painel.')
const SEM_SERVICO = t('Não foi possível falar com o serviço de login. Confira a conexão e tente de novo.')
const TOKEN_SEM_EMPRESA =
  t('A sua conta tem uma empresa, mas o login não a informou ao painel. Saia da conta no site e entre de novo. Se continuar, fale com a CRAI.')

async function cliente() {
  try {
    return await getSupabase()
  } catch {
    throw new ErroApi('rede', SEM_SERVICO)
  }
}

/**
 * O erro diz que a sessão ACABOU (e não que a rede falhou)? O Supabase responde 400, 401 ou
 * 403 quando o token de renovação não vale mais. Falha de rede vem sem status (ou com 0).
 */
function sessaoAcabou(erro: unknown): boolean {
  const e = erro as { status?: unknown; name?: unknown } | null
  if (e?.name === 'AuthSessionMissingError') return true
  return typeof e?.status === 'number' && [400, 401, 403].includes(e.status)
}

let renovacao: Promise<string | null> | null = null

/**
 * Pede um token novo ao Supabase (o papel, o plano e a empresa são relidos do banco).
 * - Devolve `null` só quando a sessão ACABOU de verdade.
 * - Se a renovação falhou mas a sessão continua aberta (rede caiu, muitas chamadas), lança
 *   `rede`: a pessoa fica onde está e tenta de novo, em vez de ir e voltar do login.
 * - Pedidos simultâneos dividem UMA renovação. E quem chega com um token recusado que já
 *   foi trocado por outro pedido recebe o novo, sem renovar de novo.
 */
async function renovar(recusado?: string): Promise<string | null> {
  const supabase = await cliente()
  if (recusado) {
    const { data } = await supabase.auth.getSession()
    const atual = data.session?.access_token
    if (atual && atual !== recusado && contaDoToken(atual)) return atual
  }
  if (!renovacao) {
    const pedido = (async (): Promise<string | null> => {
      const { data, error } = await supabase.auth.refreshSession()
      if (!error && data.session) return data.session.access_token
      const depois = await supabase.auth.getSession()
      if (depois.error ? !sessaoAcabou(depois.error) : depois.data.session) throw new ErroApi('rede', SEM_SERVICO)
      return null
    })()
    renovacao = pedido
    pedido
      .catch(() => undefined)
      .finally(() => {
        if (renovacao === pedido) renovacao = null
      })
  }
  return renovacao
}

/**
 * O token não traz a empresa mesmo depois de renovado. Se o cadastro diz que a pessoa TEM
 * empresa, o problema é do login (a função que põe a empresa no token não rodou): mandá-la
 * ao cadastro só a faria andar em círculo. Devolve `true` nesse caso.
 */
async function cadastroTemEmpresa(token: string): Promise<boolean> {
  let usuarioId: unknown
  try {
    usuarioId = (JSON.parse(decodificarBase64Url(token.split('.')[1] ?? '')) as Record<string, unknown>).sub
  } catch {
    return false
  }
  if (typeof usuarioId !== 'string' || !usuarioId) return false
  try {
    const supabase = await cliente()
    const { data, error } = await supabase.from('perfis').select('empresa_ativa_id').eq('id', usuarioId).maybeSingle()
    return !error && Boolean(data?.empresa_ativa_id)
  } catch {
    return false
  }
}

/**
 * O token da sessão, pronto para ir ao backend.
 * - Sem sessão: manda ao login do site e lança `nao_autorizado`.
 * - Sessão cujo token não traz a empresa: renova uma vez (o token pode ser de antes de a
 *   empresa existir). Se continuar sem empresa, manda ao cadastro e lança `sem_permissao`;
 *   a não ser que o cadastro já tenha a empresa: aí é falha do login, e a pessoa fica aqui.
 */
export async function tokenDaSessao(): Promise<string> {
  const supabase = await cliente()
  const { data, error } = await supabase.auth.getSession()
  if (error && !sessaoAcabou(error)) throw new ErroApi('rede', SEM_SERVICO)
  let token = error ? null : (data.session?.access_token ?? null)
  if (!token) {
    irPara(enderecoDeLogin())
    throw new ErroApi('nao_autorizado', SEM_SESSAO, 401)
  }
  if (!contaDoToken(token)) {
    token = await renovar()
    if (!token) {
      irPara(enderecoDeLogin())
      throw new ErroApi('nao_autorizado', SEM_SESSAO, 401)
    }
    if (!contaDoToken(token)) {
      if (await cadastroTemEmpresa(token)) throw new ErroApi('servidor', TOKEN_SEM_EMPRESA, 503, 'token_sem_empresa')
      irPara(ENDERECO_DE_CADASTRO)
      throw new ErroApi('sem_permissao', SEM_EMPRESA, 403, 'sem_empresa')
    }
  }
  if (contaDoToken(token)?.assinatura === 'pendente') {
    // O token pode ser de antes da assinatura: renova uma vez antes de mandar ao pagamento.
    const novo = await renovar(token)
    if (!novo) {
      irPara(enderecoDeLogin())
      throw new ErroApi('nao_autorizado', SEM_SESSAO, 401)
    }
    token = novo
    if (contaDoToken(token)?.assinatura === 'pendente') {
      irPara(ENDERECO_DE_PAGAMENTO)
      throw new ErroApi('sem_permissao', SEM_ASSINATURA, 403, 'assinatura_pendente')
    }
  }
  return token
}

/**
 * O backend recusou o token (401): pede outro ao Supabase. Devolve `null` quando a sessão
 * acabou de vez; nesse caso a pessoa já foi mandada ao login. Se a renovação falhou com a
 * sessão ainda aberta, lança `rede` (ninguém é mandado a lugar nenhum).
 */
export async function renovarTokenDaSessao(recusado?: string): Promise<string | null> {
  const token = await renovar(recusado)
  if (!token) {
    irPara(enderecoDeLogin())
    return null
  }
  return token
}

/** A conta da sessão aberta: empresa, papel e plano, como estão no token. */
export async function contaDaSessao(): Promise<ContaDoToken> {
  const conta = contaDoToken(await tokenDaSessao())
  // `tokenDaSessao` só devolve token com empresa; isto é só para o tipo.
  if (!conta) throw new ErroApi('sem_permissao', SEM_EMPRESA, 403, 'sem_empresa')
  return conta
}

/** Encerra a sessão (no painel e no site, que usam a mesma) e volta ao site. */
export async function sair(): Promise<void> {
  saidaPedida = true
  try {
    const supabase = await cliente()
    await supabase.auth.signOut()
  } finally {
    irPara(ENDERECO_DO_SITE)
  }
}

/**
 * Avisa quando a sessão termina. `porEscolha` é `true` quando a pessoa clicou em "Sair da
 * conta" nesta aba; `false` quando a sessão venceu ou ela saiu pelo site em outra aba.
 * Devolve a função que cancela o aviso.
 */
export async function aoEncerrarSessao(avisar: (porEscolha: boolean) => void): Promise<() => void> {
  const supabase = await cliente()
  const { data } = supabase.auth.onAuthStateChange((evento) => {
    if (evento === 'SIGNED_OUT') avisar(saidaPedida)
  })
  return () => data.subscription.unsubscribe()
}

/**
 * A sessão terminou: quem saiu por escolha volta ao site; quem perdeu a sessão vai ao login,
 * com a volta para a página em que estava.
 */
export function sairDoPainel(porEscolha: boolean): void {
  irPara(porEscolha ? ENDERECO_DO_SITE : enderecoDeLogin())
}

/* ------------------------------------------------------------------ */
/* O que o painel lê direto do Supabase (cadastro do site)             */
/* ------------------------------------------------------------------ */

function falhaDeLeitura(): ErroApi {
  return new ErroApi('servidor', t('Não foi possível ler o cadastro da sua empresa. Tente de novo em instantes.'))
}

export interface EmpresaDoCadastro {
  nome: string
  cnpj: string
  criadaEm: string
}

/** A empresa da sessão, como está no cadastro do site. Quem protege a leitura é o RLS do banco. */
export async function empresaDoCadastro(empresaId: string): Promise<EmpresaDoCadastro> {
  const supabase = await cliente()
  const { data, error } = await supabase
    .from('empresas')
    .select('razao_social, nome_fantasia, cnpj, created_at')
    .eq('id', empresaId)
    .maybeSingle()
  if (error) throw falhaDeLeitura()
  if (!data) throw new ErroApi('nao_encontrado', t('Não encontramos o cadastro da sua empresa.'), 404)
  return { nome: data.nome_fantasia || data.razao_social, cnpj: data.cnpj, criadaEm: data.created_at }
}

export interface MembroDoCadastro {
  usuarioId: string
  nome: string
  email: string | null
  papel: Papel
  desde: string
}

/** Quem pertence à empresa da sessão, com o papel de cada um. */
export async function membrosDoCadastro(empresaId: string): Promise<MembroDoCadastro[]> {
  const supabase = await cliente()
  const { data: vinculos, error } = await supabase
    .from('membros_empresa')
    .select('usuario_id, papel, created_at')
    .eq('empresa_id', empresaId)
    .order('created_at', { ascending: true })
  if (error) throw falhaDeLeitura()
  const ids = (vinculos ?? []).map((v) => v.usuario_id)
  if (!ids.length) return []
  const { data: perfis, error: erroPerfis } = await supabase.from('perfis').select('id, nome_completo, email').in('id', ids)
  if (erroPerfis) throw falhaDeLeitura()
  const porId = new Map((perfis ?? []).map((p) => [p.id, p]))
  return (vinculos ?? []).map((v) => {
    const perfil = porId.get(v.usuario_id)
    return {
      usuarioId: v.usuario_id,
      nome: perfil?.nome_completo || t('Pessoa sem nome no cadastro'),
      email: perfil?.email ?? null,
      papel: v.papel,
      desde: v.created_at,
    }
  })
}

/**
 * O dono muda o papel de outra pessoa da empresa. Quem decide se pode é o banco (só o dono
 * altera papel, e o último dono não deixa de ser dono). O papel novo vale para a pessoa no
 * próximo token dela.
 */
export async function mudarPapelNoCadastro(empresaId: string, usuarioId: string, papel: Papel): Promise<void> {
  const supabase = await cliente()
  const { data, error } = await supabase
    .from('membros_empresa')
    .update({ papel })
    .eq('empresa_id', empresaId)
    .eq('usuario_id', usuarioId)
    .select('usuario_id')
  if (error) {
    // P0001: a empresa ficaria sem dono. 42501: a regra de acesso recusou. O resto (rede,
    // banco fora do ar) não é questão de permissão.
    const codigo = (error as { code?: unknown }).code
    if (codigo === 'P0001') throw new ErroApi('conflito', t('A empresa precisa de pelo menos um dono. Passe a propriedade a outra pessoa antes.'), 409, 'ultimo_dono')
    if (codigo === '42501') throw new ErroApi('sem_permissao', t('Só o dono muda papéis.'), 403)
    throw new ErroApi('servidor', t('Não foi possível mudar o papel agora. Tente de novo em instantes.'))
  }
  // Sem erro e sem linha alterada: a regra do banco não deixou este usuário mudar aquela linha.
  if (!data?.length) throw new ErroApi('sem_permissao', t('Seu papel não permite mudar o papel desta pessoa.'), 403)
}
