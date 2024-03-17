import './styles.scss'
import { Link } from 'react-router-dom'
import { MainProps } from '../../types/interfaces/MainProps'
import { Btn } from '../Btn'

export function Main({ children }: MainProps): JSX.Element {

  return (
    <main className="main">
      {children}
      <aside className='main__aside'>
        Aside Content
        <Btn
          type='button'
          className='btn_primary'
          onClick={() => console.log('click')}
        >
          Button
        </Btn>
        <Link to="authorization">Authorization</Link>
      </aside>
    </main>
  )
}
