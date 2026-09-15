import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { IconArrowRight } from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { SelfDrawingSvg } from '../components/motion/SelfDrawingSvg'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field, TextArea } from '../components/ui/Field'
import { Select } from '../components/ui/Select'
import { mockCadastro } from '../data/mockCadastro'
import { useConteudo, useLang } from '../lib/i18n'

type Estado = 'editando' | 'enviando' | 'enviado'

/** Remonta o formulário ao trocar de idioma: o pré-preenchimento de demonstração é refeito no idioma novo. */
export function Contato() {
  const lang = useLang()
  return <ContatoForm key={lang} />
}

function ContatoForm() {
  const conteudo = useConteudo()
  const { contatoPagina } = conteudo
  const [form, setForm] = useState(() => mockCadastro(conteudo).contato)
  const [estado, setEstado] = useState<Estado>('editando')
  const sucessoRef = useRef<HTMLHeadingElement>(null)
  const c = contatoPagina.campos

  useEffect(() => {
    if (estado !== 'enviando') return
    const t = window.setTimeout(() => setEstado('enviado'), 650)
    return () => window.clearTimeout(t)
  }, [estado])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('[demo] contato', form)
    setEstado('enviando')
  }

  return (
    <PageShell titulo={contatoPagina.titulo} lead={contatoPagina.lead}>
      <div className="container-site grid items-start gap-8 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-8">
        <Card className="p-5 sm:p-8 md:p-10 lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            {estado === 'enviado' ? (
              <motion.div
                key="sucesso"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                onAnimationComplete={() => sucessoRef.current?.focus({ preventScroll: true })}
                role="status"
              >
                <SelfDrawingSvg viewBox="0 0 56 56" width={56} height={56} duration={480} stagger={380} threshold={0.1}>
                  <circle data-draw={0} cx="28" cy="28" r="25" fill="none" stroke="var(--color-graphite)" strokeWidth="1.5" transform="rotate(-90 28 28)" />
                  <path data-draw={1} d="M17 29 L25 37 L39 21" fill="none" stroke="var(--color-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </SelfDrawingSvg>
                <h2 ref={sucessoRef} tabIndex={-1} className="t-h2 mt-6 outline-none">
                  {contatoPagina.sucesso.titulo}
                </h2>
                <p className="t-body measure mt-4 text-silver">{contatoPagina.sucesso.texto}</p>
                <div className="mt-8">
                  <Button variant="ghost" onClick={() => setEstado('editando')}>
                    {contatoPagina.sucesso.editar}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="formulario"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  <Field id="contato-nome" label={c.nome} autoComplete="name" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                  <Field
                    id="contato-email"
                    type="email"
                    label={c.email}
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Field
                    id="contato-empresa"
                    label={c.empresa}
                    autoComplete="organization"
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  />
                  <Select
                    id="contato-assunto"
                    label={c.assunto}
                    options={contatoPagina.assuntos}
                    value={form.assunto}
                    onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                  />
                  <TextArea
                    id="contato-mensagem"
                    label={c.mensagem}
                    rows={6}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    wrapperClassName="sm:col-span-2"
                  />
                </div>
                <div className="mt-8">
                  <Button type="submit" size="lg" loading={estado === 'enviando'} disabled={estado === 'enviando'} className="w-full sm:w-auto">
                    {contatoPagina.enviar}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="contato-lateral-titulo">
          <h2 id="contato-lateral-titulo" className="t-h3">
            {contatoPagina.lateral.titulo}
          </h2>
          <p className="t-body mt-3 text-silver">{contatoPagina.lateral.texto}</p>
          <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
            {contatoPagina.lateral.links.map((link) => (
              <li key={link.para}>
                <Button to={link.para} variant="ghost" className="group h-auto w-full justify-between rounded-none border-0 px-0 py-4 hover:bg-transparent">
                  {link.rotulo}
                  <IconArrowRight size={18} className="text-silver" />
                </Button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PageShell>
  )
}
