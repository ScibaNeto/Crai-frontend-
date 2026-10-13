import { Card } from '../../components/ui/Card'
import { t } from '../../lib/idioma'

/**
 * "Como a API funciona": o contexto da API na própria aba, para quem chega sem saber o que ela
 * faz (pedido do professor do TCC, 13/10/2026). Cada frase foi conferida contra o backend:
 * `api/clientes.py`, `POST /eventos` em `api/app.py`, `api/eventos_recebidos.py` e
 * `api/integracao.py`. Mudou uma regra lá, muda o texto aqui.
 *
 * O texto fica em português; o cartão passa cada um por `t()` na hora de mostrar (o inglês
 * está em `i18n/en/ciclos.ts`). O teste `telas.api.test.tsx` confere que todos têm tradução.
 */
export const COMO_A_API_FUNCIONA = {
  titulo: 'Como a API funciona',
  abertura: 'O caminho de cada chamada, do seu sistema até o painel.',
  passos: {
    titulo: 'O caminho de uma chamada',
    itens: [
      {
        titulo: 'O seu sistema envia',
        texto: 'A chamada sai do servidor da sua empresa, com a chave no cabeçalho Authorization.',
      },
      {
        titulo: 'A CRAI confere a chave',
        texto: 'É a chave que diz de qual empresa é a chamada. Nada no corpo escolhe a empresa.',
      },
      {
        titulo: 'Os dados são validados',
        texto: 'Com as mesmas regras da planilha. Um campo errado volta com o nome do campo e o motivo.',
      },
      {
        titulo: 'A base e o risco se atualizam',
        texto: 'O cliente passa a contar no cálculo de risco da sua base e aparece neste painel.',
      },
    ],
  },
  chamadas: {
    titulo: 'O que cada chamada faz',
    itens: [
      {
        metodo: 'POST',
        caminho: '/clientes',
        texto: 'Cadastra um cliente. Se ele já existe, atualiza os dados dele.',
      },
      {
        metodo: 'POST',
        caminho: '/clientes/lote',
        texto: 'Envia vários clientes de uma vez. Uma linha com erro volta em "rejeitados", com o motivo; as outras entram.',
      },
      {
        metodo: 'PATCH',
        caminho: '/clientes/{id}',
        texto: 'Muda só o que veio, como o plano ou a mensalidade. O histórico de uso do cliente fica como está.',
      },
      {
        metodo: 'DELETE',
        caminho: '/clientes/{id}',
        texto: 'Avisa que o cliente cancelou. Ele sai da lista de risco, mas o registro fica: é ele que ensina o sistema a reconhecer os próximos.',
      },
      {
        metodo: 'POST',
        caminho: '/eventos',
        texto: 'Avisa o que o cliente fez, como abrir a página de cancelamento. O evento passa pela análise de risco, e a CRAI decide se faz uma oferta, pelas regras da sua configuração.',
      },
    ],
  },
  regras: {
    titulo: 'Regras que protegem a integração',
    itens: [
      'Cada chave enxerga só os clientes da sua empresa. Um cliente de outra empresa responde como se não existisse.',
      'Um reenvio não conta duas vezes: nos eventos, pelo messageId (por 30 dias); nos clientes, pelo cabeçalho Idempotency-Key (por 7 dias).',
      'Até 600 eventos por minuto por chave. Acima disso, a resposta diz em quantos segundos tentar de novo.',
      'Até 5 chaves ativas por empresa, só no plano Premium. Uma chave revogada para de funcionar na hora.',
      'A API só informa a CRAI. Quem decide se e quando falar com o cliente é a CRAI, e a mensagem segue o modo de envio da sua configuração.',
    ],
  },
  respostas: {
    titulo: 'Respostas que o seu sistema pode receber',
    itens: [
      { codigo: '200 / 201', texto: 'Deu certo.' },
      { codigo: '401', texto: 'Chave ausente, errada ou revogada.' },
      { codigo: '404', texto: 'Cliente não encontrado nesta empresa.' },
      { codigo: '409', texto: 'Conflito, como um id de recorrência já ligado a outro cliente.' },
      { codigo: '413', texto: 'Lote grande demais. Divida em partes menores.' },
      { codigo: '422', texto: 'Dado inválido. A resposta diz o campo e o motivo.' },
      { codigo: '429', texto: 'Limite de eventos atingido. Espere o tempo indicado e envie de novo.' },
    ],
  },
} as const

/** Todos os textos do cartão, para o teste conferir a tradução. */
export function textosDoComoFunciona(): string[] {
  const c = COMO_A_API_FUNCIONA
  return [
    c.titulo,
    c.abertura,
    c.passos.titulo,
    ...c.passos.itens.flatMap((p) => [p.titulo, p.texto]),
    c.chamadas.titulo,
    ...c.chamadas.itens.map((i) => i.texto),
    c.regras.titulo,
    ...c.regras.itens,
    c.respostas.titulo,
    ...c.respostas.itens.map((i) => i.texto),
  ]
}

const subtitulo = 'text-apoio font-[640] text-paper'
const codigo = 'tabular shrink-0 rounded-[6px] border border-line bg-ink/60 px-1.5 py-0.5 text-rotulo text-paper/90'

/** O cartão "Como a API funciona", aberto na própria aba. */
export function CartaoComoFunciona() {
  const c = COMO_A_API_FUNCIONA
  return (
    <Card as="section" className="p-5 md:p-6" aria-label={t(c.titulo)}>
      <h3 className="t-h3 text-paper">{t(c.titulo)}</h3>
      <p className="t-apoio mt-1 text-silver">{t(c.abertura)}</p>

      <div className="mt-5 flex flex-col gap-6">
        <div>
          <h4 className={subtitulo}>{t(c.passos.titulo)}</h4>
          <ol className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {c.passos.itens.map((passo, i) => (
              <li key={passo.titulo} className="flex items-start gap-3 rounded-[12px] border border-line bg-ink/40 p-3">
                <span aria-hidden="true" className="tabular grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange/20 text-rotulo font-[640] text-orange">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-apoio font-[600] text-paper">{t(passo.titulo)}</span>
                  <span className="text-rotulo leading-[1.5] text-silver">{t(passo.texto)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className={subtitulo}>{t(c.chamadas.titulo)}</h4>
          <ul className="mt-3 flex flex-col gap-2.5">
            {c.chamadas.itens.map((chamada) => (
              <li key={`${chamada.metodo} ${chamada.caminho}`} className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-3">
                <code className={`${codigo} md:w-[190px]`}>
                  {chamada.metodo} {chamada.caminho}
                </code>
                <span className="text-apoio leading-[1.55] text-silver">{t(chamada.texto)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={subtitulo}>{t(c.regras.titulo)}</h4>
          <ul className="mt-2 flex flex-col gap-1.5">
            {c.regras.itens.map((regra) => (
              <li key={regra} className="flex items-start gap-2 text-apoio leading-[1.55] text-silver">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                <span>{t(regra)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={subtitulo}>{t(c.respostas.titulo)}</h4>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {c.respostas.itens.map((resposta) => (
              <li key={resposta.codigo} className="flex items-baseline gap-3">
                <code className={`${codigo} w-[88px] text-center`}>{resposta.codigo}</code>
                <span className="text-apoio leading-[1.5] text-silver">{t(resposta.texto)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
