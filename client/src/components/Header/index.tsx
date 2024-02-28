import './styles.scss'
import { HeaderProps } from '../../types/interfaces/HeaderProps'

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      {children}
    </header>
  )
}
