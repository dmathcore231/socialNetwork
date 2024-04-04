import './styles.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchGetAllPosts } from '../../redux/homeSlice'
import { Post } from '../../components/Post'


export function Main(): JSX.Element {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(state => state.home)

  useEffect(() => {
    dispatch(fetchGetAllPosts())
  }, [])

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
