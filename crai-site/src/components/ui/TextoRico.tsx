import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// **negrito** ou [rótulo](/rota). Colchetes sem (url) logo depois ficam como texto (ex.: [RAZÃO SOCIAL]).
const MARCACAO = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

interface TextoRicoProps {
  texto: string
  /** Links abrem em outra aba — para não perder o que já foi preenchido num formulário. */
  novaAba?: boolean
}

/** Renderiza a marcação mínima usada no copy: negrito e links internos. */
export function TextoRico({ texto, novaAba = false }: TextoRicoProps) {
  const partes: ReactNode[] = []
  let ultimo = 0
  for (const m of texto.matchAll(MARCACAO)) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index))
    if (m[1] !== undefined) {
      partes.push(
        <strong key={m.index} className="font-[600] text-paper">
          {m[1]}
        </strong>,
      )
    } else {
      partes.push(
        <Link
          key={m.index}
          to={m[3]}
          className="text-link"
          {...(novaAba ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {m[2]}
        </Link>,
      )
    }
    ultimo = m.index + m[0].length
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo))
  return <>{partes}</>
}
