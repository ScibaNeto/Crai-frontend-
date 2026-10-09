import { Link } from 'react-router-dom'
import { IconChevronDown } from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { TextoRico } from '../components/ui/TextoRico'
import { privacidadeEn, termosEn } from '../data/legal.en'
import { privacidadePt, termosPt, type BlocoLegal, type DocumentoLegal } from '../data/legal.pt'
import { useConteudo, useLang } from '../lib/i18n'

// Os textos legais viajam com esta rota (e não no bundle inicial de todas as páginas).
const DOCS = {
  pt: { privacidade: privacidadePt, termos: termosPt },
  en: { privacidade: privacidadeEn, termos: termosEn },
}

function Bloco({ bloco }: { bloco: BlocoLegal }) {
  const { legalPagina } = useConteudo()
  if (typeof bloco === 'string') {
    return (
      <p className="t-body mt-4 text-silver">
        <TextoRico texto={bloco} />
      </p>
    )
  }
  if ('subtitulo' in bloco) {
    return <h3 className="t-body mt-8 font-[600] text-paper">{bloco.subtitulo}</h3>
  }
  if ('lista' in bloco) {
    return (
      <ul className="t-body mt-4 flex list-disc flex-col gap-2 pl-5 text-silver marker:text-graphite">
        {bloco.lista.map((item) => (
          <li key={item}>
            <TextoRico texto={item} />
          </li>
        ))}
      </ul>
    )
  }
  // Tabela rola na horizontal dentro do próprio bloco no celular; a página nunca.
  // role/tabIndex: quem navega pelo teclado também consegue rolar a tabela.
  return (
    <div
      role="region"
      aria-label={legalPagina.tabelaAria}
      tabIndex={0}
      className="mt-6 overflow-x-auto rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
    >
      <table className="t-apoio w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr>
            {bloco.tabela.colunas.map((coluna) => (
              <th key={coluna} scope="col" className="border-b border-graphite py-3 pr-4 font-[560] text-paper">
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bloco.tabela.linhas.map((linha) => (
            <tr key={linha[0]}>
              {linha.map((celula, i) => (
                <td key={i} className="border-b border-line py-3 pr-4 align-top text-silver">
                  <TextoRico texto={celula} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PaginaLegal({ doc, caminho }: { doc: DocumentoLegal; caminho: string }) {
  const { legalPagina } = useConteudo()
  return (
    <PageShell
      titulo={doc.titulo}
      lead={
        <>
          {doc.vigencia}
          {doc.nota ? <span className="mt-2 block">{doc.nota}</span> : null}
        </>
      }
    >
      <div className="container-site grid gap-10 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-8">
        <nav aria-label={doc.sumarioAria} className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-24 flex flex-col gap-2.5 border-t border-line pt-6">
            {doc.secoes.map((secao) => (
              <li key={secao.id}>
                <a href={`#${secao.id}`} className="nav-link t-apoio text-silver transition-colors hover:text-paper">
                  {secao.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="measure min-w-0 lg:col-span-8 lg:col-start-5">
          {/* No celular e no tablet o sumário lateral some: o índice vira um bloco que abre e fecha. */}
          <details className="group mb-10 rounded-[14px] border border-line bg-slate/40 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-[14px] px-5 py-4 text-[15px] font-[560] text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber [&::-webkit-details-marker]:hidden">
              {legalPagina.indice}
              <IconChevronDown size={18} className="shrink-0 text-silver transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <nav aria-label={doc.sumarioAria}>
              <ol className="flex flex-col gap-3.5 border-t border-line px-5 py-5">
                {doc.secoes.map((secao) => (
                  <li key={secao.id}>
                    <a
                      href={`#${secao.id}`}
                      // Fecha o índice antes de o navegador rolar: a seção de destino fica no lugar certo.
                      onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}
                      className="t-apoio block text-silver transition-colors hover:text-paper"
                    >
                      {secao.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>

          {doc.secoes.map((secao) => (
            <section
              key={secao.id}
              id={secao.id}
              aria-labelledby={`${secao.id}-titulo`}
              className="scroll-mt-24 border-t border-line pt-8 pb-10"
            >
              <h2 id={`${secao.id}-titulo`} className="t-h3">
                {secao.titulo}
              </h2>
              {secao.blocos.map((bloco, i) => (
                <Bloco key={i} bloco={bloco} />
              ))}
            </section>
          ))}

          {/* Os documentos se complementam: do fim de um, um clique leva ao outro e ao resumo em /dados. */}
          <nav aria-label={legalPagina.relacionadosAria} className="border-t border-line pt-8">
            <h2 className="t-apoio text-silver">{legalPagina.relacionadosTitulo}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {legalPagina.relacionados
                .filter((link) => link.para !== caminho)
                .map((link) => (
                  <li key={link.para}>
                    <Link to={link.para} className="text-link t-body">
                      {link.rotulo}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </PageShell>
  )
}

export function Privacidade() {
  return <PaginaLegal doc={DOCS[useLang()].privacidade} caminho="/privacidade" />
}

export function Termos() {
  return <PaginaLegal doc={DOCS[useLang()].termos} caminho="/termos" />
}
