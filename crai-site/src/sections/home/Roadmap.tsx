import { motion } from 'framer-motion'
import { cx } from '../../lib/cx'
import { useConteudo } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { CabecalhoSecao } from './CabecalhoSecao'

/** Linha do tempo que se desenha até o "agora" (SVGator: line/self-drawing animation). */
export function Roadmap() {
  const { roadmap } = useConteudo().home
  const reduced = useReducedMotion()
  const n = roadmap.etapas.length
  const iAgora = Math.max(0, roadmap.etapas.findIndex((e) => e.estado === 'agora'))
  const progresso = ((iAgora + 0.5) / n) * 100

  return (
    <section className="section-y relative overflow-hidden border-t border-line" aria-labelledby="roadmap-titulo">
      <div className="container-site">
        <CabecalhoSecao id="roadmap-titulo" eyebrow={roadmap.eyebrow} titulo={roadmap.titulo} />

        <div className="relative mt-14 lg:mt-20">
          {/* Trilho horizontal (desktop) */}
          <div aria-hidden="true" className="absolute top-[9px] right-0 left-0 hidden h-px bg-[repeating-linear-gradient(90deg,rgba(166,170,173,0.35)_0_6px,transparent_6px_12px)] lg:block" />
          <motion.div
            aria-hidden="true"
            className="absolute top-[8.5px] left-0 hidden h-[2px] bg-gradient-to-r from-orange/40 to-orange lg:block"
            style={{ width: `${progresso}%`, transformOrigin: '0 50%' }}
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE_EXPO }}
          />
          {/* Trilho vertical (mobile) */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[8.5px] w-px bg-line lg:hidden" />

          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {roadmap.etapas.map((e, i) => (
              <motion.li
                key={e.quando}
                className="relative pl-10 lg:pl-0"
                initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.2 + i * 0.12, ease: EASE_EXPO }}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'timeline-dot absolute top-0 left-0 lg:static',
                    e.estado === 'feito' && 'timeline-dot--done',
                    e.estado === 'agora' && 'timeline-dot--now',
                  )}
                />
                <p className={cx('mt-0 text-[13px] font-[600] tabular lg:mt-6', e.estado === 'depois' ? 'text-silver' : 'text-amber')}>
                  {e.quando}
                  {e.estado === 'agora' ? (
                    <span className="ml-2 rounded-full bg-orange px-2 py-0.5 text-[11px] font-[700] text-ink">{roadmap.agora}</span>
                  ) : null}
                </p>
                <h3 className={cx('mt-2 text-[18px] font-[600] tracking-[-0.01em]', e.estado === 'depois' ? 'text-paper/80' : 'text-paper')}>
                  {e.titulo}
                </h3>
                <p className="t-apoio mt-2 text-silver">{e.texto}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
