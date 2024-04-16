import './styles.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchLogout } from '../../redux/userSlice'
import { AvatarContainer } from '../AvatarContainer'
import { Btn } from '../Btn'
import { DropDown } from '../DropDown'
import { MiniProfileProps } from '../../types/interfaces/MiniProfileProps'
import { SIZE_ICON_MD } from '../../helpers'
import { ProfileIcon } from '../../assets/icons/ProfileIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { LogoutIcon } from '../../assets/icons/LogoutIcon'

export function MiniProfile({ size }: MiniProfileProps): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.user)

  const [isModalActive, setIsModalActive] = useState(false)
  const [isSubmitLogout, setIsSubmitLogout] = useState(false)

  useEffect(() => {
    if (isSubmitLogout) {
      dispatch(fetchLogout())
      setIsSubmitLogout(false)
      setIsModalActive(false)
      navigate('/authorization', { replace: true })
    }
  }, [isSubmitLogout, dispatch, navigate])

  if (size === 'md') {
    return (
      <div className="mini-profile">
        <div className="mini-profile__item
        mini-profile__item_width_100
        mini-profile__item_jc_sb">
          <AvatarContainer
            className="avatar_border_color_white
            avatar_size_sm
            avatar_bg_color_gray-200"
          >
            {user?.userData.userAvatar?.avatarSizeSm
              ? user.userData.userAvatar.avatarSizeSm
              : <ProfileIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />}
          </AvatarContainer>
          <div className="mini-profile__item-wrapper">
            <Btn
              type="button"
              className="btn_transparent"
              onClick={() => setIsModalActive(prev => !prev)}
            >
              <MoreIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
            </Btn>

            <DropDown
              isActive={isModalActive}
              setIsActive={setIsModalActive}
            >
              <ul className="dropdown-list">
                <li className="dropdown-list__item">
                  <Btn
                    type="button"
                    className="btn_transparent"
                    onClick={() => setIsSubmitLogout(prev => !prev)}
                  >
                    <LogoutIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
                    Sign out
                  </Btn>
                </li>
              </ul>
            </DropDown>
          </div>
        </div>
        <div className="mini-profile__item">
          <h5>{user?.userData.userName.fullName}</h5>
        </div>
        <div className="mini-profile__item">
          <p>{user?.userData.userTag}</p>
        </div>
        <div className="mini-profile__item">
          <div className="mini-profile__counter-posts">
            {user?.userActivityData.posts?.length || "0"} posts
          </div>
          <div className='mini-profile__counter-subscriptions'>
            {user?.userActivityData.subscriptions?.length || "0"} subscriptions
          </div>
        </div>
      </div>
    )
  } else if (size === 'xs') {
    return (
      <div className="mini-profile
      mini-profile_flex_direction_row">
        <div className="mini-profile__item">
          <Btn
            type="button"
            className="btn_transparent"
            onClick={() => setIsModalActive(prev => !prev)}
          >
            <AvatarContainer
              className="avatar_border_color_white
            avatar_size_sm
            avatar_bg_color_gray-200"
            >
              {user?.userData.userAvatar?.avatarSizeSm
                ? user.userData.userAvatar.avatarSizeSm
                : <ProfileIcon width="40px" height="40px" />}
            </AvatarContainer>
          </Btn>

          <DropDown
            isActive={isModalActive}
            setIsActive={setIsModalActive}
          >
            <ul className="dropdown-list">
              <li className="dropdown-list__item dropdown-list__item_padding_05">
                <Btn
                  type="button"
                  className="btn_transparent"
                  onClick={() => setIsSubmitLogout(prev => !prev)}
                >
                  <LogoutIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
                </Btn>
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="mini-profile
       mini-profile_flex_direction_row">
        <div className="mini-profile__item">
          <AvatarContainer
            className="avatar_border_color_white
            avatar_size_sm
            avatar_bg_color_gray-200"
          >
            {user?.userData.userAvatar?.avatarSizeSm
              ? user.userData.userAvatar.avatarSizeSm
              : <ProfileIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />}
          </AvatarContainer>
        </div>
        <div className="mini-profile__item
        mini-profile__item_flex_column
        mini-profile__item_gap_none
        title title_size_sm">
          <p>{user?.userData.userName.fullName}</p>
          <p>{user?.userData.userTag}</p>
        </div>
        <div className="mini-profile__item">
          <Btn
            type="button"
            className="btn_transparent"
            onClick={() => setIsModalActive(prev => !prev)}
          >
            <MoreIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
          </Btn>

          <DropDown
            isActive={isModalActive}
            setIsActive={setIsModalActive}
          >
            <ul className="dropdown-list">
              <li className="dropdown-list__item">
                <Btn
                  type="button"
                  className="btn_transparent"
                  onClick={() => setIsSubmitLogout(prev => !prev)}
                >
                  <LogoutIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
                  Sign out
                </Btn>
              </li>
            </ul>
          </DropDown>
        </div>
      </div>

    )
  }
}
