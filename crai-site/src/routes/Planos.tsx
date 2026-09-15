import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { useConteudo } from '../lib/i18n'
import { useReducedMotion } from '../lib/useReducedMotion'
import { Faq } from '../sections/Faq'
import { PlanCards } from '../sections/PlanCards'
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
        <PlanCards />
        <div className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
          <p className="t-apoio measure text-silver lg:col-span-7">{planosPagina.nota}</p>
          <p className="t-apoio text-paper lg:col-span-4 lg:col-start-9">{planosPagina.faixa}</p>
        </div>
      </section>
      <Simulador />
      <Faq />
    </PageShell>
  )
}
