import { IconProps } from '../../types/interfaces/IconProps'

export function ArrowLeft({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M17 11H9.41l3.3-3.29a1.004 1.004 0 1 0-1.42-1.42l-5 5a1 1 0 0 0-.21.33 1 1 0 0 0 0 .76 1 1 0 0 0 .21.33l5 5a.999.999 0 0 0 1.42 0 1 1 0 0 0 0-1.42L9.41 13H17a1 1 0 1 0 0-2Z" />
    </svg>
  )
}
