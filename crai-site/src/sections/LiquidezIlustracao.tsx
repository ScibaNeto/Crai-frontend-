import { useConteudo } from '../lib/i18n'
import { cx } from '../lib/cx'

// Forma ilustrativa do saldo ao longo do mês (sem valores exibidos).
const SALDO = [16, 24, 82, 66, 52, 40, 28]
const FIXA = 0
const JANELA = 2

export function LiquidezIlustracao() {
  const { ilustracao } = useConteudo().produto.liquidez
  return (
    <figure className="rounded-[14px] border border-line bg-slate p-5 md:p-8">
      <p className="sr-only">
        {ilustracao.titulo}. {ilustracao.descricao}
      </p>
      <div aria-hidden="true">
        <div className="t-apoio flex flex-wrap items-center gap-x-6 gap-y-2 text-silver">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-graphite" />
            {ilustracao.saldo}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-orange" />
            {ilustracao.janela}
          </span>
        </div>

        <div className="mt-8 grid h-52 grid-cols-7 items-end gap-2 border-b border-graphite md:h-60 md:gap-3">
          {SALDO.map((altura, i) => (
            <div key={ilustracao.dias[i]} className="relative flex h-full flex-col justify-end">
              {i === FIXA ? (
                <span className="absolute bottom-[calc(16%+10px)] left-0 w-max max-w-[9rem] rounded-[4px] border border-line bg-ink px-2 py-1 text-[12px] leading-[1.3] text-silver">
                  {ilustracao.fixa}
                </span>
              ) : null}
              {i === JANELA ? (
                <span className="absolute left-1/2 w-max -translate-x-1/2 rounded-[4px] border border-orange/50 bg-ink px-2 py-1 text-[12px] leading-[1.3] text-paper" style={{ bottom: `calc(${altura}% + 10px)` }}>
                  {ilustracao.janela}
                </span>
              ) : null}
              <div
                className={cx('w-full rounded-t-[3px]', i === JANELA ? 'bg-orange' : 'bg-graphite/70')}
                style={{ height: `${altura}%` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2 md:gap-3">
          {ilustracao.dias.map((dia) => (
            <span key={dia} className="text-center font-mono text-[11px] text-silver">
              {dia}
            </span>
          ))}
        </div>
      </div>
    </figure>
  )
}
