import { LANG_LOCALE, type Lang } from './lang'

// Moeda é sempre BRL nos dois idiomas (a operação é brasileira). O idioma muda só o locale do Intl:
// separador decimal, agrupamento e ordem da data curta.

export interface Formatadores {
  /** R$ 1.234,56 · R$1,234.56 */
  brl: (valor: number) => string
  /** Sem centavos, arredondado. */
  brlInteiro: (valor: number) => string
  numero: (valor: number) => string
  percent: (valor: number, casas?: number) => string
  /** Percentual que já vem em pontos (ex.: 54.6 → "54,6%" / "54.6%"). */
  pontos: (valor: number, casas?: number) => string
  /** Dia e mês numéricos (14/08 · 08/14). */
  dataCurta: (data: Date) => string
}

const cache = new Map<Lang, Formatadores>()

export function criarFormatadores(lang: Lang): Formatadores {
  const pronto = cache.get(lang)
  if (pronto) return pronto

  const locale = LANG_LOCALE[lang]
  const brl = new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' })
  const brlInteiro = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const numero = new Intl.NumberFormat(locale)
  const dataCurta = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit' })
  const percentCache = new Map<number, Intl.NumberFormat>()
  const pontosCache = new Map<number, Intl.NumberFormat>()

  const f: Formatadores = {
    brl: (valor) => brl.format(valor),
    brlInteiro: (valor) => brlInteiro.format(Math.round(valor)),
    numero: (valor) => numero.format(Math.round(valor)),
    percent: (valor, casas = 0) => {
      let nf = percentCache.get(casas)
      if (!nf) {
        nf = new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: casas, maximumFractionDigits: casas })
        percentCache.set(casas, nf)
      }
      return nf.format(valor)
    },
    pontos: (valor, casas = 1) => {
      let nf = pontosCache.get(casas)
      if (!nf) {
        nf = new Intl.NumberFormat(locale, { minimumFractionDigits: casas, maximumFractionDigits: casas })
        pontosCache.set(casas, nf)
      }
      return `${nf.format(valor)}%`
    },
    dataCurta: (data) => dataCurta.format(data),
  }
  cache.set(lang, f)
  return f
}

// Máscaras de entrada: independem de idioma (CNPJ, CPF e telefone são formatos brasileiros).

export function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, '')
}

function aplicarMascara(digitos: string, padrao: string) {
  let i = 0
  let saida = ''
  for (const ch of padrao) {
    if (i >= digitos.length) break
    if (ch === '#') saida += digitos[i++]
    else saida += ch
  }
  return saida
}

/** Aceita também o CNPJ alfanumérico (letras nas 12 primeiras posições, em maiúsculas). */
export function formatCNPJ(valor: string) {
  return aplicarMascara(valor.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 14), '##.###.###/####-##')
}

export function formatCPF(valor: string) {
  return aplicarMascara(somenteDigitos(valor).slice(0, 11), '###.###.###-##')
}

/** CPF até 11 dígitos; CNPJ acima disso ou quando há letras (CNPJ alfanumérico). */
export function formatDocumento(valor: string) {
  const bruto = valor.replace(/[^A-Za-z0-9]/g, '')
  return bruto.length > 11 || /[A-Za-z]/.test(bruto) ? formatCNPJ(bruto) : formatCPF(bruto)
}

export function formatTelefone(valor: string) {
  const d = somenteDigitos(valor).slice(0, 11)
  return aplicarMascara(d, d.length > 10 ? '(##) #####-####' : '(##) ####-####')
}

/** Converte o texto digitado num campo de moeda em reais (os dígitos são tratados como centavos). */
export function parseMoeda(valor: string) {
  const d = somenteDigitos(valor)
  return d ? Number(d) / 100 : 0
}
