import { PageShell } from '../components/layout/PageShell'
import { TextoRico } from '../components/ui/TextoRico'
import type { BlocoLegal, DocumentoLegal } from '../data/legal.pt'
import { useConteudo } from '../lib/i18n'

function Bloco({ bloco }: { bloco: BlocoLegal }) {
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
  return (
    <div className="mt-6 overflow-x-auto">
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

function PaginaLegal({ doc }: { doc: DocumentoLegal }) {
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
        </div>
      </div>
    </PageShell>
  )
}

export function Privacidade() {
  return <PaginaLegal doc={useConteudo().privacidade} />
}

export function Termos() {
  return <PaginaLegal doc={useConteudo().termos} />
}
