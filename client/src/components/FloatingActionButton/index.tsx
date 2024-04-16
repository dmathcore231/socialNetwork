import './styles.scss'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { PostCreateIcon } from '../../assets/icons/PostCreateIcon'

export function FloatingActionButton(): JSX.Element {
  const breakPointSm = useMediaQuery({ query: '(max-width: 36rem)' })
  const sizeIcon = breakPointSm ? "24px" : "35px"

  return (
    <div className="floating-action-button">
      <Link to={"/post/create"}
        className="btn
        btn_primary btn_primary_hover_color btn_rounded btn_color_white">
        <PostCreateIcon width={sizeIcon} height={sizeIcon} />
      </Link>
    </div>
  )
}
