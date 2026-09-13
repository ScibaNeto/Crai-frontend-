import { RevealWords } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { naoEncontrada } from '../data/conteudo'
import { useIntroReady } from '../lib/intro'
import { useReducedMotion } from '../lib/useReducedMotion'

// Dois estados do blob com os mesmos comandos (M + 4 C + Z), alternados por <animate> em 6s (10.14).
const BLOB_A = 'M200 60 C280 55 345 110 340 190 C335 275 290 340 205 345 C120 350 55 290 60 200 C65 120 120 65 200 60 Z'
const BLOB_B = 'M210 72 C300 70 335 135 348 205 C360 285 280 335 190 338 C100 340 62 280 52 192 C44 110 120 74 210 72 Z'

export function NotFound() {
  const reduced = useReducedMotion()
  const ready = useIntroReady()

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-[-10%] w-[120%] max-w-[760px] -translate-y-1/2 opacity-80 sm:left-[-4%] sm:w-[90%]">
        <svg viewBox="0 0 400 400" className="block h-auto w-full">
          <defs>
            <radialGradient id="blob-gradiente" cx="38%" cy="32%" r="78%">
              <stop offset="0%" stopColor="#3B3935" />
              <stop offset="58%" stopColor="#2B2926" />
              <stop offset="100%" stopColor="#1A120A" />
            </radialGradient>
          </defs>
          <path d={BLOB_A} fill="url(#blob-gradiente)" stroke="rgba(255,184,108,0.22)" strokeWidth="1">
            {reduced ? null : (
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                values={`${BLOB_A};${BLOB_B};${BLOB_A}`}
              />
            )}
          </path>
        </svg>
      </div>

      <div className="container-site relative flex min-h-[72vh] flex-col justify-center py-20">
        <p className="t-apoio tabular text-silver">{naoEncontrada.codigo}</p>
        <RevealWords texto={naoEncontrada.titulo} as="h1" className="t-h1 mt-4 max-w-[15em]" start={ready} />
        <div className="mt-10">
          <Button to={naoEncontrada.link.para} size="lg">
            {naoEncontrada.link.rotulo}
          </Button>
        </div>
      </div>
    </section>
  )
}
