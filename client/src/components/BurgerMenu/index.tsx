import './styles.scss'
import { useRef, useEffect } from 'react'
import { Btn } from '../Btn'
import { BurgerMenuProps } from '../../types/interfaces/BurgerMenu'
import { BurgerMenuIcon } from '../../assets/icons/BurgerMenuIcon'


export function BurgerMenu({ isActive, setIsActive, children }: BurgerMenuProps): JSX.Element {
  const burgerMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive, setIsActive])

  return (
    <div className="burger-menu">
      <Btn
        type="button"
        className="btn_transparent"
        onClick={() => setIsActive(prev => !prev)}
      >
        <BurgerMenuIcon width="24px" height="24px" />
      </Btn>
      <div
        ref={burgerMenuRef}
        className={"burger-menu-nav" + (isActive ? " burger-menu-nav_active" : "")}>
        {children}
      </div>
    </div>
  )
}
