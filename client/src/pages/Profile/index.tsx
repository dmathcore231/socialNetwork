import './styles.scss'
import { LinkBack } from '../../components/LinkBack'
import { AvatarContainer } from '../../components/AvatarContainer'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'

export function Profile(): JSX.Element {
  return (
    <div className='profile content-page'>
      <div className='profile-header'>
        <div className='profile-header__item'>
          <div className='profile-header__link-back'>
            <LinkBack />
          </div>
        </div>
        <div className='profile-header__item'>
          <div className='profile-header__title'>
            <h4>Your Name</h4>
          </div>
          <div className='profile-header__counter-posts'>
            0 posts
          </div>
        </div>
      </div>
      <div className='profile-body'>
        <div className='profile-body__item'>
          <div className='profile-body__user-banner'>
            user banner
          </div>
          <div className='profile-body__user-avatar'>
            <AvatarContainer
              className="avatar_border_color_white avatar_border_size_xxl
              avatar_bg_color_gray-200"
            >
              <AvatarDefaultIcon width='100px' height='100px' />
            </AvatarContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
