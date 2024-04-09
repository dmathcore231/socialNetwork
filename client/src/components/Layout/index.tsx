import './styles.scss'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { fetchGetUserDataByToken } from '../../redux/userSlice'
import { getDataFromLocalStorage } from '../../helpers'
import { Header } from '../Header'
import { Main } from '../Main'
import { Footer } from '../Footer'
import { NavBar } from '../NavBar'
import { Aside } from '../Aside'

export function Layout(): JSX.Element {
  const dispatch = useAppDispatch()
  const token = getDataFromLocalStorage('token')

  useEffect(() => {
    if (token) {
      dispatch(fetchGetUserDataByToken())
    }
  })

  return (
    <div className="layout container">
      <Header >
        <NavBar />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Aside />
      <Footer />
    </div>
  )
}
