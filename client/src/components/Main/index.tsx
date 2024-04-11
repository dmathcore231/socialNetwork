import './styles.scss'
import { MainProps } from '../../types/interfaces/MainProps'
import { Aside } from '../Aside'

export function Main({ children }: MainProps): JSX.Element {
  return (
    <main className="main">
      {children}
      <Aside />
    </main >
  )
}
