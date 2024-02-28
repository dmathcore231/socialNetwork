import './styles.scss'
import { MainProps } from '../../types/interfaces/MainProps'

export function Main({ children }: MainProps): JSX.Element {

  return (
    <main className="main">
      {children}
    </main>
  )
}
