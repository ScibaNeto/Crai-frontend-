import { createContext, useContext } from 'react'

/** false enquanto o preloader cobre a tela — animações de entrada esperam por ele. */
export const IntroContext = createContext(true)

export function useIntroReady() {
  return useContext(IntroContext)
}

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const
