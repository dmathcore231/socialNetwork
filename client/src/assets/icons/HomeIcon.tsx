import { IconProps } from '../../types/interfaces/IconProps'

export function HomeIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#inherit" fill-rule="evenodd" d="M10.72 1.765a2 2 0 0 1 2.56 0l7.64 6.367A3 3 0 0 1 22 10.437V19a3 3 0 0 1-3 3h-3.5a1.5 1.5 0 0 1-1.5-1.5V14h-4v6.5A1.5 1.5 0 0 1 8.5 22H5a3 3 0 0 1-3-3v-8.563a3 3 0 0 1 1.08-2.305l7.64-6.367Zm8.92 7.904L12 3.302 4.36 9.669a1 1 0 0 0-.36.768V19a1 1 0 0 0 1 1h3v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6h3a1 1 0 0 0 1-1v-8.563a1 1 0 0 0-.36-.768Z" clip-rule="evenodd" />
    </svg>
  )
}
