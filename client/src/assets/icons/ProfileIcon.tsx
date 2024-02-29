import { IconProps } from '../../types/interfaces/IconProps'

export function ProfileIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" fillRule="evenodd" d="M8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm7.714 4.713a6 6 0 1 0-7.428 0A10.003 10.003 0 0 0 2 22h2a8 8 0 1 1 16 0h2c0-4.21-2.602-7.813-6.286-9.287Z" clipRule="evenodd" />
    </svg>
  )
}
