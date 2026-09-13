export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

/** Troca {chave} pelo valor correspondente. */
export function interpolar(modelo: string, valores: Record<string, string | number>) {
  return modelo.replace(/\{(\w+)\}/g, (_, chave: string) => String(valores[chave] ?? ''))
}
