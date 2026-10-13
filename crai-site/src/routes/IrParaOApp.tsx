import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useConteudo } from '../lib/i18n'

// O painel do cliente (/app) é OUTRA página do mesmo build (app/index.html, código em src/painel/),
// com as próprias rotas. Quando o roteador do site recebe um endereço de lá (o `proximo` do login, um
// link interno), não há página do site para mostrar: o navegador precisa CARREGAR aquele endereço.
//
// Trava contra laço: se a hospedagem estiver mal configurada e devolver o site para /app, recarregar
// cairia aqui de novo, para sempre. Por isso só se tenta uma vez a cada poucos segundos; na segunda,
// a página para e mostra um aviso.
const CHAVE = 'crai:app-tentativa'
const INTERVALO_MS = 8000

function tentouAgoraHaPouco(alvo: string): boolean {
  try {
    const bruto = window.sessionStorage.getItem(CHAVE)
    if (!bruto) return false
    const { alvo: anterior, em } = JSON.parse(bruto) as { alvo?: string; em?: number }
    return anterior === alvo && typeof em === 'number' && Date.now() - em < INTERVALO_MS
  } catch {
    return false
  }
}

function anotarTentativa(alvo: string) {
  try {
    window.sessionStorage.setItem(CHAVE, JSON.stringify({ alvo, em: Date.now() }))
  } catch {
    // Sem sessionStorage não há trava; a hospedagem certa não depende dela.
  }
}

/** Carrega o painel do cliente. Sem `destino`, o endereço é o que já está na barra (uma rota /app/...). */
export function IrParaOApp({ destino }: { destino?: string }) {
  const location = useLocation()
  const { areaDoCliente } = useConteudo()
  const alvo = destino ?? `${location.pathname}${location.search}${location.hash}`
  const [parado, setParado] = useState(() => tentouAgoraHaPouco(alvo))

  useEffect(() => {
    if (parado) return
    anotarTentativa(alvo)
    window.location.replace(alvo)
  }, [alvo, parado])

  if (!parado) {
    return (
      <section className="container-site flex min-h-[60vh] items-center py-20">
        <p role="status" aria-live="polite" className="t-body text-silver">
          {areaDoCliente.abrindo}
        </p>
      </section>
    )
  }
  return (
    <section className="container-site flex min-h-[60vh] flex-col justify-center py-20">
      <h1 className="t-h2">{areaDoCliente.falhou}</h1>
      <p className="t-body measure mt-4 text-silver">{areaDoCliente.texto}</p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row">
        <Button
          onClick={() => {
            try {
              window.sessionStorage.removeItem(CHAVE)
            } catch {
              // Sem sessionStorage, a nova tentativa acontece do mesmo jeito.
            }
            setParado(false)
          }}
        >
          {areaDoCliente.tentar}
        </Button>
        <Button to="/" variant="ghost">
          {areaDoCliente.inicio}
        </Button>
      </div>
    </section>
  )
}
