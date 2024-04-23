import { IconProps } from '../../types/interfaces/IconProps'

export function ArrowRightIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.92 11.62a1.001 1.001 0 00-.21-.33l-5-5a1.003 1.003 0 10-1.42 1.42l3.3 3.29H7a1 1 0 000 2h7.59l-3.3 3.29a1.001 1.001 0 00.325 1.639 1 1 0 001.095-.22l5-5a1 1 0 00.21-.33 1 1 0 000-.76z" fill="inherit" />
    </svg>
  )
}
