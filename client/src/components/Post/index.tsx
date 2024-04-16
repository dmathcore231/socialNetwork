import './styles.scss'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { PostProps } from '../../types/interfaces/PostProps'
import { AvatarContainer } from '../AvatarContainer'
import { SIZE_ICON_MD, SIZE_ICON_SM } from '../../helpers'
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
  const breakPointSm = useMediaQuery({ query: '(max-width: 36rem)' })
  const sizeIcon = breakPointSm ? SIZE_ICON_SM : SIZE_ICON_MD
  const { fullName, tag, userAvatar } = data.creationData.userDataCreator

  const [isDropDownActive, setIsDropDownActive] = useState(false)

  function handleDropDownClick() {
    setIsDropDownActive(prev => !prev)
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header__item">
          <AvatarContainer
            className='avatar_border_color_white avatar_size_sm avatar_bg_color_gray-200'
          >
            {userAvatar?.avatarSizeSm
              ? userAvatar.avatarSizeSm
              : <AvatarDefaultIcon width={sizeIcon} height={sizeIcon} />}
          </AvatarContainer>
          <div className="post-creator-data">
            <div className="post-creator-data__item">
              <span className="post-creator-data__text"
              >
                {fullName}
              </span>
              <span className="post-creator-data__text
              post-creator-data__text_color_gray"
              >
                {tag}
              </span>
            </div>

            <span className="post-creator-data__date-creation">
              | {data.creationData.formattedCreationDate}
            </span>
          </div>
        </div>
        <div className="post-header__item">
          <Btn
            type='button'
            className='btn_transparent'
            onClick={() => handleDropDownClick()}
          >
            <MoreIcon width={sizeIcon} height={sizeIcon} />
          </Btn>
          <DropDown
            isActive={isDropDownActive}
            setIsActive={setIsDropDownActive}
            defaultPosition={true}
          >
            <ul className="dropdown-list">
              <li className="dropdown-list__item">
                <ReportIcon width={sizeIcon} height={sizeIcon} />
                Report this post
              </li>
              <li className="dropdown-list__item">
                <BookmarkIcon width={sizeIcon} height={sizeIcon} />
                Add to bookmarks
              </li>
              <li className='dropdown-list__item'>
                <IgnoreIcon width={sizeIcon} height={sizeIcon} />
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
            <CommentsIcon width={sizeIcon} height={sizeIcon} />
            {data.postActivityData.comments?.length || 0}
          </Btn>

        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click reposts')}
          >
            <RepostIcon width={sizeIcon} height={sizeIcon} />
            {data.postActivityData.reposts?.length || 0}
          </Btn>
        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click likes')}
          >
            <LikeIcon width={sizeIcon} height={sizeIcon} />
            {data.postActivityData.likes?.length || 0}
          </Btn>
        </span>
        <span className='post-footer__item'>
          <Btn
            type='button'
            className='btn_transparent title'
            onClick={() => console.log('click viewed')}
          >
            <ViewedIcon width={sizeIcon} height={sizeIcon} />
            {data.postActivityData.views?.length || 0}
          </Btn>
        </span>
      </div>
    </div>
  )
}
