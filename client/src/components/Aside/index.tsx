import './styles.scss'
import { Link } from 'react-router-dom'
import { Btn } from '../Btn'

export function Aside(): JSX.Element {
  return (
    <aside className="aside">
      Aside Content
      <Btn
        type="button"
        className="btn_primary"
        onClick={() => console.log('click')}
      >
        Button
      </Btn>
      <Link to="authorization">Authorization</Link>
    </aside>
  )
}
