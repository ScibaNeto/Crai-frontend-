import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Checkbox, Field } from '../components/ui/Field'
import { Select } from '../components/ui/Select'
import { Stepper } from '../components/ui/Stepper'
import { Toggle } from '../components/ui/Toggle'
import {
  FAIXAS_MRR,
  SEGMENTOS,
  cadastrar,
  codigoDoErro,
  concluirCadastroPendente,
  concluirComDados,
  temCadastroPendente,
  type CodigoErroCadastro,
  type DadosCadastro,
} from '../lib/cadastro'
import { cnpjValido } from '../lib/cnpj'
import { interpolar } from '../lib/cx'
import { formatCNPJ, formatTelefone, somenteDigitos } from '../lib/format'
import { useConteudo } from '../lib/i18n'
import { EASE_EXPO } from '../lib/intro'
import { useSessao } from '../lib/useSessao'
import type { Plano } from '../lib/simulador'
import { useReducedMotion } from '../lib/useReducedMotion'

interface DadosOperacao {
  plano: Plano
  inicio: string
  aceitouTermos: boolean
  aceitouComunicacao: boolean
}

type Erros = Partial<Record<string, string>>

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Data de hoje no fuso local, no formato do input date (AAAA-MM-DD). */
function hojeISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Campos de cada etapa, para voltar à etapa certa quando a validação final falha. */
const CAMPOS_POR_ETAPA = [
  ['razao-social', 'cnpj'],
  ['resp-nome', 'resp-email', 'resp-telefone', 'resp-senha'],
  ['termos'],
]

export function Cadastro() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const conteudo = useConteudo()
  const { cadastro, simuladorCopy } = conteudo
  const { sessao, perfil, empresa, recarregar, sair } = useSessao()
  const [etapa, setEtapa] = useState(0)
  const [direcao, setDirecao] = useState(1)
  // Segmento e faixa guardam o índice da opção, para o que foi digitado sobreviver à troca de idioma.
  const [dadosEmpresa, setDadosEmpresa] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    site: '',
    segmento: '0',
    mrrFaixa: '0',
    assinantes: '',
  })
  const [dadosResp, setDadosResp] = useState({ nome: '', cargo: '', email: '', telefone: '', senha: '' })
  const [params] = useSearchParams()
  // O botão de cada plano em /planos chega com ?plano=standard|premium.
  const [dadosOp, setDadosOp] = useState<DadosOperacao>({
    plano: params.get('plano') === 'premium' ? 'premium' : 'standard',
    inicio: '',
    aceitouTermos: false,
    aceitouComunicacao: false,
  })
  const [erros, setErros] = useState<Erros>({})
  const [erroGeral, setErroGeral] = useState<CodigoErroCadastro | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [concluindo, setConcluindo] = useState(false)
  const [contaExistente, setContaExistente] = useState(false)
  const [confirmarEmail, setConfirmarEmail] = useState<string | null>(null)
  // true entre o fim do cadastro e a troca de rota, para não piscar o aviso de "conta já criada".
  const [saindo, setSaindo] = useState(false)
  // Logado sem empresa (cadastro interrompido): o formulário só completa a empresa, sem criar outra conta.
  const semEmpresa = Boolean(sessao) && !empresa
  const modoConta = contaExistente || semEmpresa
  const emailDaConta = sessao?.user.email ?? ''
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const precisaFoco = useRef(false)

  // Volta do link de confirmação (ou sessão com cadastro incompleto): grava perfil e empresa pendentes.
  useEffect(() => {
    let ativo = true
    temCadastroPendente()
      .then((pendente) => {
        if (!pendente || !ativo) return
        setConcluindo(true)
        setSaindo(true)
        return concluirCadastroPendente()
          .then(() => recarregar())
          .then(() => {
            if (ativo) navigate('/pagamento')
          })
      })
      .catch((erro: unknown) => {
        if (!ativo) return
        setSaindo(false)
        setConcluindo(false)
        setContaExistente(true)
        setErroGeral(codigoDoErro(erro))
      })
    return () => {
      ativo = false
    }
  }, [navigate, recarregar])

  // Nome do perfil já existente entra no formulário quando só falta a empresa
  // (ajuste de estado durante o render, uma vez só, sem effect).
  const [nomeDoPerfilAplicado, setNomeDoPerfilAplicado] = useState(false)
  if (semEmpresa && perfil && !nomeDoPerfilAplicado) {
    setNomeDoPerfilAplicado(true)
    if (!dadosResp.nome) setDadosResp({ ...dadosResp, nome: perfil.nome_completo })
  }

  const opcoesPlano = simuladorCopy.planos as { value: Plano; label: string }[]
  const total = cadastro.etapas.length
  const ultima = etapa === total - 1

  function irPara(n: number) {
    if (n === etapa || n < 0 || n >= total) return
    setDirecao(n > etapa ? 1 : -1)
    precisaFoco.current = true
    setEtapa(n)
  }

  function validarEtapa(n: number): Erros {
    const v = cadastro.validacao
    const novos: Erros = {}
    if (n === 0) {
      if (dadosEmpresa.razaoSocial.trim().length < 2) novos['razao-social'] = v.obrigatorio
      if (!dadosEmpresa.cnpj.trim()) novos.cnpj = v.obrigatorio
      else if (!cnpjValido(dadosEmpresa.cnpj)) novos.cnpj = v.cnpj
    }
    if (n === 1) {
      if (!dadosResp.nome.trim()) novos['resp-nome'] = v.obrigatorio
      if (!modoConta && !EMAIL_VALIDO.test(dadosResp.email.trim())) novos['resp-email'] = v.email
      const tel = somenteDigitos(dadosResp.telefone)
      if (tel && tel.length < 10) novos['resp-telefone'] = v.telefone
      if (!modoConta && dadosResp.senha.length < 8) novos['resp-senha'] = v.senha
    }
    if (n === 2 && !dadosOp.aceitouTermos) novos.termos = v.termos
    return novos
  }

  /** Leva o foco (e a rolagem) ao primeiro campo com erro, para a mensagem não ficar fora da tela. */
  function focarCampo(id: string | undefined) {
    if (!id) return
    requestAnimationFrame(() => {
      const campo = document.getElementById(id)
      campo?.focus({ preventScroll: true })
      campo?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' })
    })
  }

  /** Atualiza o campo e some com o erro dele. */
  function limparErro(id: string) {
    if (erros[id]) setErros((atual) => ({ ...atual, [id]: undefined }))
    if (erroGeral) setErroGeral(null)
  }

  function montarDados(): DadosCadastro {
    return {
      responsavel: {
        nome: dadosResp.nome,
        email: modoConta && emailDaConta ? emailDaConta : dadosResp.email,
        senha: dadosResp.senha,
        cargo: dadosResp.cargo,
        telefone: dadosResp.telefone,
      },
      empresa: {
        razaoSocial: dadosEmpresa.razaoSocial,
        nomeFantasia: dadosEmpresa.nomeFantasia,
        cnpj: dadosEmpresa.cnpj,
        site: dadosEmpresa.site,
        segmento: SEGMENTOS[Number(dadosEmpresa.segmento)] ?? '',
        faixaMrr: FAIXAS_MRR[Number(dadosEmpresa.mrrFaixa)] ?? null,
        assinantes: dadosEmpresa.assinantes,
      },
      operacao: dadosOp,
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (enviando) return

    const errosEtapa = validarEtapa(etapa)
    if (Object.keys(errosEtapa).length) {
      setErros((atual) => ({ ...atual, ...errosEtapa }))
      focarCampo(Object.keys(errosEtapa)[0])
      return
    }
    if (!ultima) {
      irPara(etapa + 1)
      return
    }

    // Revalida tudo antes de enviar e volta para a primeira etapa com problema.
    const todos: Erros = { ...validarEtapa(0), ...validarEtapa(1), ...validarEtapa(2) }
    if (Object.keys(todos).length) {
      setErros(todos)
      const etapaComErro = CAMPOS_POR_ETAPA.findIndex((campos) => campos.some((c) => todos[c]))
      if (etapaComErro >= 0) irPara(etapaComErro)
      return
    }

    setEnviando(true)
    setErroGeral(null)
    try {
      const dados = montarDados()
      const resultado = modoConta ? await concluirComDados(dados) : await cadastrar(dados)
      if (resultado.status === 'confirmar_email') {
        setConfirmarEmail(resultado.email)
      } else {
        setSaindo(true)
        await recarregar()
        navigate('/pagamento')
      }
    } catch (erro) {
      setSaindo(false)
      const codigo = codigoDoErro(erro)
      setErroGeral(codigo)
      if (codigo === 'cnpj_existente' || codigo === 'cnpj_invalido') {
        // A conta pode já ter sido criada; a próxima tentativa só corrige a empresa.
        setContaExistente(await temCadastroPendente().catch(() => false))
        setErros((atual) => ({ ...atual, cnpj: cadastro.erros[codigo] }))
        irPara(0)
      } else if (codigo === 'email_existente' || codigo === 'email_invalido') {
        setErros((atual) => ({ ...atual, 'resp-email': cadastro.erros[codigo] }))
        irPara(1)
      } else if (codigo === 'senha_fraca') {
        setErros((atual) => ({ ...atual, 'resp-senha': cadastro.erros[codigo] }))
        irPara(1)
      }
    } finally {
      setEnviando(false)
    }
  }

  const variants: Variants = {
    entra: (d: number) => ({ x: reduced ? 0 : 24 * d, opacity: 0 }),
    centro: { x: 0, opacity: 1 },
    sai: (d: number) => ({ x: reduced ? 0 : -24 * d, opacity: 0 }),
  }

  const e = cadastro.empresa
  const r = cadastro.responsavel
  const o = cadastro.operacao

  if (sessao && empresa && !saindo && !enviando && !concluindo) {
    const j = cadastro.jaTemConta
    return (
      <PageShell titulo={cadastro.titulo} lead={cadastro.lead}>
        <div className="container-site pb-24 md:pb-32">
          <Card className="max-w-[820px] p-5 sm:p-8 md:p-10">
            <h2 className="t-h2">{j.titulo}</h2>
            <p className="t-body measure mt-4 text-silver">{interpolar(j.texto, { email: emailDaConta })}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/painel">{j.painel}</Button>
              <Button variant="ghost" onClick={() => void sair()}>
                {j.sair}
              </Button>
            </div>
          </Card>
        </div>
      </PageShell>
    )
  }

  if (confirmarEmail) {
    return (
      <PageShell titulo={cadastro.titulo} lead={cadastro.lead}>
        <div className="container-site pb-24 md:pb-32">
          <Card className="max-w-[820px] p-5 sm:p-8 md:p-10" role="status" aria-live="polite">
            <h2 className="t-h2">{cadastro.confirmarEmail.titulo}</h2>
            <p className="t-body measure mt-4 text-silver">
              {interpolar(cadastro.confirmarEmail.texto, { email: confirmarEmail })}
            </p>
            <div className="mt-8">
              <Button to="/" variant="ghost">
                {cadastro.confirmarEmail.voltar}
              </Button>
            </div>
          </Card>
        </div>
      </PageShell>
    )
  }

  if (concluindo) {
    return (
      <PageShell titulo={cadastro.titulo} lead={cadastro.lead}>
        <div className="container-site pb-24 md:pb-32">
          <Card className="max-w-[820px] p-5 sm:p-8 md:p-10" role="status" aria-live="polite">
            <p className="t-body text-silver">{cadastro.concluindo}</p>
          </Card>
        </div>
      </PageShell>
    )
  }

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
                        required
                        error={erros['razao-social']}
                        value={dadosEmpresa.razaoSocial}
                        onChange={(ev) => {
                          limparErro('razao-social')
                          setDadosEmpresa({ ...dadosEmpresa, razaoSocial: ev.target.value })
                        }}
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
                        className="tabular uppercase"
                        required
                        placeholder="00.000.000/0000-00"
                        error={erros.cnpj}
                        value={dadosEmpresa.cnpj}
                        onChange={(ev) => {
                          limparErro('cnpj')
                          setDadosEmpresa({ ...dadosEmpresa, cnpj: formatCNPJ(ev.target.value) })
                        }}
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
                        options={e.segmentos.map((label, i) => ({ value: String(i), label }))}
                        value={dadosEmpresa.segmento}
                        onChange={(ev) => setDadosEmpresa({ ...dadosEmpresa, segmento: ev.target.value })}
                      />
                      <Select
                        id="mrr-faixa"
                        label={e.mrrFaixa}
                        options={e.faixas.map((label, i) => ({ value: String(i), label }))}
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
                        required
                        error={erros['resp-nome']}
                        value={dadosResp.nome}
                        onChange={(ev) => {
                          limparErro('resp-nome')
                          setDadosResp({ ...dadosResp, nome: ev.target.value })
                        }}
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
                        required
                        disabled={modoConta}
                        error={erros['resp-email']}
                        value={modoConta && emailDaConta ? emailDaConta : dadosResp.email}
                        onChange={(ev) => {
                          limparErro('resp-email')
                          setDadosResp({ ...dadosResp, email: ev.target.value })
                        }}
                      />
                      <Field
                        id="resp-telefone"
                        type="tel"
                        label={r.telefone}
                        autoComplete="tel"
                        className="tabular"
                        error={erros['resp-telefone']}
                        value={dadosResp.telefone}
                        onChange={(ev) => {
                          limparErro('resp-telefone')
                          setDadosResp({ ...dadosResp, telefone: formatTelefone(ev.target.value) })
                        }}
                      />
                      {modoConta ? null : (
                        <Field
                          id="resp-senha"
                          type="password"
                          label={r.senha}
                          hint={r.senhaDica}
                          autoComplete="new-password"
                          required
                          minLength={8}
                          error={erros['resp-senha']}
                          value={dadosResp.senha}
                          onChange={(ev) => {
                            limparErro('resp-senha')
                            setDadosResp({ ...dadosResp, senha: ev.target.value })
                          }}
                          wrapperClassName="sm:col-span-2 sm:max-w-[calc(50%-12px)]"
                        />
                      )}
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
                      <Field id="cobranca" label={o.cobranca} value={cadastro.mock.cobranca} hint={o.cobrancaDica} disabled readOnly />
                      <Field
                        id="inicio"
                        type="date"
                        label={o.inicio}
                        min={hojeISO()}
                        className="tabular"
                        value={dadosOp.inicio}
                        onChange={(ev) => setDadosOp({ ...dadosOp, inicio: ev.target.value })}
                      />
                      <div className="flex flex-col gap-5 border-t border-line pt-6 sm:col-span-2">
                        <Checkbox
                          id="termos"
                          label={o.termos}
                          required
                          error={erros.termos}
                          checked={dadosOp.aceitouTermos}
                          onChange={(ev) => {
                            limparErro('termos')
                            setDadosOp({ ...dadosOp, aceitouTermos: ev.target.checked })
                          }}
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

            {erroGeral ? (
              <p role="alert" className="t-apoio mt-8 text-amber">
                {cadastro.erros[erroGeral]}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
              <Button variant="ghost" onClick={() => irPara(etapa - 1)} disabled={etapa === 0 || enviando}>
                {cadastro.voltar}
              </Button>
              <Button type="submit" size="lg" loading={enviando} disabled={enviando}>
                {enviando ? cadastro.enviando : ultima ? cadastro.finalizar : cadastro.continuar}
              </Button>
            </div>
          </form>
          {sessao ? null : (
            <p className="t-apoio mt-6 text-silver">
              {cadastro.temConta}{' '}
              <Link to="/entrar?proximo=/pagamento" className="text-link text-paper">
                {cadastro.entrar}
              </Link>
            </p>
          )}
        </Card>
      </div>
    </PageShell>
  )
}
