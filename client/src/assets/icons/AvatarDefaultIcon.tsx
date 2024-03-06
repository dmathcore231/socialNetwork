import { IconProps } from '../../types/interfaces/IconProps'

export function AvatarDefaultIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 68 54" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" fillRule="evenodd" d="M67.733 54H.267C5.374 40.332 18.55 30.6 34 30.6c15.45 0 28.626 9.732 33.733 23.4ZM47.5 14.4c0 7.953-6.044 14.4-13.5 14.4s-13.5-6.447-13.5-14.4S26.544 0 34 0s13.5 6.447 13.5 14.4Z" clipRule="evenodd" />
    </svg>
  )
}
