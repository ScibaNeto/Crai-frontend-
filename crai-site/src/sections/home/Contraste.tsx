import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { IconCheck, IconClose } from '../../components/icons/Icons'
import { Reveal } from '../../components/motion/Reveal'
import { Spotlight } from '../../components/motion/Spotlight'
import { cx } from '../../lib/cx'
import { useConteudo } from '../../lib/i18n'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { CabecalhoSecao } from './CabecalhoSecao'

const DIAS = 20
const JANELA = { de: 9, ate: 11 } // janela de liquidez ilustrativa
const FIXAS = [1, 3, 5, 7]
const CRAI = [10]
const VARREDURA = 2.6 // segundos para a agulha cruzar o mês

function Linha({ tentativas, ok, rotulo, titulo, texto, destaque }: { tentativas: number[]; ok: boolean; rotulo: string; titulo: string; texto: string; destaque?: boolean }) {
  const { contraste } = useConteudo().home
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.5 })
  const rodar = visto && !reduced
  const quando = (dia: number) => (reduced ? 0 : ((dia - 0.5) / DIAS) * VARREDURA)

  return (
    <Spotlight className={cx('rounded-[18px] border p-6 md:p-8', destaque ? 'border-orange/40 bg-orange/[0.05]' : 'border-line bg-slate/40')}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className={cx('text-[12.5px] font-[650] tracking-[0.14em] uppercase', destaque ? 'text-amber' : 'text-silver')}>{rotulo}</p>
        <p aria-hidden="true" className="text-[12px] text-silver tabular">
          {tentativas.length}× {ok ? '✓' : '✕'}
        </p>
      </div>
      <h3 className="t-h3 mt-3">{titulo}</h3>
      <p className="t-apoio mt-2 text-silver md:text-[15px]">{texto}</p>

      <div ref={ref} className="relative mt-14" aria-hidden="true">
        {/* janela de liquidez */}
        <div
          className="absolute -top-6 bottom-0 rounded-[8px] border border-dashed border-amber/50 bg-amber/[0.08]"
          style={{ left: `${((JANELA.de - 1) / DIAS) * 100}%`, width: `${((JANELA.ate - JANELA.de + 1) / DIAS) * 100}%` }}
        >
          <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full text-[10.5px] whitespace-nowrap text-amber">
            {contraste.janela}
          </span>
        </div>
        <div className="relative grid h-12 items-center" style={{ gridTemplateColumns: `repeat(${DIAS}, minmax(0, 1fr))` }}>
          {Array.from({ length: DIAS }, (_, i) => {
            const dia = i + 1
            const tentou = tentativas.includes(dia)
            return (
              <div key={dia} className="flex justify-center">
                {tentou ? (
                  <motion.span
                    className={cx(
                      'grid h-7 w-7 place-items-center rounded-full md:h-8 md:w-8',
                      ok ? 'bg-green text-on-accent' : 'bg-red/90 text-on-accent',
                    )}
                    initial={reduced ? false : { scale: 0, opacity: 0 }}
                    animate={rodar ? (ok ? { scale: [0, 1.25, 1], opacity: 1 } : { scale: [0, 1.15, 1], opacity: 1, x: [0, -3, 3, -2, 0] }) : undefined}
                    transition={{ duration: 0.55, delay: quando(dia) }}
                  >
                    {ok ? <IconCheck size={15} /> : <IconClose size={14} />}
                  </motion.span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-paper/15" />
                )}
              </div>
            )
          })}
          {/* agulha que percorre os dias */}
          {reduced ? null : (
            <motion.span
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-paper/70 to-transparent"
              initial={{ left: '0%', opacity: 0 }}
              animate={rodar ? { left: '100%', opacity: [0, 1, 1, 0] } : undefined}
              transition={{ duration: VARREDURA, ease: 'linear' }}
            />
          )}
        </div>
        <div className="mt-2 flex justify-between text-[10.5px] text-silver tabular">
          <span>
            {contraste.dia} 1
          </span>
          <span>
            {contraste.dia} {DIAS}
          </span>
        </div>
      </div>
    </Spotlight>
  )
}

/** Contraste régua fixa × CRAI (IrisFlow: seção "contraste"; SVGator: microinterações em sequência). */
export function Contraste() {
  const { contraste } = useConteudo().home
  return (
    <section className="section-y relative overflow-hidden border-t border-line" aria-labelledby="contraste-titulo">
      <div className="container-site">
        <CabecalhoSecao id="contraste-titulo" eyebrow={contraste.eyebrow} titulo={contraste.titulo} lead={contraste.lead} />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Linha tentativas={FIXAS} ok={false} {...contraste.fixa} />
          </Reveal>
          <Reveal delay={0.12}>
            <Linha tentativas={CRAI} ok {...contraste.crai} destaque />
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="t-apoio mt-6 text-silver">{contraste.nota}</p>
        </Reveal>
      </div>
    </section>
  )
}
