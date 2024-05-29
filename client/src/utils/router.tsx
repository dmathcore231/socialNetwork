import { createBrowserRouter } from 'react-router-dom'
import { PrivateRouter } from './PrivateRouter'
import { Layout } from '../components/Layout'
import { Main } from '../pages/Home'
import { Notifications } from '../pages/Notifications'
import { Messages } from '../pages/Messages'
import { Bookmarks } from '../pages/Bookmarks'
import { Profile } from '../pages/Profile'
import { Communities } from '../pages/Communities'
import { Posts } from '../pages/Posts'
import { Answers } from '../pages/Answers'
import { Articles } from '../pages/Articles'
import { Media } from '../pages/Media'
import { Like } from '../pages/Like'
import { Authorization } from '../pages/Authorization'
import { Search } from '../pages/Search'
import { Post } from '../pages/Post'
import { CreatePost } from '../pages/Post/CreatePost'
import { EditPost } from '../pages/Post/EditPost'
import { CommentsPost } from '../pages/Post/CommentsPost'

export const router = createBrowserRouter([
  {
    element: <PrivateRouter redirectTo="/authorization">
      <Layout />
    </PrivateRouter>,
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
        path: "/search",
        element: <Search />,
      },
      {
        element: <Profile />,
        children: [
          {
            path: "/profile",
            element: <Posts />,
          },
          {
            path: "/profile/answers",
            element: <Answers />,
          },
          {
            path: "/profile/articles",
            element: <Articles />,
          },
          {
            path: "/profile/media",
            element: <Media />,
          },
          {
            path: "/profile/like",
            element: <Like />,
          }
        ]
      },
      {
        path: "/communities",
        element: <Communities />,
      },
      {
        element: <PrivateRouter redirectTo="/authorization">
          <Post />
        </PrivateRouter>,
        children: [
          {
            path: "/post/create",
            element: <CreatePost />
          },
          {
            path: "/post/edit/:id",
            element: <EditPost />
          },
          {
            path: "/post/comments/:id",
            element: <CommentsPost />
          }
        ]
      }
    ]
  },
  {
    path: "/authorization",
    element: <Authorization />,
  },
])
