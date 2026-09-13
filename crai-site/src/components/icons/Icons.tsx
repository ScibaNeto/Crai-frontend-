import type { ReactNode, SVGProps } from 'react'

// Ícones 24px desenhados à mão. Paths com .icon-draw completam o traço no hover do card (.group);
// paths com .icon-slide deslizam. pathLength={1} normaliza o tracejado.

export type IconProps = SVGProps<SVGSVGElement> & { titulo?: string; size?: number }

function Icon({ titulo, size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={titulo ? undefined : true}
      role={titulo ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {titulo ? <title>{titulo}</title> : null}
      {children}
    </svg>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path className="icon-slide" d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  )
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path className="icon-slide" d="M7 17L17 7M9 7h8v8" />
    </Icon>
  )
}

export function IconCardFail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18" />
      <path className="icon-draw" pathLength={1} d="M14 13.5l3.5 3.5M17.5 13.5L14 17" />
    </Icon>
  )
}

export function IconClockRetry(props: IconProps) {
  return (
    <Icon {...props}>
      <circle className="icon-draw" pathLength={1} cx="12" cy="12" r="8.5" transform="rotate(-90 12 12)" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  )
}

export function IconExit(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H13" />
      <path className="icon-slide" d="M10 12h10M17 9l3 3-3 3" />
    </Icon>
  )
}

export function IconPlug(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 7V3.5M15 7V3.5" />
      <path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0V7z" />
      <path className="icon-draw" pathLength={1} d="M12 16v4.5" />
    </Icon>
  )
}

export function IconForecast(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 19.5h16" />
      <path className="icon-draw" pathLength={1} d="M4 15l4.5-4.5 3 3 5-6L20 10" />
    </Icon>
  )
}

export function IconBolt(props: IconProps) {
  return (
    <Icon {...props}>
      <path className="icon-draw" pathLength={1} d="M13 3L5.5 13.5h6L10.5 21 18.5 10h-6L13 3z" />
    </Icon>
  )
}

export function IconScale(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v16M7.5 20h9M5 7.5h14" />
      <path className="icon-draw" pathLength={1} d="M5 7.5L2.5 13a2.5 2.5 0 0 0 5 0L5 7.5zM19 7.5L16.5 13a2.5 2.5 0 0 0 5 0L19 7.5z" />
    </Icon>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  )
}

export function IconChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  )
}

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8h16M4 16h16" />
    </Icon>
  )
}

export function IconClose(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  )
}

export function IconRefresh(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 4.5v4h-4" />
    </Icon>
  )
}

export function IconUserSignal(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10" cy="8.5" r="3.5" />
      <path d="M3.5 19.5a6.5 6.5 0 0 1 13 0" />
      <path d="M19 7v5M19 15.5v.5" />
    </Icon>
  )
}

export function IconFile(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5z" />
      <path d="M14 3.5V8h4.5" />
      <path className="icon-draw" pathLength={1} d="M9 13h6M9 16.5h4" />
    </Icon>
  )
}

export function IconShield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5l7 2.5v5.5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-2.5z" />
      <path className="icon-draw" pathLength={1} d="M9 12l2 2 4-4" />
    </Icon>
  )
}

export function IconCardOff(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18" />
      <path className="icon-draw" pathLength={1} d="M4 20L20 4" />
    </Icon>
  )
}

export function IconSwap(props: IconProps) {
  return (
    <Icon {...props}>
      <path className="icon-slide" d="M4 8.5h14M15 5.5l3 3-3 3" />
      <path d="M20 15.5H6M9 12.5l-3 3 3 3" />
    </Icon>
  )
}
