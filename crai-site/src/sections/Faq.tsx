import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IconPlus } from '../components/icons/Icons'
import { RevealWords } from '../components/motion/Reveal'
import { useConteudo } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'

type FaqDados = ReturnType<typeof useConteudo>['planosPagina']['faq']

/** Accordion com microinteração (10.7): + gira 45° e vira ×; altura animada. Home passa as próprias perguntas. */
export function Faq({ dados, id = 'faq' }: { dados?: FaqDados; id?: string } = {}) {
  const padrao = useConteudo().planosPagina.faq
  const faq = dados ?? padrao
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <section className="container-site section-y border-t border-line" aria-labelledby={`${id}-titulo`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <RevealWords id={`${id}-titulo`} as="h2" noScroll texto={faq.titulo} className="t-h2 lg:col-span-4" />
        <ul className="border-t border-line lg:col-span-8">
          {faq.itens.map((item, i) => {
            const open = aberto === i
            const botaoId = `${id}-botao-${i}`
            const painelId = `${id}-painel-${i}`
            return (
              <motion.li key={item.pergunta} layout="position" className="border-b border-line">
                <h3>
                  <button
                    id={botaoId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={painelId}
                    onClick={() => setAberto(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 rounded-[4px] py-6 text-left font-display text-[19px] leading-[1.3] text-paper md:text-[22px] transition-colors hover:text-amber focus-visible:outline-offset-2"
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
                      <motion.p
                        className="t-body measure pb-6 text-silver"
                        initial={{ y: 12 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.4, ease: EASE_EXPO }}
                      >
                        {item.resposta}
                      </motion.p>
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
