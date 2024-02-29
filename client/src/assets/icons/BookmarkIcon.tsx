import { IconProps } from '../../types/interfaces/IconProps'

export function BookmarkIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" fillRule="evenodd" d="M7 5v13.865l5-4.167 5 4.167V5H7Zm-2-.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5v15.433c0 1.271-1.483 1.966-2.46 1.152L12 17.302l-4.54 3.783c-.977.814-2.46.12-2.46-1.152V4.5Z" clipRule="evenodd" />
    </svg>
  )
}
