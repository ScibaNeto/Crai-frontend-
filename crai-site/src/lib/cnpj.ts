// Validação de CNPJ numérico e do CNPJ alfanumérico (Receita Federal, a partir de jul/2026).
// Mesma regra da função public.cnpj_valido do banco: cada caractere vale (código ASCII − 48).

const PESOS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const PESOS_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

/** Remove máscara e deixa em maiúsculas: "12.abc.345/01de-35" → "12ABC34501DE35". */
export function normalizarCNPJ(valor: string): string {
  return valor.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
}

function digitoVerificador(base: string, pesos: number[]): number {
  let soma = 0
  for (let i = 0; i < pesos.length; i++) soma += (base.charCodeAt(i) - 48) * pesos[i]
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

export function cnpjValido(valor: string): boolean {
  const d = normalizarCNPJ(valor)
  if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(d) || /^(.)\1{13}$/.test(d)) return false
  if (digitoVerificador(d, PESOS_1) !== Number(d[12])) return false
  return digitoVerificador(d, PESOS_2) === Number(d[13])
}
