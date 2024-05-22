import './styles.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchGetUserDataByToken } from '../../redux/userSlice'
import { Post } from '../../components/Post'

export function Like(): JSX.Element {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.user)
  const { post } = useAppSelector(state => state.post)

  useEffect(() => {
    dispatch(fetchGetUserDataByToken())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchGetUserDataByToken())
  }, [post, dispatch])

  function renderLikesPost() {
    if (user && user.userActivityData.likes.length > 0) {
      return (
        user.userActivityData.likes.slice()
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
        <div className="like__empty">
          You haven't liked any posts yet
        </div>
      )
    }
  }

  return (
    <div className="like">
      {renderLikesPost()}
    </div>
  )
}
