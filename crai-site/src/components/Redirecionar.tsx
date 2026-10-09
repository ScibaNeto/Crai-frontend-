import { useIsPresent } from 'framer-motion'
import { Navigate, useLocation, type NavigateProps } from 'react-router-dom'

/**
 * <Navigate> que não atropela uma navegação já em curso. Dois casos, os dois vistos no "Sair" em /pagamento
 * (o usuário ia para "/" e caía em /entrar):
 * - a página está na animação de saída: o AnimatePresence do App mantém a rota antiga montada por ~180 ms
 *   e ela continua reagindo à sessão e à URL novas;
 * - a URL já mudou, mas o React ainda não trocou de página (a troca de rota é uma transição de baixa
 *   prioridade; a mudança de sessão chega antes).
 */
export function Redirecionar(props: NavigateProps) {
  const presente = useIsPresent()
  const { pathname } = useLocation()
  const emTransito = window.location.pathname !== pathname
  return presente && !emTransito ? <Navigate {...props} /> : null
}
