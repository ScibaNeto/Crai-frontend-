import type { Lang } from './lang'
import { normalizarSiteUrl } from './site'

export const SITE_URL = normalizarSiteUrl(import.meta.env.VITE_SITE_URL)

interface MetaPagina {
  titulo: string
  descricao: string
  /** Caminho canônico, ex.: '/planos'. */
  caminho: string
  indexar: boolean
  lang: Lang
}

/** Garante uma tag no <head> e devolve ela. */
function tagHead<K extends 'meta' | 'link'>(tag: K, seletor: string, atributos: Record<string, string>) {
  let el = document.head.querySelector<HTMLElementTagNameMap[K]>(seletor)
  if (!el) {
    el = document.createElement(tag)
    for (const [nome, valor] of Object.entries(atributos)) el.setAttribute(nome, valor)
    document.head.appendChild(el)
  }
  return el
}

function meta(atributo: 'name' | 'property', nome: string, conteudo: string) {
  tagHead('meta', `meta[${atributo}="${nome}"]`, { [atributo]: nome }).setAttribute('content', conteudo)
}

/**
 * Atualiza título, descrição, canonical, robots e Open Graph da página atual.
 * O Google executa o JS e lê estes valores; WhatsApp e LinkedIn não, e ficam com os padrões do index.html.
 */
export function aplicarSeo({ titulo, descricao, caminho, indexar, lang }: MetaPagina) {
  const url = `${SITE_URL}${caminho === '/' ? '/' : caminho}`
  document.title = titulo
  meta('name', 'description', descricao)
  meta('name', 'robots', indexar ? 'index, follow' : 'noindex, nofollow')
  meta('property', 'og:title', titulo)
  meta('property', 'og:description', descricao)
  meta('property', 'og:url', url)
  // Acompanha o idioma escolhido (antes ficava sempre pt_BR).
  meta('property', 'og:locale', lang === 'en' ? 'en_US' : 'pt_BR')
  meta('property', 'og:locale:alternate', lang === 'en' ? 'pt_BR' : 'en_US')
  tagHead('link', 'link[rel="canonical"]', { rel: 'canonical' }).setAttribute('href', url)
}
