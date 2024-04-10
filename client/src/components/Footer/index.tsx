import "./styles.scss"
import { NavLink } from "react-router-dom"
import { FloatingActionButton } from "../FloatingActionButton"
import { HomeIcon } from "../../assets/icons/HomeIcon"
import { NotificationsIcon } from "../../assets/icons/NotificationsIcon"
import { MessagesIcon } from "../../assets/icons/MessagesIcon"
import { SearchIcon } from "../../assets/icons/SearchIcon"

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__item">
        <NavLink to='/' className="footer__link">
          <HomeIcon width='24px' height='24px' />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to='/search' className="footer__link">
          <SearchIcon width='24px' height='24px' />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to='/notifications' className="footer__link">
          <NotificationsIcon width='24px' height='24px' />
        </NavLink>
      </div>
      <div className="footer__item">
        <NavLink to="/messages" className="footer__link">
          <MessagesIcon width="24px" height="24px" />
        </NavLink>
      </div>
      <FloatingActionButton />
    </footer>
  )
}
