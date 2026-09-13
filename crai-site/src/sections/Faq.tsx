import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IconPlus } from '../components/icons/Icons'
import { planosPagina } from '../data/conteudo'
import { EASE_EXPO } from '../lib/intro'

/** Accordion com microinteração (10.7): + gira 45° e vira ×; altura animada. */
export function Faq() {
  const { faq } = planosPagina
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <section className="container-site section-y border-t border-line" aria-labelledby="faq-titulo">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 id="faq-titulo" className="t-h2 lg:col-span-4">
          {faq.titulo}
        </h2>
        <ul className="border-t border-line lg:col-span-8">
          {faq.itens.map((item, i) => {
            const open = aberto === i
            const botaoId = `faq-botao-${i}`
            const painelId = `faq-painel-${i}`
            return (
              <motion.li key={item.pergunta} layout="position" className="border-b border-line">
                <h3>
                  <button
                    id={botaoId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={painelId}
                    onClick={() => setAberto(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 rounded-[4px] py-5 text-left text-[17px] font-[540] text-paper transition-colors hover:text-amber focus-visible:outline-offset-2"
                  >
                    <span>{item.pergunta}</span>
                    <motion.span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] border border-line text-silver"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_EXPO }}
                    >
                      <IconPlus size={18} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={painelId}
                      role="region"
                      aria-labelledby={botaoId}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: EASE_EXPO }}
                    >
                      <p className="t-body measure pb-6 text-silver">{item.resposta}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
