import { IconProps } from '../../types/interfaces/IconProps'

export function MoreIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </svg>
  )
}
