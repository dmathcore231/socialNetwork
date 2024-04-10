import './styles.scss'
import { useAppSelector } from '../../hooks'
import { AvatarContainer } from '../AvatarContainer'
import { ProfileIcon } from '../../assets/icons/ProfileIcon'

export function MiniProfile(): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  return (
    <div className="mini-profile">
      <div className="mini-profile__item">
        <AvatarContainer
          className="avatar_border_color_white avatar_size_sm avatar_bg_color_gray-200"
        >
          {user?.userData.userAvatar?.avatarSizeSm
            ? user.userData.userAvatar.avatarSizeSm
            : <ProfileIcon width="24px" height="24px" />}
        </AvatarContainer>
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
}
