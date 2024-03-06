import './style.scss'
import { AvatarContainerProps } from '../../types/interfaces/AvatarContainerProps'

export function AvatarContainer({ children, className }: AvatarContainerProps): JSX.Element {

  return (
    <div className={"avatar" + (className ? " " + className : "")}>
      {children}
    </div>
  )
}
