import './styles.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'

export function ProfileWall(): JSX.Element {
  const location = useLocation()

  return (
    <div className="profile-wall">
      <div className="wall-nav-bar">
        <div className="wall-nav-bar__item">
          <Link to="/profile"
            className={"wall-nav-bar__link title title_font_weight_bold " + (location.pathname === "/profile" ? "active" : "")}>
            Posts
          </Link>
        </div>
        <div className="wall-nav-bar__item">
          <Link to="/profile/answers"
            className={"wall-nav-bar__link title title_font_weight_bold " + (location.pathname === "/profile/answers" ? "active" : "")}>
            Answers
          </Link>
        </div>
        <div className="wall-nav-bar__item">
          <Link to="/profile/articles"
            className={"wall-nav-bar__link title title_font_weight_bold " + (location.pathname === "/profile/articles" ? "active" : "")}>
            Articles
          </Link>
        </div>
        <div className="wall-nav-bar__item">
          <Link to="/profile/media"
            className={"wall-nav-bar__link title title_font_weight_bold " + (location.pathname === "/profile/media" ? "active" : "")}>
            Media
          </Link>
        </div>
        <div className="wall-nav-bar__item">
          <Link to="/profile/like"
            className={"wall-nav-bar__link title title_font_weight_bold " + (location.pathname === "/profile/like" ? "active" : "")}>
            Like
          </Link>
        </div>
      </div>
      <div className="profile-wall__content">
        <Outlet />
      </div>
    </div>
  )
}
