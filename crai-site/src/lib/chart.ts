export type Ponto = [number, number]

interface Escala {
  largura: number
  altura: number
  min: number
  max: number
  margemX?: number
  margemY?: number
}

export function escalarSerie(valores: number[], { largura, altura, min, max, margemX = 0, margemY = 0 }: Escala): Ponto[] {
  const passo = valores.length > 1 ? (largura - margemX * 2) / (valores.length - 1) : 0
  // Série constante (max === min) dividiria por zero e geraria NaN no SVG.
  const faixa = max - min || 1
  return valores.map((v, i) => [
    margemX + i * passo,
    margemY + (1 - (v - min) / faixa) * (altura - margemY * 2),
  ])
}

const r = (n: number) => Math.round(n * 100) / 100

/** Curva suave (Catmull-Rom → Bézier) passando por todos os pontos. */
export function caminhoSuave(pontos: Ponto[]) {
  if (pontos.length === 0) return ''
  let d = `M${r(pontos[0][0])} ${r(pontos[0][1])}`
  for (let i = 0; i < pontos.length - 1; i++) {
    const p0 = pontos[i - 1] ?? pontos[i]
    const p1 = pontos[i]
    const p2 = pontos[i + 1]
    const p3 = pontos[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(p2[0])} ${r(p2[1])}`
  }
  return d
}

/** Área fechada entre duas séries (topo no sentido de ida, base no sentido de volta). */
export function areaEntre(topo: Ponto[], base: Ponto[]) {
  const ida = caminhoSuave(topo)
  const volta = caminhoSuave([...base].reverse()).replace(/^M/, 'L')
  return `${ida} ${volta} Z`
}
