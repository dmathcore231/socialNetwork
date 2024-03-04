import './styles.scss'
import { PostProps } from '../../types/interfaces/PostProps'
import { AvatarContainer } from '../AvatarContainer'
import { CommentsIcon } from '../../assets/icons/CommentsIcon'
import { RepostIcon } from '../../assets/icons/RepostIcon'
import { LikeIcon } from '../../assets/icons/LikeIcon'
import { ViewedIcon } from '../../assets/icons/ViewedIcon'

export function Post({ data }: PostProps): JSX.Element {
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header__user">
          <span className="post-header__item">
            <AvatarContainer>
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
      </div>
      <div className="post-body">
        {data.text}
      </div>
      <div className='post-footer
      title title_size_sm title_color_gray-500'>
        <span className='post-footer__item'>
          <CommentsIcon width='24px' height='24px' />
          {data.statPost.comments}
        </span>
        <span className='post-footer__item'>
          <RepostIcon width='24px' height='24px' />
          {data.statPost.reposts}
        </span>
        <span className='post-footer__item'>
          <LikeIcon width='24px' height='24px' />
          {data.statPost.likes}
        </span>
        <span className='post-footer__item'>
          <ViewedIcon width='24px' height='24px' />
          {data.statPost.viewed}
        </span>
      </div>
    </div>
  )
}
