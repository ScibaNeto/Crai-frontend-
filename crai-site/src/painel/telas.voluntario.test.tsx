// @vitest-environment jsdom
/**
 * Rodada 3, Fase 1: a página do Voluntário em MODO REAL mostra o que o backend devolveu, e
 * nada do que era fictício. O backend aqui é o de mentira (`testes/modoRealFalso.ts`), com
 * respostas na forma exata das rotas novas.
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.hoisted(() => {
  vi.stubEnv('VITE_CRAI_API_URL', 'http://backend.de.mentira')
  vi.stubEnv('VITE_CRAI_MOSTRAR_DEMONSTRACAO', '')
})

import App from './App'
import { MODO_REAL, emDemonstracao } from './data/api'
import { clientesRisco } from './data/mock'
import { corposEnviados, ligarBackendFalso, prepararJsdom } from './testes/modoRealFalso'

const ESPERA = { timeout: 5000 }
const MES = new Date().toISOString().slice(0, 7)
const NOME_DO_MES = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(`${MES}-15T12:00:00`))

const RECENTES = {
  clientes: [
    {
      id: 'cli-001',
      nome: 'Oficina Boa Viagem',
      mrr: 480,
      faixa: 'grave',
      motivo: '41 dias sem login, 0 funcionalidades usadas, MRR R$ 480,00',
      decidido_por: 'regua',
      posicao_no_ranking: 1,
      abordagem: { oferta: 'desconto_20', oferta_legivel: 'desconto de 20% por 3 meses', canal: 'popup', canal_legivel: 'aviso dentro do produto', situacao: 'aceita', simulado: false },
      atualizado_em: new Date(Date.now() - 3 * 3_600_000).toISOString(),
      origem: 'upload',
      simulado: false,
    },
    {
      id: 'cli-002',
      nome: null,
      mrr: null,
      faixa: 'sem_dado',
      motivo: 'sem dado de atividade',
      decidido_por: null,
      posicao_no_ranking: null,
      abordagem: null,
      atualizado_em: null,
      origem: 'sdk',
      simulado: false,
    },
  ],
  total_na_base: 2,
}

const MES_VOLUNTARIO = {
  mes: MES,
  valor_liquido_mantido: 326.4,
  clientes_mantidos: 1,
  estornos: { quantidade: 1, valor_liquido_estornado: 85 },
  aceites_sem_valor: 0,
  grave: 1,
  preocupante: 0,
  ofertas_enviadas: 3,
  ofertas_aceitas: 1,
  meses_de_mrr: 6,
  prazo_estorno_dias: 90,
}

const BASE = { base: { total: 2, com_dados_comportamento: 1, decididos_pelo_modelo: 0, modelo_ativo: false, atualizada_em: new Date(Date.now() - 2 * 3_600_000).toISOString(), origem: 'anexo' } }

const COM_DADOS = {
  'GET /clientes/recentes': RECENTES,
  'GET /clientes/base': BASE,
  'GET /metrics/voluntario/mes': MES_VOLUNTARIO,
}

// A cada teste: o `unstubAllGlobals` do fim desfaz também o que o jsdom não tem (o
// `ResizeObserver` do gráfico), então a preparação é refeita.
beforeEach(() => prepararJsdom())
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function abrir(caminho: string) {
  window.history.pushState({}, '', caminho)
  return render(<App />)
}

async function carregada() {
  expect(await screen.findByText(`Mantido para você em ${NOME_DO_MES}`, {}, ESPERA)).toBeTruthy()
  await waitFor(() => expect(document.querySelector('[aria-busy="true"]')).toBeNull(), ESPERA)
}

describe('voluntário em modo real', () => {
  it('as cinco funções da página estão no mapa de rotas reais', () => {
    expect(MODO_REAL).toBe(true)
    expect(emDemonstracao('clientesRecentes', 'baseClientes', 'resumoVoluntario', 'serieVoluntario', 'comparacaoReguaModelo', 'importarBase')).toBe(false)
  })

  it('os cartões mostram os números do backend, com o mês que ele devolveu', async () => {
    ligarBackendFalso(COM_DADOS)
    abrir('/voluntario')
    await carregada()
    expect(screen.getByText(/R\$\s326/)).toBeTruthy()
    expect(screen.getByText(/1 cliente que ficou, 1 estorno\./)).toBeTruthy()
    expect(screen.getByText('1 de 3')).toBeTruthy()
    expect(screen.getByText('33% de aceite')).toBeTruthy()
    // Sem modelo ativo, a tela não afirma que o modelo decide.
    expect(screen.getByText('A régua decide em toda a base')).toBeTruthy()
    expect(screen.queryByText(/Modelo de IA em \d+% da base/)).toBeNull()
  })

  it('a tabela mostra os clientes do backend e nenhum dos fictícios', async () => {
    ligarBackendFalso(COM_DADOS)
    abrir('/voluntario?aba=clientes')
    await carregada()
    const tabela = within(screen.getByRole('table'))
    expect(tabela.getByText('Oficina Boa Viagem')).toBeTruthy()
    expect(tabela.getByText('41 dias sem login, 0 funcionalidades usadas, MRR R$ 480,00')).toBeTruthy()
    // A oferta e o canal vêm em texto pronto do backend, com maiúscula.
    expect(tabela.getByText('Desconto de 20% por 3 meses')).toBeTruthy()
    expect(tabela.getByText(/Aviso dentro do produto/)).toBeTruthy()
    expect(tabela.getByText('Aceita')).toBeTruthy()
    expect(tabela.getByText(/1º de 2 pelo risco/)).toBeTruthy()
    // Sem nome na base, aparece o id que a empresa usa; sem avaliação, a tela diz isso.
    expect(tabela.getByText('cli-002')).toBeTruthy()
    expect(tabela.getByText('Sem avaliação')).toBeTruthy()
    expect(tabela.getByText('Sem dado de atividade')).toBeTruthy()
    for (const ficticio of clientesRisco) expect(screen.queryByText(ficticio.nome)).toBeNull()
  })

  it('a regra do mantido é a que o backend aplica', async () => {
    ligarBackendFalso(COM_DADOS)
    abrir('/voluntario?aba=mantido')
    await carregada()
    const regra = screen.getByText('Como o valor é contado:').parentElement as HTMLElement
    expect(regra.textContent).toContain('6 meses da mensalidade')
    expect(regra.textContent).toContain('cancelar em até 90 dias')
    // A série veio toda zerada: o estado vazio, e não um gráfico inventado.
    expect(screen.getByText('Nada mantido ainda nos últimos 30 dias')).toBeTruthy()
  })

  it('sem comparação no backend, a aba não mostra números de comparação', async () => {
    ligarBackendFalso(COM_DADOS)
    abrir('/voluntario?aba=decisao')
    await carregada()
    expect(screen.getByText(/A comparação aparece quando o modelo de IA estiver avaliando a sua base/)).toBeTruthy()
    expect(screen.queryByText('Avisou antes do cancelamento')).toBeNull()
    expect(screen.queryByText('Marcou como grave')).toBeNull()
  })

  it('com comparação, a frase é montada com os números do backend', async () => {
    ligarBackendFalso({
      ...COM_DADOS,
      'GET /clientes/base': { base: { ...BASE.base, total: 60, com_dados_comportamento: 60, decididos_pelo_modelo: 45, modelo_ativo: true } },
      'GET /metrics/voluntario/regua-x-modelo': { dias: 30, comparacao: { clientes_com_dados: 60, cancelamentos: 6, regua: { marcou_grave: 9, avisou_antes: 2 }, modelo: { marcou_grave: 7, avisou_antes: 4 } }, motivo_vazio: null },
    })
    abrir('/voluntario?aba=decisao')
    await carregada()
    expect(screen.getByText('Modelo de IA em 75% da base')).toBeTruthy()
    expect(screen.getByText(/Entre os 60 clientes com dados de comportamento, 6 cancelaram/)).toBeTruthy()
    expect(screen.getByText(/O modelo tinha marcado 4 dos 6 cancelamentos, com 7 clientes como graves\. A régua tinha marcado 2, com 9 como graves\./)).toBeTruthy()
  })

  it('sem base, a página avisa e a origem não é inventada', async () => {
    ligarBackendFalso()
    abrir('/voluntario')
    await carregada()
    expect(screen.getByText(/Ainda não há base de clientes/)).toBeTruthy()
    expect(screen.queryByText('Pela API')).toBeNull()
    expect(screen.queryByText('Por anexo')).toBeNull()
  })

  it('a origem da base é a que o backend registrou', async () => {
    ligarBackendFalso(COM_DADOS)
    abrir('/voluntario')
    await carregada()
    expect(screen.getByText('Por anexo')).toBeTruthy()
    cleanup()
    ligarBackendFalso({ ...COM_DADOS, 'GET /clientes/base': { base: { ...BASE.base, origem: null } } })
    abrir('/voluntario')
    await carregada()
    expect(screen.getByText('Origem não registrada')).toBeTruthy()
  })

  it('a barra "Mostrar: Simulação" pede os simulados ao backend', async () => {
    const chamadas = ligarBackendFalso(COM_DADOS)
    abrir('/voluntario')
    await carregada()
    expect(chamadas.some((c) => c.includes('incluir_simulados'))).toBe(false)
    fireEvent.click(screen.getByRole('radio', { name: 'Simulação' }))
    await waitFor(() => expect(chamadas).toContain('GET /metrics/voluntario/mes?incluir_simulados=true'), ESPERA)
    expect(chamadas).toContain('GET /metrics/voluntario/serie?dias=30&incluir_simulados=true')
  })

  it('o anexo sobe de verdade, mostra o que o backend respondeu e a página lê a base de novo', async () => {
    const chamadas = ligarBackendFalso({
      ...COM_DADOS,
      'POST /clientes/importar': { importados: 7, rejeitados: [{ linha: 4, motivo: 'mrr ausente' }], colunas_nao_encontradas: [], linhas_sem_dado_comportamental: 2 },
    })
    abrir('/voluntario')
    await carregada()
    const antes = chamadas.filter((c) => c.startsWith('GET /clientes/base')).length
    const arquivo = new File(['customer_id_externo,mrr,billing_profile\nc1,100,PJ\n'], 'base.csv', { type: 'text/csv' })
    fireEvent.change(screen.getByLabelText('Anexar a base em CSV ou XLSX'), { target: { files: [arquivo] } })
    const recebida = (await screen.findByText(/Base recebida: base\.csv/, {}, ESPERA)).closest('[role="status"]') as HTMLElement
    expect(chamadas).toContain('POST /clientes/importar')
    expect(recebida.textContent).toContain('8 linhas')
    expect(recebida.textContent).toContain('7 na base')
    expect(recebida.textContent).toContain('1 recusadas')
    expect(recebida.textContent).toContain('2 sem dado de comportamento')
    expect(recebida.textContent).toContain('Linha 4: mrr ausente')
    // Nada do que o backend não informa é mostrado, e o aviso de demonstração não aparece.
    expect(recebida.textContent).not.toContain('novos')
    expect(recebida.textContent).not.toContain('corrigidos')
    expect(recebida.textContent).not.toContain('Demonstração')
    await waitFor(() => expect(chamadas.filter((c) => c.startsWith('GET /clientes/base')).length).toBeGreaterThan(antes), ESPERA)
  })
})

describe('a lista de clientes por risco (14/10/2026)', () => {
  const POR_RISCO = { ...RECENTES, total_na_base: 300, contagem_por_faixa: { grave: 38, preocupante: 28, sem_risco: 228, sem_dado: 6 }, total_filtrado: 300 }

  it('pede a lista por risco, e os filtros contam a base inteira', async () => {
    const chamadas = ligarBackendFalso({ ...COM_DADOS, 'GET /clientes/recentes': POR_RISCO })
    abrir('/voluntario?aba=clientes')
    expect(await screen.findByText('Clientes por risco', {}, ESPERA)).toBeTruthy()
    await waitFor(() => expect(chamadas.some((c) => c.startsWith('GET /clientes/recentes?ordem=risco'))).toBe(true), ESPERA)
    const filtros = within(screen.getByRole('tablist', { name: 'Filtrar por faixa' }))
    await waitFor(() => expect(filtros.getByRole('tab', { name: /Grave\s*38/ })).toBeTruthy(), ESPERA)
    expect(filtros.getByRole('tab', { name: /Todos\s*300/ })).toBeTruthy()
    expect(filtros.getByRole('tab', { name: /Preocupante\s*28/ })).toBeTruthy()
    expect(screen.getByText('Mostrando 2 de 300')).toBeTruthy()
  })

  it('o filtro consulta a base inteira, e "Ver mais" pede a página seguinte', async () => {
    const chamadas = ligarBackendFalso({ ...COM_DADOS, 'GET /clientes/recentes': POR_RISCO })
    abrir('/voluntario?aba=clientes')
    const filtros = within(await screen.findByRole('tablist', { name: 'Filtrar por faixa' }, ESPERA))
    await waitFor(() => expect(filtros.getByRole('tab', { name: /Grave\s*38/ })).toBeTruthy(), ESPERA)
    fireEvent.click(filtros.getByRole('tab', { name: /Grave/ }))
    await waitFor(() => expect(chamadas.some((c) => c.includes('ordem=risco') && c.includes('faixa=grave'))).toBe(true), ESPERA)
    const verMais = await screen.findByRole('button', { name: 'Ver mais 25' }, ESPERA)
    fireEvent.click(verMais)
    await waitFor(() => expect(chamadas.some((c) => c.includes('faixa=grave') && c.includes('deslocamento=2'))).toBe(true), ESPERA)
  })

  it('o número de graves na aba é o da base inteira, igual ao cartão', async () => {
    ligarBackendFalso({ ...COM_DADOS, 'GET /metrics/voluntario/mes': { ...MES_VOLUNTARIO, grave: 38 } })
    abrir('/voluntario')
    await carregada()
    expect(screen.getByText('38 graves')).toBeTruthy()
  })
})

describe('as 3 mensagens do voluntário (14/10/2026)', () => {
  const PRAZO = new Date(Date.now() + 400 * 60_000).toISOString()
  const SUGESTAO = (abordagem: string, recomendada: boolean, pt: string) => ({
    rodada: 1,
    abordagem,
    recomendada,
    escolhida: false,
    origem: 'template',
    textos: { pt, en: `EN ${pt}` },
  })
  const RESUMO = {
    id: 7,
    cliente_id: 'cli-001',
    nome: 'Oficina Boa Viagem',
    mrr: 480,
    faixa: 'grave',
    estado: 'aguardando',
    oferta: 'desconto_20',
    oferta_legivel: 'desconto de 20% por 3 meses',
    canal: 'email',
    canal_legivel: 'e-mail',
    criado_em: new Date(Date.now() - 80 * 60_000).toISOString(),
    escolha_ate: PRAZO,
    recomendada: SUGESTAO('direto_ao_ponto', true, 'Olá. Temos uma proposta para você continuar.'),
  }
  const DETALHE = {
    ...RESUMO,
    posicao_no_ranking: 1,
    total_na_base: 2,
    modo: 'escolha',
    escolhida_por: null,
    enviada_em: null,
    motivo_nao_enviada: null,
    texto_apagado: false,
    risco: {
      pontuacao: 0.9,
      decidido_por: 'regua',
      motivo: '41 dias sem login, 0 funcionalidades usadas, MRR R$ 480,00',
      contribuicoes: [],
    },
    sugestoes: [
      SUGESTAO('cuidado_proximo', false, 'Olá! Notamos que você tem usado menos a plataforma.'),
      SUGESTAO('facilitacao', false, 'Olá! Se algo está pesando no momento, a gente facilita.'),
      SUGESTAO('direto_ao_ponto', true, 'Olá. Temos uma proposta para você continuar.'),
    ],
    linha_do_tempo: [
      { em: new Date(Date.now() - 81 * 60_000).toISOString(), tipo: 'sinal_de_risco', evento: 'Cancellation Page Viewed' },
      { em: RESUMO.criado_em, tipo: 'mensagens_sugeridas', oferta_legivel: 'desconto de 20% por 3 meses', canal_legivel: 'e-mail', rodadas: 1 },
    ],
  }
  const COM_MENSAGEM = {
    ...COM_DADOS,
    'GET /clientes/recentes': {
      ...RECENTES,
      clientes: [{ ...RECENTES.clientes[0], abordagem: { ...RECENTES.clientes[0].abordagem, canal: 'email', canal_legivel: 'e-mail', situacao: 'aguardando_escolha', mensagem_id: 7 } }, RECENTES.clientes[1]],
    },
    'GET /voluntario/mensagens': { mensagens: [RESUMO], modo: 'escolha', prazo_escolha_horas: 8 },
    'GET /voluntario/mensagens/7': DETALHE,
    'POST /voluntario/mensagens/7/escolher': { id: 7, rodada: 1, abordagem: 'facilitacao', escolhida_por: 'owner', enviada: true, motivo_nao_enviada: null },
    'POST /voluntario/mensagens/7/regerar': { id: 7, rodada: 2, sugestoes: [], escolha_ate: PRAZO },
  }

  it('as quatro funções estão no mapa de rotas reais', () => {
    expect(emDemonstracao('mensagensVoluntario', 'mensagemVoluntario', 'escolherMensagemVoluntario', 'regerarMensagensVoluntario')).toBe(false)
  })

  it('a aba Mensagens mostra quantas esperam e a recomendada de cada uma', async () => {
    ligarBackendFalso(COM_MENSAGEM)
    abrir('/voluntario?aba=mensagens')
    const aba = await screen.findByRole('tab', { name: /Mensagens\s*1/ }, ESPERA)
    expect(aba.getAttribute('aria-selected')).toBe('true')
    const lista = within(await screen.findByRole('list', { name: 'Ofertas esperando a escolha da mensagem' }, ESPERA))
    expect(lista.getByText('Oficina Boa Viagem')).toBeTruthy()
    expect(lista.getByText(/Oferta: Desconto de 20% por 3 meses/)).toBeTruthy()
    expect(lista.getByText('Recomendada: Direto ao ponto.')).toBeTruthy()
    expect(lista.getByText(/Envio automático em 6 h/)).toBeTruthy()
  })

  it('"Ver as 3 mensagens" abre o painel com o risco, as mensagens e a linha do tempo', async () => {
    ligarBackendFalso(COM_MENSAGEM)
    abrir('/voluntario?aba=clientes')
    const tabela = within(await screen.findByRole('table', {}, ESPERA))
    await waitFor(() => expect(tabela.getByText('Esperando a sua escolha')).toBeTruthy(), ESPERA)
    fireEvent.click(tabela.getByRole('button', { name: /Ver as 3 mensagens/ }))
    const painel = within(await screen.findByRole('dialog', { name: 'Mensagens da oferta' }, ESPERA))
    expect(await painel.findByText('Por que este cliente está em risco', {}, ESPERA)).toBeTruthy()
    expect(painel.getByText('90%')).toBeTruthy()
    expect(painel.getByText(/não uma probabilidade/)).toBeTruthy()
    expect(painel.getByText('Cuidado próximo')).toBeTruthy()
    expect(painel.getByText('Facilitação')).toBeTruthy()
    expect(painel.getByText('Direto ao ponto')).toBeTruthy()
    expect(painel.getAllByRole('button', { name: /Enviar esta/ })).toHaveLength(3)
    expect(painel.getByText('Abriu a página de cancelamento.')).toBeTruthy()
    expect(painel.getByText('Envio automático da recomendada')).toBeTruthy()
  })

  it('"Enviar esta" manda só a rodada e a abordagem, nunca o texto', async () => {
    ligarBackendFalso(COM_MENSAGEM)
    abrir('/voluntario?aba=mensagens&mensagem=7')
    const painel = within(await screen.findByRole('dialog', { name: 'Mensagens da oferta' }, ESPERA))
    await painel.findByText('Facilitação', {}, ESPERA)
    const cartao = document.querySelector('[data-abordagem="facilitacao"]') as HTMLElement
    fireEvent.click(within(cartao).getByRole('button', { name: /Enviar esta/ }))
    await waitFor(() => expect(corposEnviados().some((c) => c.chave === 'POST /voluntario/mensagens/7/escolher')).toBe(true), ESPERA)
    const corpo = corposEnviados().find((c) => c.chave === 'POST /voluntario/mensagens/7/escolher')!.corpo
    expect(corpo).toEqual({ rodada: 1, abordagem: 'facilitacao' })
  })

  it('"Quero outro tipo de mensagem" pede outra rodada', async () => {
    const chamadas = ligarBackendFalso(COM_MENSAGEM)
    abrir('/voluntario?aba=mensagens&mensagem=7')
    const painel = within(await screen.findByRole('dialog', { name: 'Mensagens da oferta' }, ESPERA))
    fireEvent.click(await painel.findByRole('button', { name: /Quero outro tipo de mensagem/ }, ESPERA))
    await waitFor(() => expect(chamadas).toContain('POST /voluntario/mensagens/7/regerar'), ESPERA)
  })
})
