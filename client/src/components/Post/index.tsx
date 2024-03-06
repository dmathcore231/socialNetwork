import './styles.scss'
import { PostProps } from '../../types/interfaces/PostProps'
import { AvatarContainer } from '../AvatarContainer'
import { CommentsIcon } from '../../assets/icons/CommentsIcon'
import { RepostIcon } from '../../assets/icons/RepostIcon'
import { LikeIcon } from '../../assets/icons/LikeIcon'
import { ViewedIcon } from '../../assets/icons/ViewedIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { Btn } from '../Btn'

export function Post({ data }: PostProps): JSX.Element {
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header__user">
          <span className="post-header__item">
            <AvatarContainer
              className='avatar_size_sm'
            >
              {data.user.userAvatar}
            </AvatarContainer>
          </span>
          <div className='post-header__wrapper-item'>
            <span className="post-header__item
          title title_size_lg"
            >
              {data.user.userName}
            </span>
            <span className="post-header__item
          title title_color_gray-500"
            >
              {data.user.userTag}
            </span>
            <span className="post-header__item">
              {data.timeStamp}
            </span>
          </div>
        </div>
        <div className='post-header__more'>
          <Btn
            type='button'
            className='btn__transparent'
            onClick={() => console.log('click more')}
          >
            <MoreIcon width='24px' height='24px' />
          </Btn>
        </div>
      </div>
      <div className="post-body">
        {data.text}
      </div>
      <div className='post-footer'>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn__transparent title'
            onClick={() => console.log('click comments')}
          >
            <CommentsIcon width='24px' height='24px' />
            {data.statPost.comments}
          </Btn>

        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn__transparent title'
            onClick={() => console.log('click reposts')}
          >
            <RepostIcon width='24px' height='24px' />
            {data.statPost.reposts}
          </Btn>
        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn__transparent title'
            onClick={() => console.log('click likes')}
          >
            <LikeIcon width='24px' height='24px' />
            {data.statPost.likes}
          </Btn>
        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn__transparent title'
            onClick={() => console.log('click viewed')}
          >
            <ViewedIcon width='24px' height='24px' />
            {data.statPost.viewed}
          </Btn>
        </span>
      </div>
    </div>
  )
}
