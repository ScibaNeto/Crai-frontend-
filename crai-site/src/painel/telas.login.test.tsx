// @vitest-environment jsdom
/**
 * O painel com o LOGIN REAL (a sessão que o site abriu): só abre para quem tem sessão e
 * empresa; mostra a empresa, o papel e o plano de verdade; tem "Sair"; não tem o seletor de
 * papel do login de desenvolvimento; e a Empresa e a Equipe da Configuração vêm do cadastro.
 *
 * O Supabase e o backend são de mentira (`testes/supabaseFalso.ts`, `testes/modoRealFalso.ts`).
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

vi.hoisted(() => {
  vi.stubEnv('VITE_CRAI_API_URL', 'http://backend.de.mentira')
})
vi.mock('../lib/supabase', () => import('./testes/supabaseFalso').then((m) => m.moduloFalso()))

import App from './App'
import { LOGIN_REAL, MODO_REAL } from './data/api'
import { reiniciarSaidaParaTeste } from './data/sessao'
import { ligarBackendFalso, prepararJsdom } from './testes/modoRealFalso'
import { EMPRESA_ID, USUARIO_ID, claimsDeDono, estado, reiniciarSupabaseFalso, tokenFalso } from './testes/supabaseFalso'

const ESPERA = { timeout: 5000 }
let destinos: string[] = []
let chamadas: string[] = []

beforeAll(() => prepararJsdom())
beforeEach(() => {
  destinos = []
  reiniciarSupabaseFalso()
  reiniciarSaidaParaTeste((endereco) => destinos.push(endereco))
  chamadas = ligarBackendFalso()
})
afterEach(() => cleanup())

function abrir(caminho: string) {
  window.history.pushState({}, '', caminho)
  return render(<App />)
}

describe('com sessão e empresa', () => {
  it('o painel abre com a empresa do cadastro, o papel e o plano do token', async () => {
    expect(MODO_REAL).toBe(true)
    expect(LOGIN_REAL).toBe(true)
    abrir('/')
    expect(await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)).toBeTruthy()
    expect(screen.queryByText(/Empresa de demonstração|NimbusFlow/)).toBeNull()
    expect(await screen.findByText('Plano premium', {}, ESPERA)).toBeTruthy()
    expect(document.querySelector('[data-papel="owner"]')?.textContent).toBe('Dono')
  })

  it('não existe seletor de papel: o papel vem do cadastro, e o topo só o mostra', async () => {
    abrir('/')
    await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)
    expect(screen.queryByLabelText('Papel do login de desenvolvimento')).toBeNull()
  })

  it('toda chamada ao backend leva o token da sessão, e o login de desenvolvimento nunca é pedido', async () => {
    abrir('/involuntario')
    await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)
    await waitFor(() => expect(chamadas.some((c) => c.startsWith('GET /ciclos'))).toBe(true), ESPERA)
    expect(chamadas.some((c) => c.includes('/dev/token'))).toBe(false)
    const fetchFalso = globalThis.fetch as unknown as { mock: { calls: [string, RequestInit][] } }
    for (const [, init] of fetchFalso.mock.calls) {
      expect((init.headers as Record<string, string>).Authorization).toBe(`Bearer ${estado.sessao}`)
    }
  })

  it('membro no plano essencial: o topo mostra isso, e o voluntário aparece bloqueado', async () => {
    estado.sessao = tokenFalso(claimsDeDono({ papel: 'membro', plano: 'essencial' }))
    abrir('/')
    await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)
    expect(await screen.findByText('Plano standard', {}, ESPERA)).toBeTruthy()
    expect(document.querySelector('[data-papel="membro"]')?.textContent).toBe('Membro')
    expect(screen.getByLabelText('Churn voluntário').getAttribute('aria-disabled')).toBe('true')
  })

  it('"Sair" encerra a sessão do site e volta para ele', async () => {
    abrir('/')
    await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)
    fireEvent.click(screen.getByRole('button', { name: 'Sair da conta' }))
    await waitFor(() => expect(estado.saidas).toBe(1), ESPERA)
    await waitFor(() => expect(destinos).toEqual(['/']), ESPERA)
    // O painel some enquanto a pessoa é levada ao site.
    expect(await screen.findByText('Saindo do painel…', {}, ESPERA)).toBeTruthy()
    expect(screen.queryByText('Olá, Aurora Sistemas')).toBeNull()
  })

  it('a sessão terminou sem a pessoa pedir (venceu, ou ela saiu em outra aba): o painel fecha e leva ao login, com a volta', async () => {
    abrir('/involuntario')
    await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)
    await waitFor(() => expect(estado.ouvintes.length).toBeGreaterThan(0), ESPERA)
    for (const avisar of estado.ouvintes) avisar('SIGNED_OUT')
    await waitFor(() => expect(destinos).toEqual([`/entrar?proximo=${encodeURIComponent('/involuntario')}`]), ESPERA)
    expect(screen.queryByText('Olá, Aurora Sistemas')).toBeNull()
  })

  it('a página voltou do cache do "Voltar" do navegador: recarrega, para conferir o login de novo', async () => {
    const recarregar = vi.fn()
    const original = window.location
    Object.defineProperty(window, 'location', { configurable: true, value: { ...original, pathname: '/', search: '', reload: recarregar } })
    try {
      abrir('/')
      await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)
      const evento = new Event('pageshow') as Event & { persisted?: boolean }
      Object.defineProperty(evento, 'persisted', { value: true })
      window.dispatchEvent(evento)
      expect(recarregar).toHaveBeenCalledTimes(1)
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: original })
    }
  })
})

describe('sem sessão, sem empresa ou sem serviço de login', () => {
  it('o login não informou a empresa, mas o cadastro tem uma: aviso na tela, sem ir ao cadastro', async () => {
    estado.sessao = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    estado.renovado = tokenFalso({ aud: 'authenticated', sub: USUARIO_ID })
    estado.tabelas.perfis[0].empresa_ativa_id = EMPRESA_ID
    abrir('/')
    expect(await screen.findByText(/o login não a informou ao painel/, {}, ESPERA)).toBeTruthy()
    expect(destinos).toEqual([])
    expect(chamadas).toEqual([])
  })

  it('sem sessão: nada do painel aparece, o backend não é chamado, e a pessoa vai ao login do site', async () => {
    estado.sessao = null
    abrir('/involuntario?aba=mensagens')
    await waitFor(() => expect(destinos).toEqual([`/entrar?proximo=${encodeURIComponent('/involuntario?aba=mensagens')}`]), ESPERA)
    expect(await screen.findByText('Saindo do painel…', {}, ESPERA)).toBeTruthy()
    expect(screen.queryByText(/^Olá,/)).toBeNull()
    expect(screen.queryByLabelText('Seções do painel')).toBeNull()
    expect(chamadas).toEqual([])
  })

  it('sessão sem empresa: vai ao cadastro, e o backend não é chamado', async () => {
    estado.sessao = tokenFalso({ aud: 'authenticated', sub: 'alguem' })
    estado.renovado = tokenFalso({ aud: 'authenticated', sub: 'alguem' })
    abrir('/')
    await waitFor(() => expect(destinos).toEqual(['/cadastro']), ESPERA)
    expect(screen.queryByLabelText('Seções do painel')).toBeNull()
    expect(chamadas).toEqual([])
  })

  it('serviço de login fora do ar: um aviso com "Tentar de novo", que abre o painel quando a rede volta', async () => {
    estado.semRede = true
    abrir('/')
    expect(await screen.findByText('Não deu para carregar', {}, ESPERA)).toBeTruthy()
    expect(screen.getByText(/Não foi possível conferir o seu login agora\./)).toBeTruthy()
    expect(destinos).toEqual([])
    expect(screen.queryByLabelText('Seções do painel')).toBeNull()
    estado.semRede = false
    fireEvent.click(screen.getByRole('button', { name: /Tentar de novo/ }))
    expect(await screen.findByText('Olá, Aurora Sistemas', {}, ESPERA)).toBeTruthy()
  })
})

describe('a Configuração lê o cadastro do site', () => {
  it('Empresa: o nome, o plano, o CNPJ mascarado e a data de verdade', async () => {
    abrir('/configuracao?secao=empresa')
    expect(await screen.findByRole('heading', { name: 'Empresa' }, ESPERA)).toBeTruthy()
    expect(await screen.findByText('••.•••.•••/••01-95', {}, ESPERA)).toBeTruthy()
    expect(screen.getByText('Premium (recuperação + retenção)')).toBeTruthy()
    expect(screen.getByText('24 de set de 2026')).toBeTruthy()
    expect(document.body.textContent).not.toContain('NimbusFlow')
    expect(document.body.textContent).not.toContain('12345678000195')
  })

  it('Equipe: as pessoas da empresa, com o e-mail mascarado; o dono muda o papel de um colega', async () => {
    abrir('/configuracao?secao=equipe')
    expect(await screen.findByRole('heading', { name: 'Equipe' }, ESPERA)).toBeTruthy()
    const linhaDoColega = (await screen.findByText('Rafael Costa', {}, ESPERA)).closest('tr') as HTMLElement
    expect(within(linhaDoColega).getByText('r•••••@aurora.com.br')).toBeTruthy()
    expect(screen.getByText('Marina Duarte')).toBeTruthy()
    expect(screen.queryByText('Pessoa de Outra Empresa')).toBeNull()
    expect(document.body.textContent).not.toContain('rafael@aurora.com.br')

    fireEvent.change(within(linhaDoColega).getByLabelText('Papel de Rafael Costa'), { target: { value: 'admin' } })
    await waitFor(() => expect(estado.tabelas.membros_empresa.find((m) => m.usuario_id === 'colega')?.papel).toBe('admin'), ESPERA)
  })
})
