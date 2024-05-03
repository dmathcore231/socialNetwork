import './styles.scss'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchGetUserDataByToken } from '../../redux/userSlice'
import { LinkBack } from '../../components/LinkBack'
import { AvatarContainer } from '../../components/AvatarContainer'
import { Btn } from '../../components/Btn'
import { Feed } from '../../components/Feed'
import { Modal } from '../../components/Modal'
import { AvatarSettings } from './AvatarSettings'
import { BannerSettings } from './BannerSettings'
import { DataSettings } from './DataSettings'
import { PrivateDataSettings } from './PrivateDataSettings'
import { ModalStateSettings } from '../../types/ModalState'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'

export function Profile(): JSX.Element {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.user)

  const [isModalActive, setIsModalActive] = useState(false)
  const [modalNavItemActive, setModalNavItemActive] = useState(0)
  const [isSubmitSave, setIsSubmitSave] = useState(false)

  const modalItem: ModalStateSettings[] = [
    {
      componentName: 'Avatar',
      component: <AvatarSettings
        isSubmit={isSubmitSave}
        indexItemActive={modalNavItemActive}
      />
    },
    {
      componentName: 'Banner',
      component: <BannerSettings />
    },
    {
      componentName: 'Data',
      component: <DataSettings />
    },
    {
      componentName: 'PrivateData',
      component: <PrivateDataSettings />
    },
  ]

  useEffect(() => {
    if (user) {
      dispatch(fetchGetUserDataByToken())
    }
  }, [])

  function renderModalProfileSettings(): JSX.Element {
    return (
      <div className="profile-settings">
        <nav className="profile-settings__nav-bar">
          <ul className="profile-settings__nav-list">
            {modalItem.map((item, index) => (
              <li
                key={item.componentName}
                className={
                  'profile-settings__nav-item' +
                  (modalNavItemActive === index
                    ? ' profile-settings__nav-item_active'
                    : '')
                }
                onClick={() => setModalNavItemActive(index)}
              >
                {item.componentName}
              </li>
            ))}
          </ul>
        </nav>
        {modalItem[modalNavItemActive].component}
      </div>
    )
  }

  function handleClickBtnSave() {
    setIsSubmitSave(true)
  }

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
            <h4>{user?.userData.userName.fullName}</h4>
          </div>
          <div className="profile-header__counter-posts">
            {user?.userActivityData.posts?.length || '0'} posts
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
              {user?.userData.userAvatar
                ? (
                  <img src={`http://localhost:3000/${user?.userData.userAvatar}`} alt="user avatar" className="profile-body__avatar" />
                )
                : (
                  <AvatarDefaultIcon width="100px" height="100px" />
                )
              }
            </AvatarContainer>
          </div>
        </div>
        <div className="profile-body__item profile-body__item_width_sm">
          <Btn
            type="button"
            className="btn_primary btn_size_sm"
            onClick={() => setIsModalActive(true)}
          >
            Setting Profile
          </Btn>
        </div>
        <Modal
          title="Settings Profile"
          isActive={isModalActive}
          onClose={() => setIsModalActive(false)}
          cancelBtn={{ visible: false }}
          submitBtn={{
            visible: true,
            title: "Save",
            onClick: handleClickBtnSave
          }}
        >
          {renderModalProfileSettings()}
        </Modal>
      </div>
      <div className="profile-footer">
        <div className="profile-footer__item">
          <h3>{user?.userData.userName.fullName}</h3>
          <span className="title title_size_lg title_color_gray-500">
            {user?.userData.userTag}
          </span>
        </div>
        <div className="profile-footer__item title">
          Registration: {user?.formattedRegistrationDate}
        </div>
        <div className="profile-footer__item title">
          {user?.userActivityData.subscriptions?.length || '0'} Subscriptions
          0 Subscribers
        </div>
        <div className="profile-footer__item profile-footer__item_padding_top_lg">
          <Feed />
        </div>
      </div>
    </div>
  )
}



