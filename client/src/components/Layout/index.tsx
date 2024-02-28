import './styles.scss'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { Main } from '../Main'
import { Footer } from '../Footer'
import { NavBar } from '../NavBar'

export function Layout(): JSX.Element {
  return (
    <div className="layout container">
      <div className='layout__wrapper'>
        <Header >
          <NavBar />
        </Header>
        <Main>
          <Outlet />
        </Main>
      </div>
      <Footer />
    </div>
  )
}
