import type { CSSProperties, ReactNode } from 'react'
import { IconBolt, IconCardFail, IconCheck, IconForecast, IconRefresh, IconScale, type IconProps } from '../components/icons/Icons'
import { Reveal } from '../components/motion/Reveal'
import { useConteudo } from '../lib/i18n'
import { cx } from '../lib/cx'

const ICONES: Array<(props: IconProps) => ReactNode> = [IconCardFail, IconScale, IconForecast, IconBolt]

interface TrilhoProps {
  /** Escalona o pulso para ele percorrer o caminho na ordem das etapas. */
  atraso?: number
  /** Vertical também no desktop — é a descida do ciclo para a confirmação. */
  vertical?: boolean
  className?: string
}

/** Trilho entre dois blocos. Vertical no mobile, horizontal no desktop; o pulso marca o sentido. */
function Trilho({ atraso = 0, vertical, className }: TrilhoProps) {
  const estilo = { '--pulse-delay': `${atraso}s` } as CSSProperties
  return (
    <div
      aria-hidden="true"
      className={cx('flex shrink-0 items-center justify-start py-2 pl-7 lg:justify-center lg:py-0 lg:pl-0', className)}
    >
      <span className={cx('flow-rail-y', vertical ? 'lg:h-full' : 'lg:hidden')} style={estilo} />
      {vertical ? null : <span className="flow-rail-x hidden lg:block" style={estilo} />}
    </div>
  )
}

interface EtapaProps {
  n: string
  titulo: string
  texto: string
  Icone: (props: IconProps) => ReactNode
  dentroDoCiclo?: boolean
}

/** Card de etapa: número e ícone no topo, título e descrição ancorados na base. */
function Etapa({ n, titulo, texto, Icone, dentroDoCiclo }: EtapaProps) {
  return (
    <div
      className={cx(
        'group flex h-full flex-col rounded-[12px] border p-4 transition-colors duration-300 lg:p-5',
        dentroDoCiclo ? 'border-orange/20 bg-ink/50 hover:border-orange/45' : 'border-line bg-slate/70 hover:border-silver/35',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="t-label tabular text-orange">{n}</span>
        <Icone size={22} className="text-silver transition-colors duration-300 group-hover:text-paper" />
      </div>
      <div className="mt-auto pt-10">
        <h3 className="t-h3 text-[17px] lg:text-[18px]">{titulo}</h3>
        <p className="t-apoio mt-2 text-silver">{texto}</p>
      </div>
    </div>
  )
}

/**
 * Fluxo de recuperação (10.4) — protagonista do Produto.
 * Etapas numeradas ligadas por um trilho com pulso; 03 e 04 ficam dentro do bloco de ciclo
 * (a nova rota reprocessa até achar a janela) e a confirmação é o ponto final, em destaque.
 * Desktop: 01, 02 e o ciclo na primeira linha, a confirmação logo abaixo dele. Mobile: timeline vertical.
 */
export function FluxoRecuperacao() {
  const { fluxo } = useConteudo().produto.recuperacao
  const { etapas, ciclo, resultado } = fluxo
  const [entrada, classificacao, janela, tentativa] = etapas

  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        {fluxo.titulo}. {fluxo.descricao}
      </figcaption>

      <ol className="grid grid-cols-1 lg:grid-cols-[1fr_36px_1fr_36px_2.2fr] lg:grid-rows-[auto_46px_auto]">
        {[entrada, classificacao].map((etapa, i) => (
          <li key={etapa.n} className="flex flex-col lg:contents">
            <Reveal delay={i * 0.08} className={cx('lg:row-start-1 lg:h-full', i === 0 ? 'lg:col-start-1' : 'lg:col-start-3')}>
              <Etapa n={etapa.n} titulo={etapa.titulo} texto={etapa.texto} Icone={ICONES[i]} />
            </Reveal>
            <Trilho atraso={i * 0.45} className={cx('lg:row-start-1', i === 0 ? 'lg:col-start-2' : 'lg:col-start-4')} />
          </li>
        ))}

        {/* 03 + 04 dentro do ciclo: é aqui que a nova rota reprocessa até achar a janela. */}
        <li className="flex flex-col lg:contents">
          <Reveal delay={0.16} className="lg:col-start-5 lg:row-start-1">
            <div className="hatch relative h-full rounded-[14px] border border-dashed border-orange/30 bg-orange/[0.035] p-3 lg:p-4">
              <div className="flex items-center gap-2 px-1 pb-3 text-orange">
                <IconRefresh size={15} className="flow-cycle" />
                <span className="t-label uppercase tracking-[0.16em]">{ciclo.rotulo}</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-stretch">
                {[janela, tentativa].map((etapa, i) => (
                  <div key={etapa.n} className="flex flex-col lg:flex-1 lg:flex-row lg:items-stretch">
                    <div className="lg:flex-1">
                      <Etapa n={etapa.n} titulo={etapa.titulo} texto={etapa.texto} Icone={ICONES[i + 2]} dentroDoCiclo />
                    </div>
                    {i === 0 ? <Trilho atraso={0.9} className="lg:w-8" /> : null}
                  </div>
                ))}
              </div>

              {/* Seta de retorno: o fim do ciclo volta para a etapa 03. */}
              <div className="mt-3 flex items-start gap-2.5 px-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 34 18"
                  className="mt-[2px] h-[16px] w-[34px] shrink-0 text-orange/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M32 2v5a5 5 0 0 1-5 5H4" />
                  <path d="M8 8.5 4 12l4 3.5" />
                </svg>
                <p className="t-apoio text-silver">{ciclo.texto}</p>
              </div>
            </div>
          </Reveal>
          <Trilho atraso={1.35} vertical className="lg:col-start-5 lg:row-start-2" />
        </li>

        {/* Ponto final: confirmação em destaque, na largura do ciclo. */}
        <li className="lg:col-span-5 lg:col-start-1 lg:row-start-3">
          <Reveal delay={0.24} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[14px] border border-orange/45 bg-[linear-gradient(120deg,rgba(239,147,17,0.16),rgba(26,18,10,0.6)_62%)] p-5 shadow-[0_0_70px_-34px_rgba(239,147,17,0.9)] lg:p-6">
              <span
                aria-hidden="true"
                className="motion-decor pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(255,184,108,0.22),transparent_70%)]"
              />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex-1">
                  <span className="t-label uppercase tracking-[0.16em] text-orange">{resultado.rotulo}</span>
                  <h3 className="t-h2 mt-3 text-[28px] lg:text-[32px]">{resultado.titulo}</h3>
                  <p className="t-apoio mt-2 text-silver">{resultado.texto}</p>
                </div>
                <div className="flex items-center gap-3 border-orange/25 sm:w-[170px] sm:shrink-0 sm:flex-col sm:items-start sm:gap-4 sm:border-l sm:pl-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange text-ink">
                    <IconCheck size={20} strokeWidth={2.1} />
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span className="relative flex size-2 shrink-0">
                      <span aria-hidden="true" className="motion-decor absolute inset-0 animate-ping rounded-full bg-orange/70" />
                      <span className="relative size-2 rounded-full bg-orange" />
                    </span>
                    <span className="t-label text-paper">{resultado.selo}</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </li>
      </ol>
    </figure>
  )
}
