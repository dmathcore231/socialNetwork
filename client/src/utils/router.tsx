import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Main } from '../pages/Home'
import { Notifications } from '../pages/Notifications'
import { Messages } from '../pages/Messages'
import { Bookmarks } from '../pages/Bookmarks'
import { Profile } from '../pages/Profile'
import { Communities } from '../pages/Communities'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/communities",
        element: <Communities />,
      }
    ]
  }
])
