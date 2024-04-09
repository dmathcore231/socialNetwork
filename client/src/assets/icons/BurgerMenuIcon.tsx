import { IconProps } from '../../types/interfaces/IconProps'

export function BurgerMenuIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8h18a1 1 0 100-2H3a1 1 0 000 2zm18 8H3a1 1 0 000 2h18a1 1 0 000-2zm0-5H3a1 1 0 000 2h18a1 1 0 000-2z" fill="inherit" />
    </svg>
  )
}
