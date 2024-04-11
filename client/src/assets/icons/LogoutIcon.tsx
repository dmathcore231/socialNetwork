import { IconProps } from '../../types/interfaces/IconProps'

export function LogoutIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12a1 1 0 00-1-1h-7.59l2.3-2.29A1.005 1.005 0 0013 6.996a1.004 1.004 0 00-.71.294l-4 4a1 1 0 00-.21.33 1 1 0 000 .76 1 1 0 00.21.33l4 4a1.002 1.002 0 001.639-.325 1 1 0 00-.219-1.095L11.41 13H19a1 1 0 001-1zM17 2H7a3 3 0 00-3 3v14a3 3 0 003 3h10a3 3 0 003-3v-3a1 1 0 00-2 0v3a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v3a1 1 0 002 0V5a3 3 0 00-3-3z" fill="inherit" />
    </svg>
  )
}

