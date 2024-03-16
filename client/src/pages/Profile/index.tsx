import './styles.scss'
import { LinkBack } from '../../components/LinkBack'
import { AvatarContainer } from '../../components/AvatarContainer'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'
import { Btn } from '../../components/Btn'
import { Feed } from '../../components/Feed'

export function Profile(): JSX.Element {
  return (
    <div className="profile content-page">
      <div className="profile-header">
        <div className="profile-header__item">
          <div className="profile-header__link-back">
            <LinkBack BackToHome={true} />
          </div>
        </div>
        <div className="profile-header__item">
          <div className="profile-header__title">
            <h4>Your Name</h4>
          </div>
          <div className="profile-header__counter-posts">
            0 posts
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-body__item">
          <div className="profile-body__user-banner">
            user banner
          </div>
          <div className="profile-body__user-avatar">
            <AvatarContainer
              className="avatar_border_color_white avatar_border_size_xxl
              avatar_bg_color_gray-200"
            >
              <AvatarDefaultIcon width="100px" height="100px" />
            </AvatarContainer>
          </div>
        </div>
        <div className="profile-body__item profile-body__item_width_sm">
          <Btn
            type="button"
            className="btn_primary btn_size_sm"
            onClick={() => console.log("click")}
          >
            Settings Profile
          </Btn>
        </div>
      </div>
      <div className="profile-footer">
        <div className="profile-footer__item">
          <h3>Your Name</h3>
          <span className="title title_size_lg title_color_gray-500">
            @userTag
          </span>
        </div>
        <div className="profile-footer__item title">
          Registration: August 2013
        </div>
        <div className="profile-footer__item title">
          {`0 Subscriptions 0 Subscribers`}
        </div>
        <div className="profile-footer__item profile-footer__item_padding_top_lg">
          <Feed />
        </div>
      </div>
    </div>
  )
}



