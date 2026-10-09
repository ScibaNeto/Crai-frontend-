/* oxlint-disable react/only-export-components -- provider e hooks no mesmo arquivo por decisão de projeto; só afeta Fast Refresh deste arquivo. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { conteudoPt, type Conteudo } from '../data/conteudo.pt'
import { criarFormatadores, type Formatadores } from './format'
import { isLang, LANG_HTML, LANG_PADRAO, type Lang } from './lang'

// Segunda exceção de armazenamento (a primeira é o preloader): o idioma escolhido. Fica no localStorage para
// valer também em outra aba (os links dos Termos e da Política no cadastro abrem em aba nova) e na próxima visita.
// ⚠️ Mudou onde ou por quanto tempo isso fica guardado? Atualize a tabela da seção 11 da Política (data/legal.*.ts).
export const LANG_KEY = 'crai:lang'

const CONTEUDO: Partial<Record<Lang, Conteudo>> = { pt: conteudoPt }

/** O inglês (~60 kB) só é baixado por quem escolhe inglês. */
export async function carregarConteudo(lang: Lang): Promise<void> {
  if (lang === 'en' && !CONTEUDO.en) CONTEUDO.en = (await import('../data/conteudo.en')).conteudoEn
}

/** Idioma da primeira renderização: o salvo, desde que o texto dele já tenha chegado (senão, português). */
function idiomaInicial(): Lang {
  const salvo = lerIdiomaSalvo()
  return CONTEUDO[salvo] ? salvo : LANG_PADRAO
}

export function lerIdiomaSalvo(): Lang {
  if (typeof window === 'undefined') return LANG_PADRAO
  try {
    const salvo = window.localStorage.getItem(LANG_KEY)
    return isLang(salvo) ? salvo : LANG_PADRAO
  } catch {
    return LANG_PADRAO
  }
}

function salvarIdioma(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_KEY, lang)
  } catch {
    // localStorage indisponível (modo privado): o idioma vale até recarregar a página.
  }
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  conteudo: Conteudo
  formato: Formatadores
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(idiomaInicial)

  useEffect(() => {
    document.documentElement.lang = LANG_HTML[lang]
  }, [lang])

  const setLang = useCallback((proximo: Lang) => {
    // Só troca (e só guarda a escolha) depois que o texto do idioma chegou; sem rede, o site segue no idioma atual.
    carregarConteudo(proximo)
      .then(() => {
        setLangState(proximo)
        salvarIdioma(proximo)
      })
      .catch(() => {})
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, conteudo: CONTEUDO[lang] ?? conteudoPt, formato: criarFormatadores(lang) }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

function useLanguageContext() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useConteudo/useLang precisam de <LanguageProvider> acima na árvore.')
  return ctx
}

/** Idioma atual. */
export function useLang() {
  return useLanguageContext().lang
}

/** Troca de idioma (a escolha fica guardada no navegador). */
export function useSetLang() {
  return useLanguageContext().setLang
}

/** Objeto de copy do idioma atual. */
export function useConteudo() {
  return useLanguageContext().conteudo
}

/** Formatadores de número, moeda e data do idioma atual. */
export function useFormato() {
  return useLanguageContext().formato
}
