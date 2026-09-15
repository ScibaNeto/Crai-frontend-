export type Lang = 'pt' | 'en'

export const LANG_PADRAO: Lang = 'pt'

/** Valor de `<html lang>` por idioma. */
export const LANG_HTML: Record<Lang, string> = { pt: 'pt-BR', en: 'en' }

/** Locale do `Intl` por idioma. A moeda é sempre BRL; só muda separador e agrupamento. */
export const LANG_LOCALE: Record<Lang, string> = { pt: 'pt-BR', en: 'en-US' }

export function isLang(valor: unknown): valor is Lang {
  return valor === 'pt' || valor === 'en'
}
