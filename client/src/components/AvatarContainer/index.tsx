import './style.scss'
import { AvatarContainerProps } from '../../types/interfaces/AvatarContainerProps'

export function AvatarContainer({ children }: AvatarContainerProps): JSX.Element {

  return (
    <div className='avatar'>
      {children}
    </div>
  )
}
