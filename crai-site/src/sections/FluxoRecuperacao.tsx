import { SelfDrawingSvg } from '../components/motion/SelfDrawingSvg'
import { produto } from '../data/conteudo'

interface NoProps {
  x: number
  y: number
  w: number
  h: number
  linhas: string[]
  passo: number
  destaque?: boolean
}

function No({ x, y, w, h, linhas, passo, destaque }: NoProps) {
  const cx = x + w / 2
  const cy = y + h / 2
  const baseY = linhas.length === 1 ? cy + 5 : cy - 5
  return (
    <g>
      <rect
        data-draw={passo}
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={destaque ? 'rgba(239,147,17,0.06)' : 'rgba(26,18,10,0.5)'}
        stroke={destaque ? 'var(--color-orange)' : 'var(--color-graphite)'}
        strokeWidth={1.5}
      />
      <text
        data-fade={passo + 1}
        x={cx}
        y={baseY}
        textAnchor="middle"
        fill="var(--color-paper)"
        fontSize={15}
        fontWeight={500}
        fontFamily="inherit"
      >
        {linhas.map((linha, i) => (
          <tspan key={linha} x={cx} dy={i === 0 ? 0 : 20}>
            {linha}
          </tspan>
        ))}
      </text>
    </g>
  )
}

const conector = {
  stroke: 'var(--color-silver)',
  strokeWidth: 1.5,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Diagrama auto-desenhado (10.4) — protagonista do Produto. Horizontal no desktop, vertical no mobile. */
export function FluxoRecuperacao() {
  const { fluxo } = produto.recuperacao
  const { nos } = fluxo

  return (
    <>
      <SelfDrawingSvg
        viewBox="-4 -4 1008 300"
        className="hidden h-auto w-full md:block"
        title={fluxo.titulo}
        description={fluxo.descricao}
        duration={520}
        stagger={170}
      >
        <No x={0} y={118} w={170} h={64} linhas={nos.falha} passo={0} />
        <path data-draw={1} d="M174 150 H206 M200 144.5 L206 150 L200 155.5" {...conector} />
        <No x={210} y={118} w={170} h={64} linhas={nos.motivo} passo={2} />
        <path data-draw={3} d="M384 150 H416 M410 144.5 L416 150 L410 155.5" {...conector} />
        <No x={420} y={118} w={170} h={64} linhas={nos.janela} passo={4} />
        <path data-draw={5} d="M594 150 H626 M620 144.5 L626 150 L620 155.5" {...conector} />
        <No x={630} y={118} w={170} h={64} linhas={nos.tentativa} passo={6} />
        <path data-draw={7} d="M804 150 C828 150 824 76 846 76 M840 70.5 L846 76 L840 81.5" {...conector} />
        <path data-draw={7} d="M804 150 C828 150 824 224 846 224 M840 218.5 L846 224 L840 229.5" {...conector} />
        <No x={850} y={50} w={150} h={52} linhas={nos.confirmacao} passo={8} destaque />
        <No x={850} y={198} w={150} h={52} linhas={nos.rota} passo={8} />
        <path data-draw={9} d="M925 254 V284 H505 V188 M499.5 194 L505 188 L510.5 194" {...conector} stroke="var(--color-graphite)" />
      </SelfDrawingSvg>

      <SelfDrawingSvg
        viewBox="-4 -4 328 548"
        className="mx-auto block h-auto w-full max-w-[360px] md:hidden"
        title={fluxo.titulo}
        description={fluxo.descricao}
        duration={480}
        stagger={150}
      >
        <No x={50} y={0} w={220} h={60} linhas={nos.falha} passo={0} />
        <path data-draw={1} d="M160 64 V98 M154.5 92 L160 98 L165.5 92" {...conector} />
        <No x={50} y={104} w={220} h={60} linhas={nos.motivo} passo={2} />
        <path data-draw={3} d="M160 168 V202 M154.5 196 L160 202 L165.5 196" {...conector} />
        <No x={50} y={208} w={220} h={60} linhas={nos.janela} passo={4} />
        <path data-draw={5} d="M160 272 V306 M154.5 300 L160 306 L165.5 300" {...conector} />
        <No x={50} y={312} w={220} h={60} linhas={nos.tentativa} passo={6} />
        <path data-draw={7} d="M160 376 C160 406 75 406 75 434 M69.5 428 L75 434 L80.5 428" {...conector} />
        <path data-draw={7} d="M160 376 C160 406 245 406 245 434 M239.5 428 L245 434 L250.5 428" {...conector} />
        <No x={0} y={438} w={150} h={52} linhas={nos.confirmacao} passo={8} destaque />
        <No x={170} y={438} w={150} h={52} linhas={nos.rota} passo={8} />
        <path data-draw={9} d="M245 494 V532 H316 V238 H276 M282 232.5 L276 238 L282 243.5" {...conector} stroke="var(--color-graphite)" />
      </SelfDrawingSvg>
    </>
  )
}
