import { IconProps } from '../../types/interfaces/IconProps'

export function SearchIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17 11a6 6 0 11-12 0 6 6 0 0112 0zm-1.094 6.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387z" fill="inherit" />
    </svg>
  )
}

