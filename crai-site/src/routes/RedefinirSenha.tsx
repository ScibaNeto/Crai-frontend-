import { useState, type FormEvent } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field } from '../components/ui/Field'
import { codigoErroAuth, redefinirSenha, type CodigoErroAuth } from '../lib/auth'
import { useConteudo } from '../lib/i18n'
import { useSessao } from '../lib/useSessao'

/** Destino do link "esqueci minha senha": o Supabase abre uma sessão de recuperação pela URL. */
export function RedefinirSenha() {
  const conteudo = useConteudo()
  const copy = conteudo.redefinirSenha
  const { carregando, sessao } = useSessao()
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [erroAuth, setErroAuth] = useState<CodigoErroAuth | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [pronto, setPronto] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (salvando) return
    if (senha.length < 8) {
      setErro(copy.curta)
      document.getElementById('nova-senha')?.focus()
      return
    }
    setSalvando(true)
    setErroAuth(null)
    try {
      await redefinirSenha(senha)
      setPronto(true)
    } catch (err) {
      setErroAuth(codigoErroAuth(err))
    } finally {
      setSalvando(false)
    }
  }

  let corpo
  if (carregando) {
    corpo = <p className="t-body text-silver">…</p>
  } else if (!sessao) {
    corpo = (
      <div className="flex flex-col items-start gap-6">
        <p role="alert" className="t-body text-silver">
          {copy.linkInvalido}
        </p>
        <Button to="/entrar" variant="ghost">
          {copy.irEntrar}
        </Button>
      </div>
    )
  } else if (pronto) {
    corpo = (
      <div className="flex flex-col items-start gap-6">
        <p role="status" className="t-body text-paper">
          {copy.sucesso}
        </p>
        <Button to="/painel">{copy.irPainel}</Button>
      </div>
    )
  } else {
    corpo = (
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <Field
          id="nova-senha"
          type="password"
          label={copy.senha}
          hint={copy.dica}
          autoComplete="new-password"
          required
          minLength={8}
          error={erro ?? undefined}
          value={senha}
          onChange={(ev) => {
            setSenha(ev.target.value)
            setErro(null)
          }}
        />
        {erroAuth ? (
          <p role="alert" className="t-apoio text-amber">
            {conteudo.entrar.erros[erroAuth]}
          </p>
        ) : null}
        <div className="border-t border-line pt-6">
          <Button type="submit" size="lg" loading={salvando} disabled={salvando}>
            {salvando ? copy.salvando : copy.salvar}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <PageShell titulo={copy.titulo} lead={copy.lead}>
      <div className="container-site pb-24 md:pb-32">
        <Card className="max-w-[520px] p-5 sm:p-8 md:p-10">{corpo}</Card>
      </div>
    </PageShell>
  )
}
