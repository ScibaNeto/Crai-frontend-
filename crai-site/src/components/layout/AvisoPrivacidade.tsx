import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DOCUMENTOS_LEGAIS } from '../../data/institucional'
import { useConteudo } from '../../lib/i18n'
import { EASE_EXPO, useIntroReady } from '../../lib/intro'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { Button } from '../ui/Button'
import { TextoRico } from '../ui/TextoRico'

// Quarta exceção de armazenamento (depois do preloader, do idioma e do tema): a versão dos documentos que a
// pessoa já viu no aviso. Fica no localStorage para o aviso não voltar a cada visita.
// ⚠️ Está descrito na tabela da seção 11 da Política de Privacidade (data/legal.*.ts): mudou aqui, mude lá.
export const AVISO_KEY = 'crai:aviso-privacidade'

/** Páginas com faixa fixa própria no rodapé da tela: o aviso ficaria por cima dela. */
const SEM_AVISO = new Set(['/pagamento'])

function jaViuEstaVersao() {
  try {
    return window.localStorage.getItem(AVISO_KEY) === DOCUMENTOS_LEGAIS.versao
  } catch {
    // Armazenamento bloqueado (modo privado): o aviso aparece a cada carregamento e some ao ser fechado.
    return false
  }
}

/**
 * Aviso de cookies e privacidade, no canto inferior da tela.
 *
 * O site não usa cookies nem ferramentas de análise ou publicidade (só o armazenamento estritamente necessário,
 * listado na Política), então isto é um aviso de ciência, e não um pedido de consentimento: não bloqueia a
 * página, não tem "recusar" e nada depende dele. Se um dia entrar analytics, este componente passa a pedir
 * consentimento antes de carregar o script (LGPD, art. 7º, I).
 *
 * Volta a aparecer quando a versão dos documentos muda (data/institucional.ts).
 */
export function AvisoPrivacidade() {
  const { avisoPrivacidade: aviso } = useConteudo().site
  const { pathname } = useLocation()
  const pronto = useIntroReady()
  const reduced = useReducedMotion()
  const [visto, setVisto] = useState(jaViuEstaVersao)

  function fechar() {
    try {
      window.localStorage.setItem(AVISO_KEY, DOCUMENTOS_LEGAIS.versao)
    } catch {
      // Sem armazenamento: vale só para esta página.
    }
    setVisto(true)
    // O botão some junto com o aviso: o foco vai para o conteúdo, e não para o início do documento.
    document.getElementById('conteudo')?.focus({ preventScroll: true })
  }

  const mostrar = pronto && !visto && !SEM_AVISO.has(pathname.replace(/\/+$/, '') || '/')

  return (
    <AnimatePresence>
      {mostrar ? (
        <motion.section
          aria-label={aviso.aria}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px] print:hidden"
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 10 }}
          transition={{ duration: reduced ? 0.12 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE_EXPO }}
        >
          <div className="rounded-[18px] border border-line bg-slate p-5 shadow-[0_18px_50px_-18px_var(--color-shadow)]">
            <p className="text-[15px] leading-[1.35] font-[600] text-paper">{aviso.titulo}</p>
            <p className="t-apoio mt-2 text-silver">
              <TextoRico texto={aviso.texto} />
            </p>
            <div className="mt-4 flex justify-end">
              <Button size="sm" className="rounded-full" onClick={fechar}>
                {aviso.aceitar}
              </Button>
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  )
}
