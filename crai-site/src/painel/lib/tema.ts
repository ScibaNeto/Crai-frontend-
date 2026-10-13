import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * O tema do painel: escuro (o padrão, a cara do site) ou claro.
 *
 * A escolha fica no `localStorage` do navegador, na chave `crai_tema`, com o valor `claro` ou
 * `escuro`. É só a preferência de tema: nenhum identificador, nada vai ao backend. Sem
 * `localStorage` (navegador que bloqueia, janela privada), o tema vale pela sessão.
 *
 * O tema é aplicado em `<html data-tema="claro">` (o escuro não tem atributo). A página do
 * painel (`app/index.html`) carrega um script curto (`public/app-tema-inicial.js`) que lê a
 * chave e põe o atributo ANTES da primeira pintura, para a tela não piscar escura ao abrir no
 * claro; este módulo faz o mesmo quando o painel monta e a cada troca.
 */
export type Tema = 'claro' | 'escuro'

export const CHAVE_DO_TEMA = 'crai_tema'
export const TEMA_PADRAO: Tema = 'escuro'
/** A classe que, por um instante, faz as cores escorregarem na troca (ver `index.css`). */
const CLASSE_DA_TROCA = 'tema-em-troca'
const DURACAO_DA_TROCA_MS = 260

/** A chave em que o SITE guarda o tema da sessão (crai-site/src/lib/tema.ts). O painel só a lê. */
export const CHAVE_DO_TEMA_DO_SITE = 'crai:tema'

/**
 * O tema guardado. Vale primeiro a escolha feita no painel; sem ela, a que a pessoa fez no
 * site nesta sessão (para o painel não abrir escuro para quem estava no site claro).
 */
export function lerTemaGuardado(): Tema {
  try {
    const doPainel = window.localStorage.getItem(CHAVE_DO_TEMA)
    if (doPainel === 'claro' || doPainel === 'escuro') return doPainel
    return window.sessionStorage.getItem(CHAVE_DO_TEMA_DO_SITE) === 'claro' ? 'claro' : TEMA_PADRAO
  } catch {
    return TEMA_PADRAO
  }
}

export function guardarTema(tema: Tema): void {
  try {
    window.localStorage.setItem(CHAVE_DO_TEMA, tema)
  } catch {
    /* sem localStorage, o tema vale só nesta sessão */
  }
}

/** O tema que a página está mostrando agora (o atributo que o script da página pôs). */
export function temaAplicado(): Tema {
  return document.documentElement.getAttribute('data-tema') === 'claro' ? 'claro' : 'escuro'
}

export function aplicarTema(tema: Tema): void {
  const html = document.documentElement
  if (tema === 'claro') html.setAttribute('data-tema', 'claro')
  else html.removeAttribute('data-tema')
}

let troca: number | undefined
/** Por um instante, as cores fazem transição. Com movimento reduzido, trocam de uma vez. */
function animarTroca(reduzido: boolean): void {
  if (reduzido) return
  const html = document.documentElement
  html.classList.add(CLASSE_DA_TROCA)
  window.clearTimeout(troca)
  troca = window.setTimeout(() => html.classList.remove(CLASSE_DA_TROCA), DURACAO_DA_TROCA_MS)
}

/** O tema atual e a função que o define (a seção "Aparência" da Configuração). */
export function useTema(): [Tema, (novo: Tema) => void] {
  const [tema, setTema] = useState<Tema>(() => (typeof document === 'undefined' ? TEMA_PADRAO : temaAplicado()))
  const reduzido = useReducedMotion()
  // Na montagem, o que vale é o guardado (o script da página já o aplicou; aqui é a garantia).
  useEffect(() => {
    const guardado = lerTemaGuardado()
    aplicarTema(guardado)
    setTema(guardado)
  }, [])
  const definir = useCallback(
    (novo: Tema) => {
      if (novo === temaAplicado()) {
        setTema(novo)
        return
      }
      animarTroca(reduzido)
      aplicarTema(novo)
      guardarTema(novo)
      setTema(novo)
    },
    [reduzido],
  )
  return [tema, definir]
}
