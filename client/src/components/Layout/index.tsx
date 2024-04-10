import './styles.scss'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { fetchGetUserDataByToken } from '../../redux/userSlice'
import { getDataFromLocalStorage } from '../../helpers'
import { Header } from '../Header'
import { Main } from '../Main'
import { Footer } from '../Footer'
import { NavBar } from '../NavBar'
import { Aside } from '../Aside'
import { BurgerMenu } from '../BurgerMenu'

export function Layout(): JSX.Element {
  const dispatch = useAppDispatch()
  const token = getDataFromLocalStorage('token')
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(fetchGetUserDataByToken())
    }
  })

  return (
    <div className="layout container">
      <BurgerMenu
        isActive={isActiveBurgerMenu}
        setIsActive={setIsActiveBurgerMenu}
        btnBurger={false}
        shadowUnderMenu={true}
      />
      <Header >
        <NavBar
          isActiveBurgerMenu={isActiveBurgerMenu}
          setIsActiveBurgerMenu={setIsActiveBurgerMenu} />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Aside />
      <Footer />
    </div>
  )
}
