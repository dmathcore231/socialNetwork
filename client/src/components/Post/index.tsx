import './styles.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchToggleLikePost, fetchDeletePost } from '../../redux/postSlice'
import { PostProps } from '../../types/interfaces/PostProps'
import { AvatarContainer } from '../AvatarContainer'
import { SIZE_ICON_MD, SIZE_ICON_SM } from '../../helpers'
import { Btn } from '../Btn'
import { DropDown } from '../DropDown'
import { Carousel } from '../Carousel'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'
import { CommentsIcon } from '../../assets/icons/CommentsIcon'
import { RepostIcon } from '../../assets/icons/RepostIcon'
import { LikeIcon } from '../../assets/icons/LikeIcon'
import { ViewedIcon } from '../../assets/icons/ViewedIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { ReportIcon } from '../../assets/icons/ReportIcon'
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon'
import { IgnoreIcon } from '../../assets/icons/IgnoreIcon'
import { EditIcon } from '../../assets/icons/EditIcon'
import { DeleteIcon } from '../../assets/icons/DeleteIcon'

export function Post({ data }: PostProps): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { user } = useAppSelector(state => state.user)
  const { ResponseState: { status } } = useAppSelector(state => state.post)

  const breakPointSm = useMediaQuery({ query: '(max-width: 36rem)' })
  const sizeIcon = breakPointSm ? SIZE_ICON_SM : SIZE_ICON_MD
  const { fullName, tag, userAvatar } = data.creationData.userDataCreator

  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const [isDropDownDeleteConfirm, setIsDropDownDeleteConfirm] = useState(false)
  const [isClickedLike, setIsClickedLike] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [counterLikes, setCounterLikes] = useState<number>(0)
  const [postLikeState, setPostLikeState] = useState<boolean | null>(null)

  useEffect(() => {
    if (user) {
      setPostLikeState(data.postActivityData.likes.some(item => item.userDataCreator._id === user._id))
    }

    setCounterLikes(data.postActivityData.likes.length)
  }, [user, data.postActivityData.likes])

  useEffect(() => {
    if (isClickedLike) {
      dispatch(fetchToggleLikePost({ id: data._id }))
      setIsClickedLike(prev => !prev)
    }
  }, [dispatch, isClickedLike, data._id])

  useEffect(() => {
    if (confirmDelete) {
      dispatch(fetchDeletePost({ id: data._id }))
    }
  }, [dispatch, confirmDelete, data._id])

  useEffect(() => {
    if (confirmDelete && status === 200) {
      setConfirmDelete(prev => !prev)
      navigate('/profile')
    }
  }, [status, confirmDelete, navigate])

  function handleDropDownClick() {
    setIsDropDownActive(prev => !prev)
  }

  function handleClickBtnLike() {
    setIsClickedLike(prev => !prev)
    if (postLikeState) {
      setCounterLikes(prev => prev - 1)
      setPostLikeState(prev => !prev)
    } else {
      setCounterLikes(prev => prev + 1)
      setPostLikeState(prev => !prev)
    }
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
          <DropDown
            isActive={isDropDownDeleteConfirm}
            setIsActive={setIsDropDownDeleteConfirm}
            defaultPosition={false}
          >
            <div className="post-delete-confirm">
              <Btn
                type="button"
                className="btn_primary btn_outline btn_padding_none_vertical"
                onClick={() => setConfirmDelete(true)}

              >
                Confirm
              </Btn>
              <Btn
                type="button"
                className="btn_primary btn_outline btn_padding_none_vertical"
                onClick={() => { setIsDropDownDeleteConfirm(false) }}
              >
                Cancel
              </Btn>
            </div>
          </DropDown>
          <li className="dropdown-list__item"
            onClick={() => setIsDropDownDeleteConfirm(true)}>
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

  function renderDocumentInPost(): JSX.Element | null {
    if (data.postData.document
      && data.postData.document.length > 2) {
      return (
        <Carousel
          data={data.postData.document}
          editBtnVisible={false}
        />
      )
    } else if (data.postData.document && data.postData.document.length === 2) {
      return (
        <>
          <img src={`http://localhost:3000/${data.postData.document[0]}`} alt="post document" className='post-body__img' />
          <img src={`http://localhost:3000/${data.postData.document[1]}`} alt="post document" className='post-body__img' />
        </>
      )
    } else if (data.postData.document && data.postData.document.length === 1) {
      return (
        <img src={`http://localhost:3000/${data.postData.document[0]}`} alt="post document" className='post-body__img' />
      )
    }
    else {
      return null
    }
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header__item">
          <AvatarContainer
            className="avatar_border_color_white avatar_size_sm avatar_bg_color_gray-200"
          >
            {userAvatar
              ? <img src={`http://localhost:3000/${userAvatar}`} alt="user avatar" className="post-header__avatar" />
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
        <div className="post-body__image">
          {renderDocumentInPost()}
        </div>
      </div>
      <div className="post-footer">
        <div className="post-footer-item">
          <div className="post-footer-item__btn">
            <Btn
              type="button"
              className="btn_transparent_shadow_enabled title"
              onClick={() => navigate(`/post/comments/${data._id}`)}
            >
              <CommentsIcon width={sizeIcon} height={sizeIcon} />
            </Btn>
          </div>
          <div className="post-footer-item__text">
            {data.postActivityData.comments?.length || 0}
          </div>
        </div>
        <div className="post-footer-item">
          <div className="post-footer-item__btn">
            <Btn
              type="button"
              className="btn_transparent_shadow_enabled title"
              onClick={() => console.log('click reposts')}
            >
              <RepostIcon width={sizeIcon} height={sizeIcon} />
            </Btn>
          </div>
          <div className="post-footer-item__text">
            {data.postActivityData.reposts?.length || 0}
          </div>
        </div>
        <div className="post-footer-item">
          <div className="post-footer-item__btn">
            <Btn
              type="button"
              className={(postLikeState
                ? "btn_transparent_shadow_enabled_fill_red "
                : "btn_transparent_shadow_enabled ") + "title"}
              onClick={handleClickBtnLike}
            >
              <LikeIcon width={sizeIcon} height={sizeIcon} />
            </Btn>
          </div>
          <div className="post-footer-item__text">
            {counterLikes}
          </div>
        </div>
        <div className="post-footer-item">
          <div className="post-footer-item__btn">
            <Btn
              type="button"
              className="btn_transparent_shadow_enabled title"
              onClick={() => console.log('click viewed')}
            >
              <ViewedIcon width={sizeIcon} height={sizeIcon} />
            </Btn>
          </div>
          <div className="post-footer-item__text">
            {data.postActivityData.views?.length || 0}
          </div>
        </div>
      </div>
    </div>
  )
}
