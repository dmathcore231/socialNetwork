import './styles.scss'
import { useState } from 'react'
import { PostProps } from '../../types/interfaces/PostProps'
import { AvatarContainer } from '../AvatarContainer'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'
import { CommentsIcon } from '../../assets/icons/CommentsIcon'
import { RepostIcon } from '../../assets/icons/RepostIcon'
import { LikeIcon } from '../../assets/icons/LikeIcon'
import { ViewedIcon } from '../../assets/icons/ViewedIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { Btn } from '../Btn'
import { DropDown } from '../DropDown'
import { ReportIcon } from '../../assets/icons/ReportIcon'
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon'
import { IgnoreIcon } from '../../assets/icons/IgnoreIcon'

export function Post({ data }: PostProps): JSX.Element {
  const { fullName, tag, userAvatar } = data.creationData.userDataCreator

  const [isDropDownActive, setIsDropDownActive] = useState(false)

  function handleDropDownClick() {
    setIsDropDownActive(prev => !prev)
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header__user">
          <span className="post-header__item">
            <AvatarContainer
              className='avatar_border_color_white avatar_size_sm avatar_bg_color_gray-200'
            >
              {userAvatar?.avatarSizeSm
                ? userAvatar.avatarSizeSm
                : <AvatarDefaultIcon width='24px' height='24px' />}
            </AvatarContainer>
          </span>
          <div className='post-header__wrapper-item'>
            <span className="post-header__item
          title title_size_lg"
            >
              {fullName}
            </span>
            <span className="post-header__item
          title title_color_gray-500"
            >
              {tag}
            </span>
            <span className="post-header__item">
              | {data.creationData.formattedCreationDate}
            </span>
          </div>
        </div>
        <div className='post-header__more'>
          <Btn
            type='button'
            className='btn_transparent'
            onClick={() => handleDropDownClick()}
          >
            <MoreIcon width='24px' height='24px' />
          </Btn>
          <DropDown
            isActive={isDropDownActive}
            setIsActive={setIsDropDownActive}
          >
            <ul className="dropdown-list">
              <li className="dropdown-list__item">
                <ReportIcon width='24px' height='24px' />
                Report this post
              </li>
              <li className="dropdown-list__item">
                <BookmarkIcon width='24px' height='24px' />
                Add to bookmarks
              </li>
              <li className='dropdown-list__item'>
                <IgnoreIcon width='24px' height='24px' />
                {`Ignore ${data.creationData.userDataCreator.tag}`}
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
      <div className="post-body">
        <div className='post-body__title'>
          {data.postData.title}
        </div>
        <div className='post-body__text'>
          {data.postData.text}
        </div>
      </div>
      <div className='post-footer'>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click comments')}
          >
            <CommentsIcon width='24px' height='24px' />
            {data.postActivityData.comments?.length || 0}
          </Btn>

        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click reposts')}
          >
            <RepostIcon width='24px' height='24px' />
            {data.postActivityData.reposts?.length || 0}
          </Btn>
        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click likes')}
          >
            <LikeIcon width='24px' height='24px' />
            {data.postActivityData.likes?.length || 0}
          </Btn>
        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click viewed')}
          >
            <ViewedIcon width='24px' height='24px' />
            {data.postActivityData.views?.length || 0}
          </Btn>
        </span>
      </div>
    </div>
  )
}
