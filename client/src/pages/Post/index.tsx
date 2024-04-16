import './styles.scss'
import { Outlet } from 'react-router-dom'

export function Post(): JSX.Element {
  return (
    <div className="post-page content-page">
      <Outlet />
    </div>
  )
}
