import { IconProps } from '../../types/interfaces/IconProps'

export function ReportIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 01-8-8 7.92 7.92 0 011.69-4.9L16.9 18.31A7.92 7.92 0 0112 20zm6.31-3.1L7.1 5.69A7.92 7.92 0 0112 4a8 8 0 018 8 7.92 7.92 0 01-1.69 4.9z" fill="inherit" />
    </svg>
  )
}
