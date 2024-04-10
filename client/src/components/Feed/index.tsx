import './styles.scss'
import { Outlet } from 'react-router-dom'
import { Tabs } from '../Tabs'

export function Feed(): JSX.Element {
  return (
    <div className="feed">
      <div className="feed-nav-bar">
        <Tabs tabName={[
          { name: 'Posts', path: '/profile' },
          { name: 'Answers', path: '/profile/answers' },
          { name: 'Articles', path: '/profile/articles' },
          { name: 'Media', path: '/profile/media' },
          { name: 'Like', path: '/profile/like' },
        ]} />
      </div>
      <div className="feed__content">
        <Outlet />
      </div>
    </div>
  )
}
