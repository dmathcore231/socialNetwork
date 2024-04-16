import "./styles.scss"
import { NavLink } from "react-router-dom"
import { FloatingActionButton } from "../FloatingActionButton"
import { defaultSizeIcon } from "../../helpers"
import { HomeIcon } from "../../assets/icons/HomeIcon"
import { NotificationsIcon } from "../../assets/icons/NotificationsIcon"
import { MessagesIcon } from "../../assets/icons/MessagesIcon"
import { SearchIcon } from "../../assets/icons/SearchIcon"

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__item">
        <NavLink to='/' className="footer__link">
          <HomeIcon width={defaultSizeIcon} height={defaultSizeIcon} />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to='/search' className="footer__link">
          <SearchIcon width={defaultSizeIcon} height={defaultSizeIcon} />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to='/notifications' className="footer__link">
          <NotificationsIcon width={defaultSizeIcon} height={defaultSizeIcon} />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to="/messages" className="footer__link">
          <MessagesIcon width={defaultSizeIcon} height={defaultSizeIcon} />
        </NavLink>
      </div>
      <FloatingActionButton />
    </footer>
  )
}
