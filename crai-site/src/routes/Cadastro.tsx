import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Checkbox, Field } from '../components/ui/Field'
import { Select } from '../components/ui/Select'
import { Stepper } from '../components/ui/Stepper'
import { Toggle } from '../components/ui/Toggle'
import { mockCadastro } from '../data/mockCadastro'
import { interpolar } from '../lib/cx'
import { formatCNPJ, formatTelefone, somenteDigitos } from '../lib/format'
import { useConteudo, useLang } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'
import type { Plano } from '../lib/simulador'
import { useReducedMotion } from '../lib/useReducedMotion'

interface DadosOperacao {
  plano: Plano
  cobranca: string
  inicio: string
  aceitouTermos: boolean
  aceitouComunicacao: boolean
}

/** Remonta o formulário ao trocar de idioma: o pré-preenchimento de demonstração é refeito no idioma novo. */
export function Cadastro() {
  const lang = useLang()
  return <CadastroForm key={lang} />
}

function CadastroForm() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const conteudo = useConteudo()
  const { cadastro, simuladorCopy } = conteudo
  const [etapa, setEtapa] = useState(0)
  const [direcao, setDirecao] = useState(1)
  const [dadosEmpresa, setDadosEmpresa] = useState(() => {
    const { empresa } = mockCadastro(conteudo)
    return { ...empresa, assinantes: String(empresa.assinantes) }
  })
  const [dadosResp, setDadosResp] = useState(() => mockCadastro(conteudo).responsavel)
  const [dadosOp, setDadosOp] = useState<DadosOperacao>(() => mockCadastro(conteudo).operacao)
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const precisaFoco = useRef(false)

  const opcoesPlano = simuladorCopy.planos as { value: Plano; label: string }[]
  const total = cadastro.etapas.length
  const ultima = etapa === total - 1

  function irPara(n: number) {
    if (n === etapa || n < 0 || n >= total) return
    setDirecao(n > etapa ? 1 : -1)
    precisaFoco.current = true
    setEtapa(n)
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!ultima) {
      irPara(etapa + 1)
      return
    }
    // Senha nunca vai para o log.
    console.log('[demo] cadastro', {
      empresa: dadosEmpresa,
      responsavel: { nome: dadosResp.nome, cargo: dadosResp.cargo, email: dadosResp.email, telefone: dadosResp.telefone },
      operacao: dadosOp,
    })
    navigate('/pagamento')
  }

  const variants: Variants = {
    entra: (d: number) => ({ x: reduced ? 0 : 24 * d, opacity: 0 }),
    centro: { x: 0, opacity: 1 },
    sai: (d: number) => ({ x: reduced ? 0 : -24 * d, opacity: 0 }),
  }

  const e = cadastro.empresa
  const r = cadastro.responsavel
  const o = cadastro.operacao

  return (
    <PageShell titulo={cadastro.titulo} lead={cadastro.lead}>
      <div className="container-site pb-24 md:pb-32">
        <Card className="max-w-[820px] p-5 sm:p-8 md:p-10">
          <Stepper steps={cadastro.etapas} current={etapa} onStepClick={irPara} label={cadastro.stepperAria} />

          <form onSubmit={onSubmit} noValidate className="mt-10">
            <AnimatePresence mode="wait" custom={direcao} initial={false}>
              <motion.div
                key={etapa}
                custom={direcao}
                variants={variants}
                initial="entra"
                animate="centro"
                exit="sai"
                transition={{ duration: reduced ? 0.12 : 0.28, ease: EASE_EXPO }}
                onAnimationComplete={(definicao) => {
                  if (definicao === 'centro' && precisaFoco.current) {
                    precisaFoco.current = false
                    tituloRef.current?.focus({ preventScroll: true })
                  }
                }}
              >
                <p className="t-apoio text-silver">{interpolar(cadastro.etapaDe, { n: etapa + 1, total })}</p>

                {etapa === 0 ? (
                  <fieldset>
                    <legend className="w-full">
                      <h2 ref={tituloRef} tabIndex={-1} className="t-h2 mt-1 outline-none">
                        {e.titulo}
                      </h2>
                    </legend>
                    <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        id="razao-social"
                        label={e.razaoSocial}
                        autoComplete="organization"
                        value={dadosEmpresa.razaoSocial}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, razaoSocial: ev.target.value })}
                        wrapperClassName="sm:col-span-2"
                      />
                      <Field
                        id="nome-fantasia"
                        label={e.nomeFantasia}
                        value={dadosEmpresa.nomeFantasia}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, nomeFantasia: ev.target.value })}
                      />
                      <Field
                        id="cnpj"
                        label={e.cnpj}
                        inputMode="numeric"
                        className="tabular"
                        value={dadosEmpresa.cnpj}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, cnpj: formatCNPJ(ev.target.value) })}
                      />
                      <Field
                        id="site"
                        label={e.site}
                        inputMode="url"
                        autoComplete="url"
                        value={dadosEmpresa.site}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, site: ev.target.value })}
                      />
                      <Select
                        id="segmento"
                        label={e.segmento}
                        options={e.segmentos}
                        value={dadosEmpresa.segmento}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, segmento: ev.target.value })}
                      />
                      <Select
                        id="mrr-faixa"
                        label={e.mrrFaixa}
                        options={e.faixas}
                        value={dadosEmpresa.mrrFaixa}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, mrrFaixa: ev.target.value })}
                      />
                      <Field
                        id="assinantes"
                        label={e.assinantes}
                        inputMode="numeric"
                        className="tabular"
                        value={dadosEmpresa.assinantes}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, assinantes: somenteDigitos(ev.target.value) })}
                      />
                    </div>
                  </fieldset>
                ) : null}

                {etapa === 1 ? (
                  <fieldset>
                    <legend className="w-full">
                      <h2 ref={tituloRef} tabIndex={-1} className="t-h2 mt-1 outline-none">
                        {r.titulo}
                      </h2>
                    </legend>
                    <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        id="resp-nome"
                        label={r.nome}
                        autoComplete="name"
                        value={dadosResp.nome}
                        onChange={(ev) => setDadosResp({ ...dadosResp, nome: ev.target.value })}
                      />
                      <Field
                        id="resp-cargo"
                        label={r.cargo}
                        autoComplete="organization-title"
                        value={dadosResp.cargo}
                        onChange={(ev) => setDadosResp({ ...dadosResp, cargo: ev.target.value })}
                      />
                      <Field
                        id="resp-email"
                        type="email"
                        label={r.email}
                        autoComplete="email"
                        value={dadosResp.email}
                        onChange={(ev) => setDadosResp({ ...dadosResp, email: ev.target.value })}
                      />
                      <Field
                        id="resp-telefone"
                        type="tel"
                        label={r.telefone}
                        autoComplete="tel"
                        className="tabular"
                        value={dadosResp.telefone}
                        onChange={(ev) => setDadosResp({ ...dadosResp, telefone: formatTelefone(ev.target.value) })}
                      />
                      <Field
                        id="resp-senha"
                        type="password"
                        label={r.senha}
                        hint={r.senhaDica}
                        autoComplete="new-password"
                        value={dadosResp.senha}
                        onChange={(ev) => setDadosResp({ ...dadosResp, senha: ev.target.value })}
                        wrapperClassName="sm:col-span-2 sm:max-w-[calc(50%-12px)]"
                      />
                    </div>
                  </fieldset>
                ) : null}

                {etapa === 2 ? (
                  <fieldset>
                    <legend className="w-full">
                      <h2 ref={tituloRef} tabIndex={-1} className="t-h2 mt-1 outline-none">
                        {o.titulo}
                      </h2>
                    </legend>
                    <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
                      <Toggle
                        id="plano"
                        label={o.plano}
                        options={opcoesPlano}
                        value={dadosOp.plano}
                        onChange={(plano) => setDadosOp({ ...dadosOp, plano })}
                        hint={o.planoDica[dadosOp.plano]}
                        className="sm:col-span-2 sm:max-w-[420px]"
                      />
                      <Field id="cobranca" label={o.cobranca} value={dadosOp.cobranca} hint={o.cobrancaDica} disabled readOnly />
                      <Field
                        id="inicio"
                        type="date"
                        label={o.inicio}
                        className="tabular"
                        value={dadosOp.inicio}
                        onChange={(ev) => setDadosOp({ ...dadosOp, inicio: ev.target.value })}
                      />
                      <div className="flex flex-col gap-5 border-t border-line pt-6 sm:col-span-2">
                        <Checkbox
                          id="termos"
                          label={o.termos}
                          checked={dadosOp.aceitouTermos}
                          onChange={(ev) => setDadosOp({ ...dadosOp, aceitouTermos: ev.target.checked })}
                        />
                        <Checkbox
                          id="comunicacao"
                          label={o.comunicacao}
                          hint={o.comunicacaoDica}
                          checked={dadosOp.aceitouComunicacao}
                          onChange={(ev) => setDadosOp({ ...dadosOp, aceitouComunicacao: ev.target.checked })}
                        />
                      </div>
                    </div>
                  </fieldset>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
              <Button variant="ghost" onClick={() => irPara(etapa - 1)} disabled={etapa === 0}>
                {cadastro.voltar}
              </Button>
              <Button type="submit" size="lg">
                {ultima ? cadastro.finalizar : cadastro.continuar}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </PageShell>
  )
}
