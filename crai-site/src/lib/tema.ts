import { useSyncExternalStore } from 'react'

export type Tema = 'escuro' | 'claro'

/** O site nasceu escuro: é o tema de quem ainda não escolheu. */
export const TEMA_PADRAO: Tema = 'escuro'

// Terceira exceção de armazenamento (depois do preloader e do idioma): o tema escolhido, só por sessão.
// O script do index.html lê a mesma chave para aplicar o tema antes da primeira pintura.
export const TEMA_KEY = 'crai:tema'

/** Cor da barra do navegador no celular (`<meta name="theme-color">`): o fundo de cada tema. */
const COR_BARRA: Record<Tema, string> = { escuro: '#1A120A', claro: '#FAF6EF' }

function isTema(valor: unknown): valor is Tema {
  return valor === 'escuro' || valor === 'claro'
}

function lerTemaSalvo(): Tema {
  if (typeof window === 'undefined') return TEMA_PADRAO
  try {
    const salvo = window.sessionStorage.getItem(TEMA_KEY)
    return isTema(salvo) ? salvo : TEMA_PADRAO
  } catch {
    return TEMA_PADRAO
  }
}

/** O CSS do tema claro vive em `:root[data-theme='light']` (index.css); o escuro é o padrão, sem atributo. */
function aplicarTema(tema: Tema) {
  const raiz = document.documentElement
  if (tema === 'claro') raiz.dataset.theme = 'light'
  else delete raiz.dataset.theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COR_BARRA[tema])
}

let temaAtual: Tema = lerTemaSalvo()
const ouvintes = new Set<() => void>()

if (typeof document !== 'undefined') aplicarTema(temaAtual)

export function definirTema(tema: Tema) {
  if (tema === temaAtual) return
  temaAtual = tema
  aplicarTema(tema)
  try {
    window.sessionStorage.setItem(TEMA_KEY, tema)
  } catch {
    // sessionStorage indisponível (modo privado): o tema vale até recarregar a página.
  }
  ouvintes.forEach((avisar) => avisar())
}

export function alternarTema() {
  definirTema(temaAtual === 'claro' ? 'escuro' : 'claro')
}

function assinar(avisar: () => void) {
  ouvintes.add(avisar)
  return () => {
    ouvintes.delete(avisar)
  }
}

/** Tema atual; o componente re-renderiza quando ele muda. */
export function useTema(): Tema {
  return useSyncExternalStore(
    assinar,
    () => temaAtual,
    () => TEMA_PADRAO,
  )
}
