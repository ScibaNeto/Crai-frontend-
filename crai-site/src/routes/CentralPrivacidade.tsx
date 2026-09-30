import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  IconArrowRight,
  IconCardOff,
  IconCheck,
  IconExit,
  IconForecast,
  IconMessage,
  IconShield,
  IconUserSignal,
  type IconProps,
} from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { Reveal } from '../components/motion/Reveal'
import { Spotlight } from '../components/motion/Spotlight'
import { Badge } from '../components/ui/Badge'
import { TextoRico } from '../components/ui/TextoRico'
import { useConteudo } from '../lib/i18n'
import { Faq } from '../sections/Faq'
import { CabecalhoSecao } from '../sections/home/CabecalhoSecao'

/** Um ícone por compromisso, pela `id` do copy. */
const ICONES: Record<string, ComponentType<IconProps>> = {
  modelos: IconForecast,
  isolamento: IconShield,
  pix: IconCardOff,
  regras: IconMessage,
  cookies: IconUserSignal,
  cancelamento: IconExit,
}

/**
 * Aba Dados (/dados): Central de Privacidade e Segurança, no molde dos trust centers de SaaS: compromissos em linguagem
 * direta, perguntas de quem recebeu uma mensagem (como a página de clientes finais da Stripe), critérios do
 * agente, práticas de segurança, suboperadores, retenção, encarregado (art. 41, §1º, da LGPD) e documentos.
 */
export function CentralPrivacidade() {
  const { centralPrivacidade: c } = useConteudo()
  const { compromissos, assinantes, agente, seguranca, suboperadores, retencao, encarregado, documentos } = c

  return (
    <PageShell titulo={c.titulo} lead={c.lead} badge={<Badge tone="beta">{c.selo}</Badge>}>
      {/* Data dos documentos e atalhos para as seções */}
      <div className="container-site pb-14 md:pb-20">
        <p className="t-apoio text-silver">{c.atualizado}</p>
        <nav aria-label={c.indiceAria} className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {c.indice.map((item) => (
              <li key={item.para}>
                <a
                  href={item.para}
                  className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-silver transition-colors hover:border-orange/50 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Compromissos */}
      <section id="compromissos" className="section-y scroll-mt-24 border-t border-line" aria-labelledby="compromissos-titulo">
        <div className="container-site">
          <CabecalhoSecao id="compromissos-titulo" eyebrow={compromissos.eyebrow} titulo={compromissos.titulo} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {compromissos.itens.map((item, i) => {
              const Icone = ICONES[item.id] ?? IconShield
              return (
                <li key={item.id}>
                  <Reveal delay={(i % 3) * 0.08} className="h-full">
                    <Spotlight className="group h-full rounded-[18px] border border-line bg-slate/40 p-6 md:p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-[12px] border border-line bg-ink/50 text-amber transition-all duration-500 group-hover:-rotate-6 group-hover:border-orange/40">
                        <Icone size={22} />
                      </span>
                      <h3 className="t-h3 mt-8">{item.titulo}</h3>
                      <p className="t-apoio mt-3 text-silver">{item.texto}</p>
                    </Spotlight>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Para quem recebeu uma mensagem */}
      <div id="assinantes" className="scroll-mt-24">
        <Faq dados={assinantes} id="faq-assinantes" />
      </div>

      {/* Como o agente decide */}
      <section id="agente" className="hatch section-y scroll-mt-24 bg-slate" aria-labelledby="agente-titulo">
        <div className="container-site">
          <CabecalhoSecao id="agente-titulo" eyebrow={agente.eyebrow} titulo={agente.titulo} lead={agente.lead} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {agente.colunas.map((coluna, i) => (
              <Reveal key={coluna.titulo} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-[18px] border border-line bg-ink/40 p-6 md:p-7">
                  <h3 className="t-h3">{coluna.titulo}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {coluna.itens.map((criterio) => (
                      <li key={criterio} className="flex items-start gap-3 text-[15px] text-paper">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                        {criterio}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.16} className="h-full">
              <div className="beam h-full">
                <div className="beam__inner h-full p-6 md:p-7">
                  <h3 className="t-h3">{agente.limitesTitulo}</h3>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {agente.limites.map((limite) => (
                      <li key={limite} className="flex items-start gap-3 text-[15px] leading-[1.5] text-paper">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/15 text-amber">
                          <IconCheck size={13} />
                        </span>
                        {limite}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Segurança */}
      <section id="seguranca" className="section-y scroll-mt-24" aria-labelledby="seguranca-titulo">
        <div className="container-site">
          <CabecalhoSecao id="seguranca-titulo" eyebrow={seguranca.eyebrow} titulo={seguranca.titulo} />
          <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {seguranca.itens.map((item, i) => (
              <Reveal key={item.titulo} delay={(i % 3) * 0.08}>
                <div className="group border-t border-graphite pt-5 transition-colors duration-500 hover:border-orange">
                  <dt className="t-h3 transition-colors group-hover:text-amber">{item.titulo}</dt>
                  <dd className="t-apoio mt-2 text-silver">{item.texto}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-12">
            <div className="grid gap-3 rounded-[18px] border border-orange/40 bg-orange/[0.05] p-6 md:p-8 lg:grid-cols-12 lg:gap-8">
              <p className="text-[12.5px] font-[650] tracking-[0.14em] text-amber uppercase lg:col-span-3">{seguranca.incidente.titulo}</p>
              <p className="t-body text-paper lg:col-span-9">{seguranca.incidente.texto}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Suboperadores */}
      <section id="suboperadores" className="section-y scroll-mt-24 border-t border-line" aria-labelledby="suboperadores-titulo">
        <div className="container-site">
          <CabecalhoSecao id="suboperadores-titulo" eyebrow={suboperadores.eyebrow} titulo={suboperadores.titulo} lead={suboperadores.lead} />
          <Reveal className="mt-12">
            {/* A tabela rola na horizontal dentro do bloco no celular; a página nunca. */}
            <div className="overflow-x-auto rounded-[18px] border border-line bg-slate/40">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr>
                    {suboperadores.colunas.map((coluna) => (
                      <th key={coluna} scope="col" className="t-apoio border-b border-graphite px-5 py-4 font-[560] text-paper md:px-7">
                        {coluna}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {suboperadores.linhas.map(([prestador, finalidade, local]) => (
                    <tr key={prestador} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-5 py-4 align-top text-[15px] font-[600] text-paper md:px-7">
                        {prestador}
                      </th>
                      <td className="t-apoio px-5 py-4 align-top text-silver md:px-7">{finalidade}</td>
                      <td className="t-apoio px-5 py-4 align-top whitespace-nowrap text-paper md:px-7">{local}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="t-apoio measure mt-6 text-silver">
            <TextoRico texto={suboperadores.nota} />
          </p>
        </div>
      </section>

      {/* Retenção */}
      <section id="retencao" className="section-y scroll-mt-24 border-t border-line" aria-labelledby="retencao-titulo">
        <div className="container-site">
          <CabecalhoSecao id="retencao-titulo" eyebrow={retencao.eyebrow} titulo={retencao.titulo} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {retencao.itens.map((item, i) => (
              <li key={item.prazo}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Spotlight className="h-full rounded-[18px] border border-line bg-slate/40 p-6">
                    <p className="text-gradient text-[34px] leading-none font-[700] tracking-[-0.04em]">{item.prazo}</p>
                    <p className="t-apoio mt-4 text-silver">{item.dado}</p>
                  </Spotlight>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="t-apoio measure mt-6 text-silver">
            <TextoRico texto={retencao.nota} />
          </p>
        </div>
      </section>

      {/* Encarregado (art. 41, §1º, da LGPD: identidade e contato públicos, de preferência no site) */}
      <section id="encarregado" className="section-y scroll-mt-24 border-t border-line" aria-labelledby="encarregado-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <CabecalhoSecao id="encarregado-titulo" eyebrow={encarregado.eyebrow} titulo={encarregado.titulo} lead={encarregado.texto} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="beam">
              <div className="beam__inner p-6 md:p-8">
                <dl className="grid gap-6 sm:grid-cols-2">
                  {encarregado.pessoas.map((pessoa) => (
                    <div key={pessoa.nome}>
                      <dt className="text-[12.5px] font-[650] tracking-[0.14em] text-amber uppercase">{pessoa.papel}</dt>
                      <dd className="mt-2 text-[19px] leading-[1.3] font-[600] text-paper">{pessoa.nome}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 border-t border-line pt-6 text-[17px] text-paper">{encarregado.email}</p>
                <a
                  href={`mailto:${encarregado.email}`}
                  className="btn-shine mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-orange px-5 text-[15px] font-[560] text-ink transition-[background-color,box-shadow] duration-150 hover:bg-amber hover:shadow-[0_10px_30px_-10px_rgba(239,147,17,0.7)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber"
                >
                  {encarregado.escrever}
                  <IconArrowRight size={18} />
                </a>
                <p className="t-apoio mt-6 text-silver">{encarregado.anpd}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Documentos */}
      <section id="documentos" className="section-y scroll-mt-24 border-t border-line" aria-labelledby="documentos-titulo">
        <div className="container-site">
          <CabecalhoSecao id="documentos-titulo" eyebrow={documentos.eyebrow} titulo={documentos.titulo} />
          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {documentos.itens.map((doc, i) => (
              <li key={doc.titulo}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Link
                    to={doc.para}
                    className="group block h-full rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                  >
                    <Spotlight className="flex h-full flex-col rounded-[18px] border border-line bg-slate/40 p-6 transition-colors duration-300 group-hover:border-orange/40 md:p-7">
                      <Badge className="self-start">{doc.versao}</Badge>
                      <h3 className="t-h3 mt-6">{doc.titulo}</h3>
                      <p className="t-apoio mt-3 text-silver">{doc.texto}</p>
                      <span className="mt-auto flex items-center gap-2 pt-8 text-[15px] font-[560] text-paper transition-colors group-hover:text-amber">
                        {doc.acao}
                        <IconArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Spotlight>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
