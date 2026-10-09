import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { IconArrowRight } from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { Reveal } from '../components/motion/Reveal'
import { SelfDrawingSvg } from '../components/motion/SelfDrawingSvg'
import { Spotlight } from '../components/motion/Spotlight'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field, TextArea } from '../components/ui/Field'
import { Select } from '../components/ui/Select'
import { TextoRico } from '../components/ui/TextoRico'
import { interpolar } from '../lib/cx'
import { useConteudo } from '../lib/i18n'

type Estado = 'editando' | 'enviado'
type CampoObrigatorio = 'nome' | 'email' | 'mensagem'

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Contato sem backend: o formulário valida os campos e abre o aplicativo de e-mail da pessoa com a mensagem
 * pronta para o time. Nada do que é digitado é enviado a um servidor nem guardado no navegador.
 * (Antes o formulário vinha preenchido com dados fictícios e descartava a mensagem ao enviar.)
 *
 * O assunto é guardado pelo índice, para o que foi digitado sobreviver à troca de idioma.
 */
export function Contato() {
  const { contatoPagina } = useConteudo()
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', assunto: 0, mensagem: '' })
  const [invalidos, setInvalidos] = useState<CampoObrigatorio[]>([])
  const [estado, setEstado] = useState<Estado>('editando')
  const sucessoRef = useRef<HTMLHeadingElement>(null)
  const c = contatoPagina.campos
  const ex = contatoPagina.exemplos

  const erro = (campo: CampoObrigatorio) => (invalidos.includes(campo) ? contatoPagina.erros[campo] : undefined)
  const limpar = (campo: CampoObrigatorio) => setInvalidos((atual) => atual.filter((i) => i !== campo))

  /** Link mailto: com assunto e corpo preenchidos. */
  function linkEmail() {
    const assunto = interpolar(contatoPagina.assuntoEmail, { assunto: contatoPagina.assuntos[form.assunto] })
    const assinatura = [form.nome.trim(), form.empresa.trim(), form.email.trim()].filter(Boolean).join('\n')
    const corpo = `${form.mensagem.trim()}\n\n—\n${assinatura}`.replace(/\r?\n/g, '\r\n')
    return `mailto:${contatoPagina.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const faltando: CampoObrigatorio[] = []
    if (!form.nome.trim()) faltando.push('nome')
    if (!EMAIL_VALIDO.test(form.email.trim())) faltando.push('email')
    if (!form.mensagem.trim()) faltando.push('mensagem')
    setInvalidos(faltando)
    if (faltando.length) {
      document.getElementById(`contato-${faltando[0]}`)?.focus()
      return
    }
    window.location.href = linkEmail()
    setEstado('enviado')
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
                <p className="t-body measure mt-4 text-silver">{interpolar(contatoPagina.sucesso.texto, { email: contatoPagina.email })}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={linkEmail()}
                    className="btn-shine inline-flex h-11 items-center justify-center gap-2 rounded-[4px] bg-orange px-5 text-[15px] font-[560] text-on-accent transition-[background-color,box-shadow] duration-150 hover:bg-amber hover:shadow-[0_10px_30px_-10px_rgba(239,147,17,0.7)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber"
                  >
                    {contatoPagina.sucesso.abrir}
                    <IconArrowRight size={18} />
                  </a>
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
                  <Field
                    id="contato-nome"
                    label={c.nome}
                    autoComplete="name"
                    required
                    maxLength={150}
                    placeholder={ex.nome}
                    error={erro('nome')}
                    value={form.nome}
                    onChange={(e) => {
                      limpar('nome')
                      setForm({ ...form, nome: e.target.value })
                    }}
                  />
                  <Field
                    id="contato-email"
                    type="email"
                    inputMode="email"
                    label={c.email}
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder={ex.email}
                    error={erro('email')}
                    value={form.email}
                    onChange={(e) => {
                      limpar('email')
                      setForm({ ...form, email: e.target.value })
                    }}
                  />
                  <Field
                    id="contato-empresa"
                    label={c.empresa}
                    autoComplete="organization"
                    maxLength={200}
                    placeholder={ex.empresa}
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  />
                  <Select
                    id="contato-assunto"
                    label={c.assunto}
                    options={contatoPagina.assuntos.map((rotulo, i) => ({ value: String(i), label: rotulo }))}
                    value={String(form.assunto)}
                    onChange={(e) => setForm({ ...form, assunto: Number(e.target.value) })}
                  />
                  <TextArea
                    id="contato-mensagem"
                    label={c.mensagem}
                    rows={6}
                    required
                    // Limite folgado: links mailto muito longos são cortados por alguns aplicativos de e-mail.
                    maxLength={1500}
                    placeholder={ex.mensagem}
                    error={erro('mensagem')}
                    value={form.mensagem}
                    onChange={(e) => {
                      limpar('mensagem')
                      setForm({ ...form, mensagem: e.target.value })
                    }}
                    wrapperClassName="sm:col-span-2"
                  />
                </div>
                <p className="t-apoio mt-6 text-silver">
                  <TextoRico texto={contatoPagina.privacidade} novaAba />
                </p>
                <div className="mt-8">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    {contatoPagina.enviar}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>

        <aside className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9" aria-labelledby="contato-lateral-titulo">
          <Reveal delay={0.15}>
            <Spotlight className="rounded-[18px] border border-line bg-slate/40 p-6 md:p-8">
              <span aria-hidden="true" className="pulse-dot pulse-dot--orange" />
              <h2 id="contato-lateral-titulo" className="t-h3 mt-5">
                {contatoPagina.lateral.titulo}
              </h2>
              <p className="t-body mt-3 text-silver">{contatoPagina.lateral.texto}</p>
              <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
                {contatoPagina.lateral.links.map((link) => (
                  <li key={link.para}>
                    <Button to={link.para} variant="ghost" className="group h-auto w-full justify-between! rounded-none border-0 px-0 py-4 hover:bg-transparent">
                      {link.rotulo}
                      <IconArrowRight size={18} className="text-silver transition-colors group-hover:text-orange" />
                    </Button>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        </aside>
      </div>
    </PageShell>
  )
}
