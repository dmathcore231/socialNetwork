import './styles.scss'
import { NavLink } from 'react-router-dom'
import { HomeIcon } from '../../assets/icons/HomeIcon'
import { NotificationsIcon } from '../../assets/icons/NotificationsIcon'
import { MessagesIcon } from '../../assets/icons/MessagesIcon'
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon'
import { ProfileIcon } from '../../assets/icons/ProfileIcon'
import { CommunitiesIcon } from '../../assets/icons/CommunitiesIcon'

export function NavBar(): JSX.Element {
  return (
    <nav className='nav-bar'>
      <div className='nav-bar__logo'>
        <h1>Logo</h1>
      </div>
      <ul className='nav-bar__list'>
        <li className='nav-bar__item'>
          <NavLink to='/' className='nav-bar__link'>
            <HomeIcon width='24px' height='24px' />
            <h4>Home</h4>
          </NavLink>
        </li>
        <li className='nav-bar__item'>
          <NavLink to='#' className='nav-bar__link'>
            <NotificationsIcon width='24px' height='24px' />
            <h4>Notifications</h4>
          </NavLink>
        </li>
        <li className='nav-bar__item'>
          <NavLink to='#' className='nav-bar__link'>
            <MessagesIcon width='24px' height='24px' />
            <h4>Messages</h4>
          </NavLink>
        </li>
        <li className='nav-bar__item'>
          <NavLink to='#' className='nav-bar__link'>
            <BookmarkIcon width='24px' height='24px' />
            <h4>Bookmarks</h4>
          </NavLink>
        </li>
        <li className='nav-bar__item'>
          <NavLink to='#' className='nav-bar__link'>
            <ProfileIcon width='24px' height='24px' />
            <h4>Profile</h4>
          </NavLink>
        </li>
        <li className='nav-bar__item'>
          <NavLink to='#' className='nav-bar__link'>
            <CommunitiesIcon width='24px' height='24px' />
            <h4>Communities</h4>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
