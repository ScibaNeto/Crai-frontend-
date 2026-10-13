// @vitest-environment jsdom
/**
 * O LOGIN REAL: o token da sessão do site, o que o painel lê dele, para onde manda quem não
 * tem sessão ou não tem empresa, e a conversa com o backend com esse token (a renovação no
 * 401, uma vez só). O Supabase e o backend são de mentira.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../lib/supabase', () => import('../testes/supabaseFalso').then((m) => m.moduloFalso()))

import { mascararCnpj, mascararEmail } from './adaptadores'
import type { ErroApi } from './erros'
import { EMPRESA_ID, USUARIO_ID, claimsDeDono, estado, reiniciarSupabaseFalso, tokenFalso } from '../testes/supabaseFalso'

const BASE = 'http://backend.teste'
let destinos: string[] = []

async function carregar() {
  vi.resetModules()
  vi.stubEnv('VITE_CRAI_API_URL', `${BASE}/`)
  const sessao = await import('./sessao')
  sessao.reiniciarSaidaParaTeste((endereco) => destinos.push(endereco))
  return { sessao, http: await import('./http'), api: await import('./api') }
}

async function erroDe(promessa: Promise<unknown>): Promise<ErroApi> {
  try {
    await promessa
  } catch (e) {
    return e as ErroApi
  }
  throw new Error('a chamada deveria ter falhado')
}

interface Chamada {
  url: string
  autorizacao: string | null
}
function backendFalso(fila: { status: number; corpo?: unknown }[]): Chamada[] {
  const chamadas: Chamada[] = []
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit = {}) => {
      chamadas.push({ url, autorizacao: ((init.headers ?? {}) as Record<string, string>).Authorization ?? null })
      const r = fila.shift() ?? { status: 200, corpo: {} }
      return new Response(JSON.stringify(r.corpo ?? {}), { status: r.status })
    }),
  )
  return chamadas
}

beforeEach(() => {
  destinos = []
  reiniciarSupabaseFalso()
  window.history.pushState({}, '', '/app/involuntario?aba=mensagens')
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('o que o painel lê do token', () => {
  it('a empresa, o usuário, o papel e o plano, como o backend os lê', async () => {
    const { sessao } = await carregar()
    expect(sessao.LOGIN_REAL).toBe(true)
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono()))).toEqual({ empresaId: EMPRESA_ID, usuarioId: USUARIO_ID, papel: 'owner', plano: 'premium', assinatura: 'dispensada' })
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ papel: 'admin', plano: 'essencial' })))).toMatchObject({ papel: 'admin', plano: 'essencial' })
  })

  it('sem papel, ou com papel ou plano fora do vocabulário, vale o que dá menos: membro e essencial', async () => {
    const { sessao } = await carregar()
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ papel: undefined, plano: undefined })))).toMatchObject({ papel: 'membro', plano: 'essencial' })
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ papel: 'superusuario', plano: 'standard' })))).toMatchObject({ papel: 'membro', plano: 'essencial' })
  })

  it('token sem empresa, ou que não é um JWT, não vira conta', async () => {
    const { sessao } = await carregar()
    expect(sessao.contaDoToken(tokenFalso({ aud: 'authenticated', sub: USUARIO_ID, empresa_id: EMPRESA_ID }))).toBeNull()
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ tenant_id: '   ' })))).toBeNull()
    expect(sessao.contaDoToken('isto-nao-e-um-token')).toBeNull()
    expect(sessao.contaDoToken('a.b.c')).toBeNull()
  })

  it('a assinatura: dispensada, ativa ou pendente; sem a claim, ou fora do vocabulário, vale dispensada', async () => {
    const { sessao } = await carregar()
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ assinatura: 'ativa' })))?.assinatura).toBe('ativa')
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ assinatura: 'pendente' })))?.assinatura).toBe('pendente')
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ assinatura: 'dispensada' })))?.assinatura).toBe('dispensada')
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ assinatura: undefined })))?.assinatura).toBe('dispensada')
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ assinatura: 'qualquer' })))?.assinatura).toBe('dispensada')
  })

  it('lê acento no token sem quebrar', async () => {
    const { sessao } = await carregar()
    expect(sessao.contaDoToken(tokenFalso(claimsDeDono({ nome: 'Conceição Araújo' })))?.empresaId).toBe(EMPRESA_ID)
  })
})

describe('quem não pode entrar é levado ao lugar certo', () => {
  it('sem sessão: vai ao login do site, com a volta para a página pedida', async () => {
    const { sessao } = await carregar()
    estado.sessao = null
    const erro = await erroDe(sessao.tokenDaSessao())
    expect(erro.codigo).toBe('nao_autorizado')
    expect(destinos).toEqual([`/entrar?proximo=${encodeURIComponent('/app/involuntario?aba=mensagens')}`])
  })

  it('token de antes de a empresa existir: renova uma vez e segue com o novo', async () => {
    const { sessao } = await carregar()
    estado.sessao = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    const novo = tokenFalso(claimsDeDono({ plano: 'essencial' }))
    estado.renovado = novo
    expect(await sessao.tokenDaSessao()).toBe(novo)
    expect(estado.renovacoes).toBe(1)
    expect(destinos).toEqual([])
  })

  it('conta sem empresa mesmo depois de renovar: vai ao cadastro', async () => {
    const { sessao } = await carregar()
    estado.sessao = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    estado.renovado = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    const erro = await erroDe(sessao.tokenDaSessao())
    expect(erro.codigo).toBe('sem_permissao')
    expect(erro.motivo).toBe('sem_empresa')
    expect(destinos).toEqual(['/cadastro'])
  })

  it('assinatura pendente mesmo depois de renovar: vai à página de pagamento do site', async () => {
    const { sessao } = await carregar()
    estado.sessao = tokenFalso(claimsDeDono({ assinatura: 'pendente' }))
    estado.renovado = tokenFalso(claimsDeDono({ assinatura: 'pendente' }))
    const erro = await erroDe(sessao.tokenDaSessao())
    expect(erro.codigo).toBe('sem_permissao')
    expect(erro.motivo).toBe('assinatura_pendente')
    expect(estado.renovacoes).toBe(1)
    expect(destinos).toEqual(['/pagamento'])
  })

  it('assinatura pendente no token antigo, ativa no renovado: segue com o novo, sem sair do painel', async () => {
    const { sessao } = await carregar()
    estado.sessao = tokenFalso(claimsDeDono({ assinatura: 'pendente' }))
    const novo = tokenFalso(claimsDeDono({ assinatura: 'ativa' }))
    estado.renovado = novo
    expect(await sessao.tokenDaSessao()).toBe(novo)
    expect(destinos).toEqual([])
  })

  it('assinatura dispensada (como até o lançamento) ou ativa: entra sem renovar', async () => {
    const { sessao } = await carregar()
    for (const assinatura of ['dispensada', 'ativa']) {
      estado.sessao = tokenFalso(claimsDeDono({ assinatura }))
      expect(await sessao.tokenDaSessao()).toBe(estado.sessao)
    }
    expect(estado.renovacoes).toBe(0)
    expect(destinos).toEqual([])
  })

  it('serviço de login fora do ar: erro de rede, e ninguém é mandado embora', async () => {
    const { sessao } = await carregar()
    estado.semRede = true
    expect((await erroDe(sessao.tokenDaSessao())).codigo).toBe('rede')
    expect(destinos).toEqual([])
  })

  it('o token de renovação não vale mais (erro 400 ao ler a sessão): vai ao login, não é "sem rede"', async () => {
    const { sessao } = await carregar()
    estado.statusDoErroDaSessao = 400
    expect((await erroDe(sessao.tokenDaSessao())).codigo).toBe('nao_autorizado')
    expect(destinos).toHaveLength(1)
    expect(destinos[0].startsWith('/entrar?proximo=')).toBe(true)
  })

  it('token sem empresa, mas o cadastro TEM empresa: erro do login, sem mandar ao cadastro (seria um círculo)', async () => {
    const { sessao } = await carregar()
    estado.sessao = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    estado.renovado = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    estado.tabelas.perfis[0].empresa_ativa_id = EMPRESA_ID
    const erro = await erroDe(sessao.tokenDaSessao())
    expect(erro.motivo).toBe('token_sem_empresa')
    expect(destinos).toEqual([])
  })

  it('a sessão terminou sem a pessoa pedir: o painel leva ao login, com a volta; quem clicou em "Sair" volta ao site', async () => {
    const { sessao } = await carregar()
    const avisos: boolean[] = []
    await sessao.aoEncerrarSessao((porEscolha) => avisos.push(porEscolha))
    for (const avisar of estado.ouvintes) avisar('SIGNED_OUT')
    expect(avisos).toEqual([false])
    sessao.sairDoPainel(false)
    expect(destinos).toEqual([`/entrar?proximo=${encodeURIComponent('/app/involuntario?aba=mensagens')}`])
    sessao.reiniciarSaidaParaTeste()
    await sessao.sair()
    expect(avisos).toEqual([false, true])
  })

  it('a saída acontece uma vez só, mesmo com várias chamadas falhando juntas', async () => {
    const { sessao } = await carregar()
    estado.sessao = null
    await Promise.all([erroDe(sessao.tokenDaSessao()), erroDe(sessao.tokenDaSessao()), erroDe(sessao.tokenDaSessao())])
    expect(destinos).toHaveLength(1)
  })

  it('sair encerra a sessão e volta ao site', async () => {
    const { sessao } = await carregar()
    await sessao.sair()
    expect(estado.saidas).toBe(1)
    expect(destinos).toEqual(['/'])
  })
})

describe('a conversa com o backend usa o token da sessão', () => {
  it('manda o token da sessão e nunca pede o login de desenvolvimento', async () => {
    const { http } = await carregar()
    const chamadas = backendFalso([{ status: 200, corpo: { ok: true } }])
    expect(await http.chamar('GET', '/configuracao')).toEqual({ ok: true })
    expect(chamadas).toEqual([{ url: `${BASE}/configuracao`, autorizacao: `Bearer ${estado.sessao}` }])
    expect(chamadas.some((c) => c.url.endsWith('/dev/token'))).toBe(false)
  })

  it('401 do backend: renova no Supabase e tenta mais UMA vez, com o token novo', async () => {
    const { http } = await carregar()
    const antigo = estado.sessao
    const novo = tokenFalso(claimsDeDono({ papel: 'admin' }))
    estado.renovado = novo
    const chamadas = backendFalso([{ status: 401 }, { status: 200, corpo: { ok: true } }])
    expect(await http.chamar('GET', '/ciclos')).toEqual({ ok: true })
    expect(chamadas.map((c) => c.autorizacao)).toEqual([`Bearer ${antigo}`, `Bearer ${novo}`])
    expect(estado.renovacoes).toBe(1)
  })

  it('401 de novo depois de renovar: erro na tela, sem terceira tentativa', async () => {
    const { http } = await carregar()
    const chamadas = backendFalso([{ status: 401 }, { status: 401 }, { status: 200 }])
    const erro = await erroDe(http.chamar('GET', '/ciclos'))
    expect(erro.codigo).toBe('nao_autorizado')
    expect(chamadas).toHaveLength(2)
  })

  it('401 e a sessão acabou: vai ao login, sem segunda tentativa', async () => {
    const { http } = await carregar()
    estado.renovado = null
    const chamadas = backendFalso([{ status: 401 }, { status: 200 }])
    const erro = await erroDe(http.chamar('GET', '/ciclos'))
    expect(erro.codigo).toBe('nao_autorizado')
    expect(chamadas).toHaveLength(1)
    expect(destinos).toHaveLength(1)
    expect(destinos[0].startsWith('/entrar?proximo=')).toBe(true)
  })

  it('401 e a renovação falhou com a sessão ainda aberta: erro de rede, e ninguém é mandado ao login', async () => {
    const { http } = await carregar()
    estado.falhaNaRenovacao = true
    const chamadas = backendFalso([{ status: 401 }, { status: 200 }])
    const erro = await erroDe(http.chamar('GET', '/ciclos'))
    expect(erro.codigo).toBe('rede')
    expect(chamadas).toHaveLength(1)
    expect(destinos).toEqual([])
    expect(estado.sessao).not.toBeNull()
  })

  it('vários 401 ao mesmo tempo: UMA renovação só, e todos tentam de novo com o token novo', async () => {
    const { http } = await carregar()
    const novo = tokenFalso(claimsDeDono({ papel: 'admin' }))
    estado.renovado = novo
    const chamadas = backendFalso([{ status: 401 }, { status: 401 }, { status: 401 }, { status: 200 }, { status: 200 }, { status: 200 }])
    await Promise.all([http.chamar('GET', '/a'), http.chamar('GET', '/b'), http.chamar('GET', '/c')])
    expect(estado.renovacoes).toBe(1)
    expect(chamadas.slice(3).map((c) => c.autorizacao)).toEqual([`Bearer ${novo}`, `Bearer ${novo}`, `Bearer ${novo}`])
  })

  it('401 para um token que outro pedido já trocou: usa o novo, sem renovar de novo', async () => {
    const { sessao } = await carregar()
    const antigo = estado.sessao!
    const novo = tokenFalso(claimsDeDono({ papel: 'admin' }))
    estado.sessao = novo
    expect(await sessao.renovarTokenDaSessao(antigo)).toBe(novo)
    expect(estado.renovacoes).toBe(0)
  })

  it('a rota pública (sem token) não lê a sessão', async () => {
    const { http } = await carregar()
    estado.sessao = null
    const chamadas = backendFalso([{ status: 200, corpo: { status: 'ok' } }])
    await http.chamar('GET', '/health', undefined, { semToken: true })
    expect(chamadas).toEqual([{ url: `${BASE}/health`, autorizacao: null }])
    expect(destinos).toEqual([])
  })
})

describe('o que vem do cadastro do site', () => {
  it('a empresa: o nome do cadastro, o papel e o plano do token', async () => {
    const { api } = await carregar()
    expect(await api.api.empresa()).toEqual({ nome: 'Aurora Sistemas', plano: 'premium', papel: 'owner' })
    estado.sessao = tokenFalso(claimsDeDono({ papel: 'membro', plano: 'essencial' }))
    expect(await api.api.empresa()).toEqual({ nome: 'Aurora Sistemas', plano: 'essencial', papel: 'membro' })
  })

  it('sem nome fantasia, vale a razão social', async () => {
    const { api } = await carregar()
    estado.tabelas.empresas[0].nome_fantasia = null
    expect((await api.api.empresa()).nome).toBe('Aurora Sistemas Ltda')
  })

  it('o cadastro não respondeu: o painel abre com o papel e o plano do token, sem o nome', async () => {
    const { api } = await carregar()
    estado.tabelas.empresas = []
    expect(await api.api.empresa()).toEqual({ nome: 'Sua empresa', plano: 'premium', papel: 'owner' })
  })

  it('o detalhe da empresa: CNPJ mascarado e a data do cadastro', async () => {
    const { api } = await carregar()
    expect(await api.api.empresaDetalhe()).toEqual({
      nome: 'Aurora Sistemas',
      nome_nas_mensagens: 'Aurora Sistemas',
      assinatura: 'Equipe Aurora Sistemas',
      idioma: 'pt-BR',
      plano: 'premium',
      cnpj_mascarado: '••.•••.•••/••01-95',
      desde: '2026-09-24T12:00:00Z',
    })
  })

  it('a equipe: só quem é da empresa da sessão, com o e-mail mascarado e o "você"', async () => {
    const { api } = await carregar()
    const membros = await api.api.membros()
    expect(membros).toEqual([
      { id: USUARIO_ID, nome: 'Marina Duarte', email_mascarado: 'm•••••@aurora.com.br', papel: 'owner', desde: '2026-09-24T12:00:00Z', voce: true },
      { id: 'colega', nome: 'Rafael Costa', email_mascarado: 'r•••••@aurora.com.br', papel: 'membro', desde: '2026-09-28T12:00:00Z', voce: false },
    ])
    expect(JSON.stringify(membros)).not.toContain('rafael@')
    expect(JSON.stringify(membros)).not.toContain('Outra Empresa')
  })

  it('o dono muda o papel de um colega', async () => {
    const { api } = await carregar()
    const membros = await api.api.mudarPapel('colega', 'admin')
    expect(membros.find((m) => m.id === 'colega')?.papel).toBe('admin')
  })

  it('o banco recusou a mudança de papel: a tela recebe "sem permissão", e nada muda', async () => {
    const { api } = await carregar()
    estado.recusarAlteracao = true
    const erro = await erroDe(api.api.mudarPapel('colega', 'admin'))
    expect(erro.codigo).toBe('sem_permissao')
    expect(estado.tabelas.membros_empresa.find((m) => m.usuario_id === 'colega')?.papel).toBe('membro')
  })

  it('a empresa ficaria sem dono (P0001): "conflito", com a explicação', async () => {
    const { api } = await carregar()
    estado.codigoDoErroNaAlteracao = 'P0001'
    const erro = await erroDe(api.api.mudarPapel(USUARIO_ID, 'membro'))
    expect(erro.codigo).toBe('conflito')
    expect(erro.message).toMatch(/pelo menos um dono/)
  })

  it('a regra de acesso recusou (42501): "sem permissão"; falha de rede: "servidor", não "sem permissão"', async () => {
    const { api } = await carregar()
    estado.codigoDoErroNaAlteracao = '42501'
    expect((await erroDe(api.api.mudarPapel('colega', 'admin'))).codigo).toBe('sem_permissao')
    estado.codigoDoErroNaAlteracao = ''
    expect((await erroDe(api.api.mudarPapel('colega', 'admin'))).codigo).toBe('servidor')
  })

  it('o cadastro respondeu com ERRO (e não "não encontrei"): o painel abre do mesmo jeito, sem o nome; o detalhe mostra o erro', async () => {
    const { api } = await carregar()
    estado.erroNasTabelas = true
    expect(await api.api.empresa()).toEqual({ nome: 'Sua empresa', plano: 'premium', papel: 'owner' })
    expect((await erroDe(api.api.empresaDetalhe())).codigo).toBe('servidor')
  })

  it('estas quatro funções deixam de ser demonstração com o login real; o resto não muda', async () => {
    const { api } = await carregar()
    expect(api.emDemonstracao('empresa', 'empresaDetalhe', 'membros', 'mudarPapel')).toBe(false)
    expect(api.emDemonstracao('integracao')).toBe(true)
    expect(api.emDemonstracao('ciclos', 'configuracao')).toBe(false)
  })
})

describe('as máscaras', () => {
  it('CNPJ: só os 4 últimos dígitos, com ou sem pontuação; o que não é CNPJ vira só máscara', () => {
    expect(mascararCnpj('12345678000195')).toBe('••.•••.•••/••01-95')
    expect(mascararCnpj('12.345.678/0001-95')).toBe('••.•••.•••/••01-95')
    expect(mascararCnpj('123')).toBe('••.•••.•••/••••-••')
  })

  it('e-mail: a primeira letra e o domínio', () => {
    expect(mascararEmail('marina@aurora.com.br')).toBe('m•••••@aurora.com.br')
    expect(mascararEmail(null)).toBe('E-mail não informado')
    expect(mascararEmail('sem-arroba')).toBe('•••••')
  })
})
