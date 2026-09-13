const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const brlInteiro = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const numero = new Intl.NumberFormat('pt-BR')

export function formatBRL(valor: number) {
  return brl.format(valor)
}

export function formatBRLInteiro(valor: number) {
  return brlInteiro.format(Math.round(valor))
}

export function formatNumero(valor: number) {
  return numero.format(Math.round(valor))
}

export function formatPercent(valor: number, casas = 0) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  }).format(valor)
}

/** Percentual que já vem em pontos (ex.: 54.6 → "54,6%"). */
export function formatPontos(valor: number, casas = 1) {
  return `${valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`
}

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

export function formatCNPJ(valor: string) {
  return aplicarMascara(somenteDigitos(valor).slice(0, 14), '##.###.###/####-##')
}

export function formatCPF(valor: string) {
  return aplicarMascara(somenteDigitos(valor).slice(0, 11), '###.###.###-##')
}

/** CPF até 11 dígitos, CNPJ acima disso. */
export function formatDocumento(valor: string) {
  const d = somenteDigitos(valor)
  return d.length <= 11 ? formatCPF(d) : formatCNPJ(d)
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
