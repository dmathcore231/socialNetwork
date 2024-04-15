import { IconProps } from '../../types/interfaces/IconProps'

export function PostCreateIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22 7.24a1 1 0 00-.29-.71l-4.24-4.24a1 1 0 00-.71-.29 1 1 0 00-.71.29l-2.83 2.83L2.29 16.05a1.001 1.001 0 00-.29.71V21a1 1 0 001 1h4.24a1.001 1.001 0 00.76-.29l10.87-10.93L21.71 8a1.19 1.19 0 00.22-.33c.01-.08.01-.16 0-.24a.697.697 0 000-.14l.07-.05zM6.83 20H4v-2.83l9.93-9.93 2.83 2.83L6.83 20zM18.17 8.66l-2.83-2.83 1.42-1.41 2.82 2.82-1.41 1.42z" fill="inherit" />
    </svg>
  )
}
