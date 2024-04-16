import "./styles.scss"
import { NavLink } from "react-router-dom"
import { FloatingActionButton } from "../FloatingActionButton"
import { SIZE_ICON_MD } from "../../helpers"
import { HomeIcon } from "../../assets/icons/HomeIcon"
import { NotificationsIcon } from "../../assets/icons/NotificationsIcon"
import { MessagesIcon } from "../../assets/icons/MessagesIcon"
import { SearchIcon } from "../../assets/icons/SearchIcon"

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__item">
        <NavLink to='/' className="footer__link">
          <HomeIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to='/search' className="footer__link">
          <SearchIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to='/notifications' className="footer__link">
          <NotificationsIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to="/messages" className="footer__link">
          <MessagesIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
        </NavLink>
      </div>
      <FloatingActionButton />
    </footer>
  )
}
