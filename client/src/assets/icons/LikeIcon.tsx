import { IconProps } from '../../types/interfaces/IconProps'

export function LikeIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.269 6.269 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3 4.25 4.25 0 0 1 3 1.25 1 1 0 0 0 1.42 0 4.27 4.27 0 0 1 6 6.05h.08Z" />
    </svg>
  )
}
