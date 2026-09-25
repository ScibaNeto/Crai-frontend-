import { IconCardOff, IconFile, IconShield, IconSwap } from '../components/icons/Icons'
import { PageShell } from '../components/layout/PageShell'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useConteudo } from '../lib/i18n'
import { FluxoRecuperacao } from '../sections/FluxoRecuperacao'
import { GrupoControle } from '../sections/GrupoControle'
import { LiquidezIlustracao } from '../sections/LiquidezIlustracao'
import { MorphIcon } from '../sections/MorphIcon'
import { PainelPrints } from '../sections/PainelPrints'

const ICONES_DADOS = {
  entrada: IconFile,
  lgpd: IconShield,
  cartao: IconCardOff,
  gateway: IconSwap,
}

export function Produto() {
  const { produto } = useConteudo()
  const { recuperacao, liquidez, retencao, painel, dados } = produto

  return (
    <PageShell titulo={produto.titulo} lead={produto.lead}>
      {/* 1. Recuperação — protagonista: diagrama auto-desenhado */}
      <section className="container-site pb-20 md:pb-32" aria-labelledby="recuperacao-titulo">
        <div className="grid gap-10 border-t border-line pt-16 md:pt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="recuperacao-titulo" className="t-h2">
              {recuperacao.titulo}
            </h2>
            {recuperacao.paragrafos.map((p) => (
              <p key={p} className="t-body measure mt-5 text-silver">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <MorphIcon />
          </div>
        </div>
        <div className="mt-12 rounded-[14px] border border-line bg-slate/40 p-5 md:p-10">
          <FluxoRecuperacao />
        </div>
      </section>

      {/* 2. Inferência de liquidez */}
      <section className="section-y border-t border-line" aria-labelledby="liquidez-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="liquidez-titulo" className="t-h2">
                {liquidez.titulo}
              </h2>
              <Badge>{liquidez.badge}</Badge>
            </div>
            <p className="t-body measure mt-5 text-paper">{liquidez.texto}</p>
            <p className="t-body measure mt-4 text-silver">{liquidez.nota}</p>
          </div>
          <div className="lg:col-span-7">
            <LiquidezIlustracao />
          </div>
        </div>
      </section>

      {/* 3. Retenção */}
      <section className="section-y border-t border-line" aria-labelledby="retencao-titulo">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="retencao-titulo" className="t-h2">
              {retencao.titulo}
            </h2>
            <p className="t-body measure mt-5 text-silver">{retencao.texto}</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="t-apoio text-paper">{retencao.sinaisTitulo}</h3>
                <ul className="mt-3 flex flex-col divide-y divide-line border-y border-line">
                  {retencao.sinais.map((s) => (
                    <li key={s} className="py-3 text-silver">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="t-apoio text-paper">{retencao.acoesTitulo}</h3>
                <ul className="mt-3 flex flex-col divide-y divide-line border-y border-line">
                  {retencao.acoes.map((a) => (
                    <li key={a} className="py-3 text-silver">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9 lg:self-center" aria-labelledby="compromisso-titulo">
            <div className="group rounded-[14px] border border-line bg-slate p-6 md:p-8">
              <IconShield size={30} className="text-paper" />
              <h3 id="compromisso-titulo" className="t-h3 mt-6">
                {retencao.compromisso.titulo}
              </h3>
              <p className="t-body mt-3 text-silver">{retencao.compromisso.texto}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. Medição */}
      <GrupoControle />

      {/* 5. Painel */}
      <section className="section-y border-t border-line" aria-labelledby="painel-titulo">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <h2 id="painel-titulo" className="t-h2">
                {painel.titulo}
              </h2>
              <p className="t-body measure mt-5 text-silver">{painel.texto}</p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Button to={painel.link.para} variant="link">
                {painel.link.rotulo}
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <PainelPrints />
          </div>
        </div>
      </section>

      {/* 6. Dados e limites */}
      <section className="section-y border-t border-line" aria-labelledby="dados-titulo">
        <div className="container-site">
          <h2 id="dados-titulo" className="t-h2">
            {dados.titulo}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {dados.itens.map((item) => {
              const Icone = ICONES_DADOS[item.id as keyof typeof ICONES_DADOS]
              return (
                <li key={item.id} className="group rounded-[14px] border border-line bg-slate p-6 transition-colors duration-300 hover:border-silver/30">
                  <Icone size={26} className="text-silver transition-colors group-hover:text-paper" />
                  <h3 className="t-h3 mt-8">{item.titulo}</h3>
                  <p className="t-apoio mt-3 text-silver">{item.texto}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
