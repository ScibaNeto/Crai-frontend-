import { motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import { IconCheck } from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { CountUp } from '../components/motion/CountUp'
import { TiltCard } from '../components/motion/TiltCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Checkbox, Field } from '../components/ui/Field'
import { PixQrPlaceholder, type EstadoQr } from '../components/ui/PixQrPlaceholder'
import { Select } from '../components/ui/Select'
import { getPlanos } from '../data/planos'
import { interpolar } from '../lib/cx'
import { mrrEstimado, type Empresa } from '../lib/empresa'
import { formatCNPJ, formatDocumento, parseMoeda, somenteDigitos } from '../lib/format'
import { useConteudo, useFormato, useLang } from '../lib/i18n'
import { useSessao } from '../lib/useSessao'
import { simular } from '../lib/simulador'
import { useReducedMotion } from '../lib/useReducedMotion'

const ALTURA_FAIXA = 52

/** Sobreposição com o QR se formando (10.13). Monta em "ocioso" e só então muda, para as transições rodarem. */
function CarregandoPix({ estado }: { estado: EstadoQr }) {
  const { pagamento } = useConteudo()
  const [visivel, setVisivel] = useState<EstadoQr>('ocioso')

  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setVisivel(estado))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [estado])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-[260px] flex-col items-center">
        <PixQrPlaceholder estado={visivel} className="w-60" />
        <p className="mt-6 text-[17px] font-[540] text-paper">{estado === 'pronto' ? pagamento.registrada : pagamento.registrando}</p>
      </div>
    </motion.div>,
    document.body,
  )
}

/** Exige login e empresa cadastrada; remonta o formulário ao trocar de idioma (a instituição vem do copy). */
export function Pagamento() {
  const lang = useLang()
  const { pagamento } = useConteudo()
  const { carregando, sessao, empresa } = useSessao()

  if (carregando) {
    return (
      <PageShell titulo={pagamento.titulo} lead={pagamento.lead}>
        <div className="container-site pb-24 md:pb-32">
          <Card className="max-w-[820px] p-5 sm:p-8 md:p-10" role="status" aria-live="polite">
            <p className="t-body text-silver">{pagamento.carregando}</p>
          </Card>
        </div>
      </PageShell>
    )
  }
  if (!sessao) return <Navigate to="/entrar?proximo=/pagamento" replace />
  if (!empresa) return <Navigate to="/cadastro" replace />
  return <PagamentoForm key={lang} empresa={empresa} email={sessao.user.email ?? ''} />
}

function PagamentoForm({ empresa, email }: { empresa: Empresa; email: string }) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const conteudo = useConteudo()
  const { pagamento } = conteudo
  const f = useFormato()
  // A cobrança ainda é simulada (sem PSP): os dados bancários não são enviados nem salvos.
  const [form, setForm] = useState(() => ({
    titular: empresa.razao_social,
    documento: formatCNPJ(empresa.cnpj),
    instituicao: pagamento.instituicoes[0],
    agencia: '',
    conta: '',
    chavePix: empresa.email_financeiro ?? email,
    diaApuracao: pagamento.dias[0],
    limitePorCobranca: 2000,
    autorizado: false,
  }))
  const [erroAutorizo, setErroAutorizo] = useState(false)
  const [estado, setEstado] = useState<EstadoQr>('ocioso')
  const plano = getPlanos(conteudo)[empresa.plano]
  const estimativa = simular(mrrEstimado(empresa.faixa_mrr), empresa.plano)
  // Linha 0: taxa da recuperação (os dois planos). Linha 1: taxa da retenção (só Premium).
  const linhasResumo = empresa.plano === 'premium' ? pagamento.resumo.linhas : pagamento.resumo.linhas.slice(0, 1)
  const c = pagamento.campos

  // Faixa fixa no rodapé: reserva o espaço para não cobrir o fim da página.
  useEffect(() => {
    document.body.style.paddingBottom = `${ALTURA_FAIXA}px`
    return () => {
      document.body.style.paddingBottom = ''
    }
  }, [])

  useEffect(() => {
    if (estado === 'ocioso') return
    const t =
      estado === 'formando'
        ? window.setTimeout(() => setEstado('pronto'), reduced ? 150 : 1250)
        : window.setTimeout(() => navigate('/confirmacao'), reduced ? 250 : 560)
    return () => window.clearTimeout(t)
  }, [estado, navigate, reduced])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (estado !== 'ocioso') return
    if (!form.autorizado) {
      setErroAutorizo(true)
      document.getElementById('autorizo')?.focus()
      return
    }
    setEstado('formando')
  }

  const dias = pagamento.dias.map((n) => ({ value: String(n), label: interpolar(pagamento.diaRotulo, { n }) }))

  return (
    <PageShell titulo={pagamento.titulo} lead={pagamento.lead}>
      <div className="container-site grid items-start gap-8 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-8">
        <form onSubmit={onSubmit} noValidate className="lg:col-span-7">
          <Card className="p-5 sm:p-8 md:p-10">
            <h2 className="t-h3">{pagamento.formTitulo}</h2>
            <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <Field
                id="titular"
                label={c.titular}
                autoComplete="organization"
                value={form.titular}
                onChange={(e) => setForm({ ...form, titular: e.target.value })}
                wrapperClassName="sm:col-span-2"
              />
              <Field
                id="documento"
                label={c.documento}
                inputMode="numeric"
                className="tabular"
                value={form.documento}
                onChange={(e) => setForm({ ...form, documento: formatDocumento(e.target.value) })}
              />
              <Select
                id="instituicao"
                label={c.instituicao}
                options={pagamento.instituicoes}
                value={form.instituicao}
                onChange={(e) => setForm({ ...form, instituicao: e.target.value })}
              />
              <Field
                id="agencia"
                label={c.agencia}
                inputMode="numeric"
                className="tabular"
                value={form.agencia}
                onChange={(e) => setForm({ ...form, agencia: somenteDigitos(e.target.value).slice(0, 4) })}
              />
              <Field
                id="conta"
                label={c.conta}
                inputMode="numeric"
                className="tabular"
                value={form.conta}
                onChange={(e) => setForm({ ...form, conta: e.target.value.replace(/[^\d-]/g, '').slice(0, 12) })}
              />
              <Field
                id="chave-pix"
                label={c.chavePix}
                value={form.chavePix}
                onChange={(e) => setForm({ ...form, chavePix: e.target.value })}
                wrapperClassName="sm:col-span-2"
              />
              <Select
                id="dia-apuracao"
                label={c.dia}
                options={dias}
                value={String(form.diaApuracao)}
                onChange={(e) => setForm({ ...form, diaApuracao: Number(e.target.value) })}
              />
              <Field
                id="limite"
                label={c.limite}
                inputMode="numeric"
                className="tabular"
                value={f.brl(form.limitePorCobranca)}
                onChange={(e) => setForm({ ...form, limitePorCobranca: parseMoeda(e.target.value) })}
                hint={c.limiteDica}
              />
            </div>

            <Checkbox
              id="autorizo"
              wrapperClassName="mt-8 border-t border-line pt-6"
              label={c.autorizo}
              required
              error={erroAutorizo ? c.autorizoErro : undefined}
              checked={form.autorizado}
              onChange={(e) => {
                setErroAutorizo(false)
                setForm({ ...form, autorizado: e.target.checked })
              }}
            />

            <div className="mt-8">
              <Button type="submit" size="lg" loading={estado !== 'ocioso'} disabled={estado !== 'ocioso'} className="w-full sm:w-auto">
                {pagamento.autorizar}
              </Button>
            </div>
          </Card>
        </form>

        <aside className="lg:sticky lg:top-24 lg:col-span-5" aria-labelledby="resumo-titulo">
          <TiltCard className="rounded-[14px]">
            <div className="glass glow-focus rounded-[14px] border border-line p-6 md:p-8">
              <h2 id="resumo-titulo" className="t-apoio text-silver">
                {pagamento.resumo.titulo}
              </h2>
              <p className="t-h3 mt-1">{interpolar(pagamento.resumo.plano, { nome: plano.nome })}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {linhasResumo.map((linha) => (
                  <li key={linha} className="flex gap-3">
                    <IconCheck size={18} className="mt-1 shrink-0 text-silver" />
                    <span>{linha}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {pagamento.resumo.selos.map((selo) => (
                  <Badge key={selo}>{selo}</Badge>
                ))}
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="t-apoio text-silver">{pagamento.resumo.estimativa}</p>
                <p className="t-number-sm mt-2 text-paper">
                  <CountUp value={estimativa.taxaCrai} format={f.brl} />
                </p>
                <p className="t-apoio mt-2 text-silver">{pagamento.resumo.estimativaNota}</p>
              </div>

              <div className="mt-6 flex items-baseline justify-between gap-4 border-t-[3px] border-double border-silver/30 pt-6">
                <span className="font-[560] text-paper">{pagamento.resumo.totalHoje}</span>
                <span className="t-number text-paper">{f.brl(0)}</span>
              </div>
            </div>
          </TiltCard>
        </aside>
      </div>

      {estado !== 'ocioso' ? <CarregandoPix estado={estado} /> : null}

      {createPortal(
        <div role="note" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-slate" style={{ minHeight: ALTURA_FAIXA }}>
          <div className="container-site flex items-center gap-3 py-3.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
            <p className="t-apoio text-paper">{pagamento.demo}</p>
          </div>
        </div>,
        document.body,
      )}
    </PageShell>
  )
}
