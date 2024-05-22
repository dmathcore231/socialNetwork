import './styles.scss'
import { useAppSelector } from '../../hooks'
import { Post } from '../../components/Post'

export function Posts(): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  function renderPosts() {
    console.log(user?.userActivityData.posts)
    if (user && user.userActivityData.posts) {
      return (
        user.userActivityData.posts.slice()
          .reverse()
          .map((post) => (
            <Post
              key={post._id}
              data={post}
            />
          ))
      )
    } else {
      return (
        null
      )
    }
  }

  return (
    <div className="posts">
      {renderPosts()}
    </div>
  )
}
