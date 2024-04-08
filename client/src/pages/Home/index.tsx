import './styles.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchGetAllPosts } from '../../redux/homeSlice'
import { Post } from '../../components/Post'
import { setToken } from '../../redux/userSlice'
import { getDataFromLocalStorage } from '../../helpers'

export function Main(): JSX.Element {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(state => state.home)

  useEffect(() => {
    dispatch(fetchGetAllPosts())
    dispatch(setToken(getDataFromLocalStorage('token'))) // need test (update token) + need added new useEffect (setToken + state token)
  }, [dispatch])

  return (
    <div className='home content-page'>

      {posts!.map((post) => (
        <Post
          key={post._id}
          data={post}
        />
      ))}
    </div>
  )
}
