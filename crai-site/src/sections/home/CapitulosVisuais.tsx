import { motion } from 'framer-motion'
import { useEffect, useId, useState } from 'react'
import { IconBolt, IconCalendar, IconCardFail, IconCheck, IconMessage, IconPlug, IconScale } from '../../components/icons/Icons'
import { cx } from '../../lib/cx'
import { useConteudo, useFormato, useLang } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'

/** Índice que avança sozinho enquanto `ativo` (etapa acendendo em sequência). */
function useCiclo(tamanho: number, ativo: boolean, ms = 1100) {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!ativo || reduced) return
    const id = window.setInterval(() => setI((n) => (n + 1) % (tamanho + 2)), ms)
    return () => window.clearInterval(id)
  }, [ativo, reduced, tamanho, ms])
  return reduced ? tamanho : i
}

const ICONES_REC = [IconPlug, IconScale, IconCalendar, IconBolt, IconMessage]

/** 01 — pipeline de recuperação: a falha entra, cada etapa acende, o pagamento sai recuperado. */
export function VisualRecuperacao({ ativo }: { ativo: boolean }) {
  const { capitulos } = useConteudo().home
  const f = useFormato()
  const passos = capitulos.itens[0].passos
  const passo = useCiclo(passos.length, ativo)
  const concluido = passo >= passos.length

  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6 md:p-8">
      <div className="flex items-center gap-3 rounded-[12px] border border-red/30 bg-red/[0.07] px-4 py-3 text-[14px]">
        <IconCardFail size={20} className="text-red-soft" />
        <span className="text-paper">{capitulos.visual.falha}</span>
        <span className="ml-auto text-[12px] text-silver tabular">{f.brl(100)}</span>
      </div>
      <ol className="flex flex-col">
        {passos.map((p, i) => {
          const Icon = ICONES_REC[i] ?? IconBolt
          const aceso = passo >= i
          return (
            <li key={p} className="flex flex-col items-start">
              <span className={cx('ml-[22px] flow-rail-y h-4', !aceso && 'opacity-40')} aria-hidden="true" />
              <div
                className={cx(
                  'flex w-full items-center gap-3 rounded-[12px] border px-4 py-2.5 transition-all duration-500',
                  aceso ? 'border-orange/45 bg-orange/[0.09]' : 'border-line bg-ink/40',
                  passo === i && 'shadow-[0_0_0_4px_rgba(239,147,17,0.12)]',
                )}
              >
                <span className={cx('grid h-7 w-7 place-items-center rounded-full transition-colors duration-500', aceso ? 'bg-orange text-on-accent' : 'bg-paper/10 text-silver')}>
                  <Icon size={15} />
                </span>
                <span className={cx('text-[14px] transition-colors duration-500', aceso ? 'text-paper' : 'text-silver')}>{p}</span>
                <span className="ml-auto text-[11px] text-silver tabular">0{i + 1}</span>
              </div>
            </li>
          )
        })}
      </ol>
      <motion.div
        className="mt-1 flex items-center gap-3 rounded-[12px] border border-green/35 bg-green/[0.08] px-4 py-3 text-[14px]"
        animate={{ opacity: concluido ? 1 : 0.25, scale: concluido ? 1 : 0.98 }}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
      >
        <motion.span
          className="grid h-6 w-6 place-items-center rounded-full bg-green text-on-accent"
          animate={{ scale: concluido ? [0.4, 1.18, 1] : 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <IconCheck size={14} />
        </motion.span>
        <span className="text-paper">{capitulos.visual.recuperado}</span>
        <span className="ml-auto text-[12px] text-green-soft tabular">+ {f.brl(100)}</span>
      </motion.div>
    </div>
  )
}

/** 02 — retenção: sinais chegam, o medidor de risco sobe, a oferta desliza. */
export function VisualRetencao({ ativo }: { ativo: boolean }) {
  const { visual } = useConteudo().home.capitulos
  const lang = useLang()
  const reduced = useReducedMotion()
  // Id único por instância: com "gauge" fixo, duas cópias na página disputavam o mesmo gradiente.
  const idGradiente = `gauge-${useId().replace(/:/g, '')}`
  const passo = useCiclo(visual.sinais.length + 1, ativo, 1300)
  const nSinais = Math.min(passo, visual.sinais.length)
  const score = [0.18, 0.46, 0.68, 0.82][nSinais] ?? 0.82
  const r = 70
  const comp = Math.PI * r
  const ofertaVisivel = passo >= visual.sinais.length + 1

  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 md:p-8">
      <div className="relative mx-auto w-full max-w-[260px]">
        <svg viewBox="0 0 180 100" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id={idGradiente} x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-green)" />
              <stop offset="0.55" stopColor="#ffb86c" />
              <stop offset="1" stopColor="#ef9311" />
            </linearGradient>
          </defs>
          <path d="M20 90 A70 70 0 0 1 160 90" fill="none" stroke="var(--color-silver)" strokeOpacity={0.16} strokeWidth="12" strokeLinecap="round" />
          <motion.path
            d="M20 90 A70 70 0 0 1 160 90"
            fill="none"
            stroke={`url(#${idGradiente})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={comp}
            animate={{ strokeDashoffset: comp * (1 - score) }}
            initial={false}
            transition={{ duration: reduced ? 0 : 0.9, ease: EASE_EXPO }}
          />
          <motion.line
            x1="90"
            y1="90"
            x2="90"
            y2="34"
            stroke="var(--color-paper)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ originX: 0.5, originY: 1 }}
            animate={{ rotate: -90 + score * 180 }}
            initial={false}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          />
          <circle cx="90" cy="90" r="6" fill="var(--color-paper)" />
        </svg>
        <div className="-mt-2 text-center">
          <p className="text-[12px] tracking-[0.08em] text-silver uppercase">{visual.risco}</p>
          <p className="text-[30px] font-[700] tracking-[-0.03em] text-paper tabular">
            {lang === 'pt' ? score.toFixed(2).replace('.', ',') : score.toFixed(2)}
            {nSinais === visual.sinais.length ? <span className="ml-2 align-middle text-[13px] font-[600] text-orange">{visual.riscoAlto}</span> : null}
          </p>
        </div>
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {visual.sinais.map((s, i) => (
          <motion.li
            key={s}
            className="rounded-full border border-line bg-ink/50 px-3 py-1.5 text-[12.5px] text-paper"
            animate={{ opacity: i < nSinais ? 1 : 0.25, y: i < nSinais ? 0 : 6 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
          >
            {s}
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="flex items-center gap-3 rounded-[12px] border border-orange/40 bg-orange/[0.08] px-4 py-3"
        animate={{ opacity: ofertaVisivel ? 1 : 0.2, x: ofertaVisivel ? 0 : 24 }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      >
        <IconMessage size={18} className="text-amber" />
        <span className="text-[14px] text-paper">{visual.oferta}</span>
      </motion.div>
    </div>
  )
}

const MESES = [
  { t: 0.34, c: 0.26 },
  { t: 0.52, c: 0.34 },
  { t: 0.7, c: 0.42 },
  { t: 0.88, c: 0.5 },
]

/** 03 — painel: barras tratado × controle crescem; a diferença é destacada como ganho incremental. */
export function VisualPainel({ ativo }: { ativo: boolean }) {
  const { visual } = useConteudo().home.capitulos
  const reduced = useReducedMotion()
  const mostrar = ativo || reduced
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6 md:p-8">
      <div className="flex items-center gap-4 text-[12px] text-silver">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-orange" />
          {visual.tratado}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-graphite" />
          {visual.controle}
        </span>
      </div>
      <div className="relative flex h-[220px] items-end gap-6 border-b border-line px-2" aria-hidden="true">
        {MESES.map((m, i) => (
          <div key={i} className="flex h-full flex-1 items-end gap-1.5">
            <motion.span
              className="w-full rounded-t-[6px] bg-gradient-to-t from-orange/70 to-amber"
              initial={{ height: reduced ? `${m.t * 100}%` : 0 }}
              animate={mostrar ? { height: `${m.t * 100}%` } : undefined}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE_EXPO }}
            />
            <motion.span
              className="w-full rounded-t-[6px] bg-graphite"
              initial={{ height: reduced ? `${m.c * 100}%` : 0 }}
              animate={mostrar ? { height: `${m.c * 100}%` } : undefined}
              transition={{ duration: 0.9, delay: 0.18 + i * 0.12, ease: EASE_EXPO }}
            />
          </div>
        ))}
        <motion.div
          className="absolute right-0 flex items-center gap-2"
          style={{ bottom: `${MESES[3].c * 100}%`, height: `${(MESES[3].t - MESES[3].c) * 100}%` }}
          initial={{ opacity: 0, x: 10 }}
          animate={mostrar ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE_EXPO }}
        >
          <span className="h-full w-2 rounded-r-[3px] border-y border-r border-amber" />
        </motion.div>
      </div>
      <motion.div
        className="flex items-center justify-between rounded-[12px] border border-orange/40 bg-orange/[0.08] px-4 py-3"
        initial={{ opacity: 0, y: 10 }}
        animate={mostrar ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE_EXPO }}
      >
        <span className="text-[14px] text-paper">{visual.ganho}</span>
        <span className="text-[14px] font-[650] text-amber">= {visual.tratado} − {visual.controle}</span>
      </motion.div>
    </div>
  )
}
