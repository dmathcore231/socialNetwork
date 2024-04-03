import './styles.scss'
import { Post } from '../../components/Post'

export function Main(): JSX.Element {
  return (
    <div className='home content-page'>
      main
      {/* <Post
        data={{
          _id: '1post',
          timeStamp: 100,
          text: 'Text post Test',
          user: {
            _id: '1user',
            userName: 'User Name',
            userTag: 'User Tag',
            userAvatar: '#'
          },
          statPost: {
            comments: 20,
            reposts: 127,
            likes: 386,
            viewed: 500
          }
        }}
      /> */}
    </div>
  )
}
