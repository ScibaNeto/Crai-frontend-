/* oxlint-disable react/only-export-components -- provider e hooks no mesmo arquivo por decisão de projeto (CRAI-SITE-ALTERACOES.md, frente 1); só afeta Fast Refresh deste arquivo. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { conteudoEn } from '../data/conteudo.en'
import { conteudoPt, type Conteudo } from '../data/conteudo.pt'
import { criarFormatadores, type Formatadores } from './format'
import { isLang, LANG_HTML, LANG_PADRAO, type Lang } from './lang'

// Segunda exceção de armazenamento (a primeira é o preloader): o idioma escolhido, só por sessão.
export const LANG_KEY = 'crai:lang'

const CONTEUDO: Record<Lang, Conteudo> = { pt: conteudoPt, en: conteudoEn }

function lerIdiomaSalvo(): Lang {
  if (typeof window === 'undefined') return LANG_PADRAO
  try {
    const salvo = window.sessionStorage.getItem(LANG_KEY)
    return isLang(salvo) ? salvo : LANG_PADRAO
  } catch {
    return LANG_PADRAO
  }
}

function salvarIdioma(lang: Lang) {
  try {
    window.sessionStorage.setItem(LANG_KEY, lang)
  } catch {
    // sessionStorage indisponível (modo privado): o idioma vale até recarregar a página.
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
  const [lang, setLangState] = useState<Lang>(lerIdiomaSalvo)

  useEffect(() => {
    document.documentElement.lang = LANG_HTML[lang]
  }, [lang])

  const setLang = useCallback((proximo: Lang) => {
    setLangState(proximo)
    salvarIdioma(proximo)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, conteudo: CONTEUDO[lang], formato: criarFormatadores(lang) }),
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

/** Troca de idioma (persistida na sessão). */
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
