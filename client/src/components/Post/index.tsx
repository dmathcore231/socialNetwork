import './styles.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector } from '../../hooks'
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
import { EditIcon } from '../../assets/icons/EditIcon'
import { DeleteIcon } from '../../assets/icons/DeleteIcon'

export function Post({ data }: PostProps): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  const breakPointSm = useMediaQuery({ query: '(max-width: 36rem)' })
  const sizeIcon = breakPointSm ? SIZE_ICON_SM : SIZE_ICON_MD
  const { fullName, tag, userAvatar } = data.creationData.userDataCreator

  const [isDropDownActive, setIsDropDownActive] = useState(false)
  console.log(data.postData.document)
  function handleDropDownClick() {
    setIsDropDownActive(prev => !prev)
  }

  function renderDropdownList(): JSX.Element {
    if (user && user._id === data.creationData.userDataCreator._id) {
      return (
        <ul className="dropdown-list">
          <li className="dropdown-list__item">
            <BookmarkIcon width={sizeIcon} height={sizeIcon} />
            Add to bookmarks
          </li>
          <li className="dropdown-list__item">
            <Link to={`/post/edit/${data._id}`} className="dropdown-list__link">
              <EditIcon width={sizeIcon} height={sizeIcon} />
              Edit post
            </Link>
          </li>
          <li className="dropdown-list__item">
            <DeleteIcon width={sizeIcon} height={sizeIcon} />
            Delete post
          </li>
        </ul>
      )
    } else {
      return (
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
      )
    }
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
            type="button"
            className="btn_transparent_shadow_enabled"
            onClick={() => handleDropDownClick()}
          >
            <MoreIcon width={sizeIcon} height={sizeIcon} />
          </Btn>
          <DropDown
            isActive={isDropDownActive}
            setIsActive={setIsDropDownActive}
            defaultPosition={true}
          >
            {renderDropdownList()}
          </DropDown>
        </div>
      </div>
      <div className="post-body">
        <div className="post-body__title">
          {data.postData.title}
        </div>
        <div className="post-body__text">
          {data.postData.text}
        </div>
        {/* <img src="http://localhost:3000/public/documentInPost/1713796367314.jpg" alt="Image" /> need fix */}
      </div>
      <div className="post-footer">
        <span className="post-footer__item">
          <Btn
            type="button"
            className="btn_transparent_shadow_enabled title"
            onClick={() => console.log('click comments')}
          >
            <CommentsIcon width={sizeIcon} height={sizeIcon} />
          </Btn>
          {data.postActivityData.comments?.length || 0}
        </span>
        <span className="post-footer__item">
          <Btn
            type="button"
            className="btn_transparent_shadow_enabled title"
            onClick={() => console.log('click reposts')}
          >
            <RepostIcon width={sizeIcon} height={sizeIcon} />
          </Btn>
          {data.postActivityData.reposts?.length || 0}
        </span>
        <span className="post-footer__item">
          <Btn
            type="button"
            className="btn_transparent_shadow_enabled title"
            onClick={() => console.log('click likes')}
          >
            <LikeIcon width={sizeIcon} height={sizeIcon} />
          </Btn>
          {data.postActivityData.likes?.length || 0}
        </span>
        <span className="post-footer__item">
          <Btn
            type="button"
            className="btn_transparent_shadow_enabled title"
            onClick={() => console.log('click viewed')}
          >
            <ViewedIcon width={sizeIcon} height={sizeIcon} />
          </Btn>
          {data.postActivityData.views?.length || 0}
        </span>
      </div>
    </div>
  )
}
