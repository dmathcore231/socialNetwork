import { IconProps } from '../../types/interfaces/IconProps'

export function RepostIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M5.5 17.5H4v-11h7.8l-.8.79a1 1 0 0 0 1.41 1.42l2.5-2.5a1 1 0 0 0 0-1.42l-2.5-2.5A1 1 0 1 0 11 3.71l.79.79H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h2.5a1 1 0 0 0 0-2ZM21 4.5h-2.5a1 1 0 1 0 0 2H20v11h-8.37l.79-.79a1.001 1.001 0 1 0-1.41-1.42l-2.5 2.5a.999.999 0 0 0 0 1.42l2.5 2.5a1 1 0 0 0 1.41-1.42l-.79-.79H21a1 1 0 0 0 1-1v-13a1 1 0 0 0-1-1Z" />
    </svg>
  )
}
