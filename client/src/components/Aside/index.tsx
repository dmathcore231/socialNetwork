import './styles.scss'
import { Link } from 'react-router-dom'
import { Btn } from '../Btn'

export function Aside(): JSX.Element {
  return (
    <aside className="aside">
      <div className="aside__item">
        <Btn
          type="button"
          className="btn_primary"
          onClick={() => console.log('click')}
        >
          Subscribe
        </Btn>
      </div>

      <Link to="authorization">Authorization</Link>
    </aside>
  )
}
