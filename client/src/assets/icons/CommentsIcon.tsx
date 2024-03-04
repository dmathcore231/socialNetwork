import { IconProps } from '../../types/interfaces/IconProps'

export function CommentsIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M17 7H7a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2Zm0 4H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2Zm2-9H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11.59l3.7 3.71A1 1 0 0 0 21 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 22 21V5a3 3 0 0 0-3-3Zm1 16.59-2.29-2.3A1 1 0 0 0 17 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13.59Z" />
    </svg>
  )
}
