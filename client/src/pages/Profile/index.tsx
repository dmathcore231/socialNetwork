import './styles.scss'
import { LinkBack } from '../../components/LinkBack'

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
    </div>
  )
}
