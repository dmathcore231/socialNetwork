import './styles.scss'
import { useAppSelector } from '../../hooks'
import { Post } from '../../components/Post'

export function Posts(): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  const usersPosts = user?.userActivityData.posts?.slice().reverse()

  return (
    <div className="posts">

      {usersPosts?.map((post) => (
        <Post
          key={post._id}
          data={post}
        />
      ))}
    </div>
  )
}
