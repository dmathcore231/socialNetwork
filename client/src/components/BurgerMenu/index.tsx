import './styles.scss'
import { useRef, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Btn } from '../Btn'
import { MiniProfile } from '../MiniProfile'
import { BurgerMenuProps } from '../../types/interfaces/BurgerMenu'
import { BurgerMenuIcon } from '../../assets/icons/BurgerMenuIcon'
import { HomeIcon } from '../../assets/icons/HomeIcon'
import { NotificationsIcon } from '../../assets/icons/NotificationsIcon'
import { MessagesIcon } from '../../assets/icons/MessagesIcon'
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon'
import { ProfileIcon } from '../../assets/icons/ProfileIcon'
import { CommunitiesIcon } from '../../assets/icons/CommunitiesIcon'


export function BurgerMenu({ isActive, setIsActive, btnBurger, shadowUnderMenu }: BurgerMenuProps): JSX.Element {
  const [isAnimated, setIsAnimated] = useState(false)

  const burgerMenuNavRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isActive
        && burgerMenuNavRef.current
        && !burgerMenuNavRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isActive, setIsActive])

  useEffect(() => {
    let timer: number | undefined;

    if (isActive) {
      setIsAnimated(true)
      timer = setTimeout(() => {
        setIsAnimated(false)
      }, 100);
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className={"burger-menu" + (shadowUnderMenu && isActive ? " burger-menu_shadow" : "")}>
      {btnBurger
        ? (<Btn
          type="button"
          className="btn_transparent"
          onClick={() => setIsActive(prev => !prev)}
        >
          <BurgerMenuIcon width="24px" height="24px" />
        </Btn>)
        : null}
      <div
        ref={burgerMenuNavRef}
        className={"burger-menu-nav"
          + (isActive && !isAnimated ? " burger-menu-nav_active" : "")
          + (isAnimated ? " burger-menu-nav_animation_fadeIn" : "")
        }>
        <MiniProfile />
        <ul className="burger-menu-nav__list">
          <li className="burger-menu-nav__item">
            <NavLink to='/' className="burger-menu-nav__link">
              <HomeIcon width='24px' height='24px' />
              <h4>Home</h4>
            </NavLink>
          </li>
          <li className="burger-menu-nav__item">
            <NavLink to="/notifications" className="burger-menu-nav__link">
              <NotificationsIcon width='24px' height='24px' />
              <h4>Notifications</h4>
            </NavLink>
          </li>
          <li className="burger-menu-nav__item">
            <NavLink to="/messages" className="burger-menu-nav__link">
              <MessagesIcon width='24px' height='24px' />
              <h4>Messages</h4>
            </NavLink>
          </li>
          <li className="burger-menu-nav__item">
            <NavLink to="/bookmarks" className="burger-menu-nav__link">
              <BookmarkIcon width='24px' height='24px' />
              <h4>Bookmarks</h4>
            </NavLink>
          </li>
          <li className="burger-menu-nav__item">
            <NavLink to="/profile" className="burger-menu-nav__link">
              <ProfileIcon width='24px' height='24px' />
              <h4>Profile</h4>
            </NavLink>
          </li>
          <li className="burger-menu-nav__item">
            <NavLink to="/communities" className="burger-menu-nav__link">
              <CommunitiesIcon width='24px' height='24px' />
              <h4>Communities</h4>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
