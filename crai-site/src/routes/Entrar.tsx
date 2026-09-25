import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field } from '../components/ui/Field'
import { codigoErroAuth, entrar, recuperarSenha, type CodigoErroAuth } from '../lib/auth'
import { concluirCadastroPendente, temCadastroPendente } from '../lib/cadastro'
import { interpolar } from '../lib/cx'
import { useConteudo } from '../lib/i18n'
import { useSessao } from '../lib/useSessao'

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Só aceita caminhos internos em ?proximo=, para o login não virar redirecionamento aberto. */
function destinoSeguro(valor: string | null): string {
  return valor && valor.startsWith('/') && !valor.startsWith('//') ? valor : '/painel'
}

export function Entrar() {
  const { entrar: copy } = useConteudo()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const proximo = destinoSeguro(params.get('proximo'))
  const { carregando, sessao, recarregar } = useSessao()

  const [modo, setModo] = useState<'entrar' | 'recuperar'>('entrar')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({})
  const [erroGeral, setErroGeral] = useState<CodigoErroAuth | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [linkEnviado, setLinkEnviado] = useState(false)

  // Já logado: não faz sentido ver o formulário.
  if (!carregando && sessao && !enviando) return <Navigate to={proximo} replace />

  function validar(exigeSenha: boolean) {
    const novos: typeof erros = {}
    if (!EMAIL_VALIDO.test(email.trim())) novos.email = copy.validacao.email
    if (exigeSenha && !senha) novos.senha = copy.validacao.senha
    setErros(novos)
    const primeiro = novos.email ? 'entrar-email' : novos.senha ? 'entrar-senha' : null
    if (primeiro) document.getElementById(primeiro)?.focus()
    return !primeiro
  }

  async function onEntrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (enviando || !validar(true)) return
    setEnviando(true)
    setErroGeral(null)
    try {
      await entrar(email, senha)
      // Conta criada com confirmação de e-mail e nunca concluída: grava perfil e empresa agora.
      // Se falhar (ex.: CNPJ já usado), o cadastro mostra o erro e deixa corrigir.
      if (await temCadastroPendente()) {
        try {
          await concluirCadastroPendente()
        } catch {
          navigate('/cadastro', { replace: true })
          return
        }
      }
      await recarregar()
      navigate(proximo, { replace: true })
    } catch (erro) {
      setErroGeral(codigoErroAuth(erro))
      setEnviando(false)
    }
  }

  async function onRecuperar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (enviando || !validar(false)) return
    setEnviando(true)
    setErroGeral(null)
    try {
      await recuperarSenha(email)
      setLinkEnviado(true)
    } catch (erro) {
      setErroGeral(codigoErroAuth(erro))
    } finally {
      setEnviando(false)
    }
  }

  function trocarModo(novo: 'entrar' | 'recuperar') {
    setModo(novo)
    setErros({})
    setErroGeral(null)
    setLinkEnviado(false)
  }

  const r = copy.recuperar

  return (
    <PageShell titulo={modo === 'entrar' ? copy.titulo : r.titulo} lead={modo === 'entrar' ? copy.lead : r.texto}>
      <div className="container-site pb-24 md:pb-32">
        <Card className="max-w-[520px] p-5 sm:p-8 md:p-10">
          {modo === 'entrar' ? (
            <form onSubmit={onEntrar} noValidate className="flex flex-col gap-6">
              <Field
                id="entrar-email"
                type="email"
                label={copy.email}
                autoComplete="email"
                required
                error={erros.email}
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value)
                  setErros((a) => ({ ...a, email: undefined }))
                }}
              />
              <Field
                id="entrar-senha"
                type="password"
                label={copy.senha}
                autoComplete="current-password"
                required
                error={erros.senha}
                value={senha}
                onChange={(ev) => {
                  setSenha(ev.target.value)
                  setErros((a) => ({ ...a, senha: undefined }))
                }}
              />
              {erroGeral ? (
                <p role="alert" className="t-apoio text-amber">
                  {copy.erros[erroGeral]}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <Button variant="link" onClick={() => trocarModo('recuperar')}>
                  {copy.esqueci}
                </Button>
                <Button type="submit" size="lg" loading={enviando} disabled={enviando}>
                  {enviando ? copy.entrando : copy.entrar}
                </Button>
              </div>
              <p className="t-apoio text-silver">
                {copy.semConta}{' '}
                <Link to="/cadastro" className="text-link text-paper">
                  {copy.criarConta}
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={onRecuperar} noValidate className="flex flex-col gap-6">
              {linkEnviado ? (
                <p role="status" className="t-body text-silver">
                  {interpolar(r.enviado, { email: email.trim() })}
                </p>
              ) : (
                <Field
                  id="entrar-email"
                  type="email"
                  label={copy.email}
                  autoComplete="email"
                  required
                  error={erros.email}
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value)
                    setErros({})
                  }}
                />
              )}
              {erroGeral ? (
                <p role="alert" className="t-apoio text-amber">
                  {copy.erros[erroGeral]}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <Button variant="link" onClick={() => trocarModo('entrar')}>
                  {r.voltar}
                </Button>
                {linkEnviado ? null : (
                  <Button type="submit" size="lg" loading={enviando} disabled={enviando}>
                    {enviando ? r.enviando : r.enviar}
                  </Button>
                )}
              </div>
            </form>
          )}
        </Card>
      </div>
    </PageShell>
  )
}
