import './styles.scss'
import { Btn } from '../Btn'

export function FloatingActionButton(): JSX.Element {
  return (
    <div className="floating-action-button">
      <Btn
        type="button"
        className="btn_primary btn_primary_hover_color"
        onClick={() => console.log('click')}
      >
        Post
      </Btn>
    </div>
  )
}
