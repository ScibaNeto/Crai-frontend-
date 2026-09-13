import { prefersReducedMotion } from './useReducedMotion'

// Única exceção permitida de armazenamento: marcar que o preloader já rodou nesta sessão.
export const PRELOADER_KEY = 'crai:preloaded'

/** Só na primeira carga da sessão e nunca com movimento reduzido. */
export function deveMostrarPreloader() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false
  try {
    return window.sessionStorage.getItem(PRELOADER_KEY) !== '1'
  } catch {
    return false
  }
}

export function marcarPreloaderVisto() {
  try {
    window.sessionStorage.setItem(PRELOADER_KEY, '1')
  } catch {
    // sessionStorage indisponível (modo privado): o preloader apenas roda de novo na próxima carga
  }
}
