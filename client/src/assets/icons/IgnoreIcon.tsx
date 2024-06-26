import { IconProps } from '../../types/interfaces/IconProps'

export function IgnoreIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10.94 6.08A6.93 6.93 0 0112 6c3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 01-.9 1.64 1 1 0 00.05 1.152 1 1 0 001.65-.102 15.77 15.77 0 001.21-2.3.999.999 0 000-.79C19.9 6.91 16.1 4 12 4a7.77 7.77 0 00-1.4.12 1.014 1.014 0 10.34 2v-.04zM3.71 2.29a1.004 1.004 0 10-1.42 1.42l3.1 3.09a14.62 14.62 0 00-3.31 4.8 1 1 0 000 .8C4.1 17.09 7.9 20 12 20a9.26 9.26 0 005.05-1.54l3.24 3.25a.999.999 0 001.42 0 1 1 0 000-1.42l-18-18zm6.36 9.19l2.45 2.45a2 2 0 01-2.45-2.45zM12 18c-3.18 0-6.17-2.29-7.9-6a12.09 12.09 0 012.7-3.79L8.57 10A4 4 0 0014 15.43L15.59 17A7.24 7.24 0 0112 18z" fill="inherit" />
    </svg>
  )
}
