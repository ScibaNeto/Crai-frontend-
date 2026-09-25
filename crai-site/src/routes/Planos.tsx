import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { useConteudo } from '../lib/i18n'
import { useReducedMotion } from '../lib/useReducedMotion'
import { Faq } from '../sections/Faq'
import { Planos as SecaoPlanos } from '../sections/Planos'
import { Simulador } from '../sections/Simulador'

export function Planos() {
  const { hash } = useLocation()
  const reduced = useReducedMotion()
  const { planosPagina } = useConteudo()

  useEffect(() => {
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }, 320)
    return () => window.clearTimeout(t)
  }, [hash, reduced])

  return (
    <PageShell titulo={planosPagina.titulo} lead={planosPagina.lead}>
      <section className="container-site pb-20 md:pb-28" aria-label={planosPagina.titulo}>
        <SecaoPlanos />
      </section>
      <Simulador />
      <Faq />
    </PageShell>
  )
}
