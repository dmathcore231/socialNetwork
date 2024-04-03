import './styles.scss'
import { useAppSelector } from '../../hooks'
import { Post } from '../../components/Post'

export function Posts(): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  return (
    <div className="posts">

      {user?.userActivityData.posts?.map((post) => (
        <Post
          key={post._id}
          data={post}
        />
      ))}
    </div>
  )
}
