import './styles.scss'
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchCreateUserAvatar, fetchDeleteUserAvatar } from '../../../redux/userSlice'
import { AvatarContainer } from '../../../components/AvatarContainer'
import { Btn } from '../../../components/Btn'
import { Spinner } from '../../../components/Spinner'
import { AvatarSettingsProps } from '../../../types/interfaces/AvatarSettingsProps'
import { AvatarDefaultIcon } from '../../../assets/icons/AvatarDefaultIcon'

export function AvatarSettings({ isSubmit, indexItemActive, getValueUploadAvatar }: AvatarSettingsProps): JSX.Element {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const { user, ResponseState: { loading } } = useAppSelector(state => state.user)

  const [uploadAvatar, setUploadAvatar] = useState<File | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)

  useEffect(() => {
    setUploadAvatar(null)
  }, [])

  useEffect(() => {
    if (isSubmit && indexItemActive === 0 && uploadAvatar) {
      const formData = new FormData()
      formData.append('avatar', uploadAvatar)
      dispatch(fetchCreateUserAvatar(formData))
      setUploadAvatar(null)
    }
  }, [isSubmit, indexItemActive, uploadAvatar, dispatch])

  useEffect(() => {
    if (uploadAvatar) {
      getValueUploadAvatar(uploadAvatar)
    }
  }, [uploadAvatar, getValueUploadAvatar])

  useEffect(() => {
    if (isDeleteAvatar) {
      dispatch(fetchDeleteUserAvatar())
      setIsDeleteAvatar(prev => !prev)
    }
  }, [isDeleteAvatar, dispatch])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0]
    setUploadAvatar(file)
  }

  function handleClickBtnDeleteAvatar() {
    setUploadAvatar(null)
    setIsDeleteAvatar(prev => !prev)
  }

  function renderAvatarSettingBody(): JSX.Element {
    if (loading) {
      return (
        <div className="avatar-setting__spinner">
          <Spinner width='24px' height='24px' />
        </div>
      )
    } else if (user && user.userData.userAvatar && !uploadAvatar) {
      return (
        <>
          <div className="avatar-setting__text">
            Have a favorite selfie? Upload it now.
            <div className="avatar-setting__btn-delete-avatar">
              <Btn
                type="button"
                className="btn_primary btn_padding_none_vertical"
                onClick={handleClickBtnDeleteAvatar}
              >
                Deleted Avatar
              </Btn>
            </div>
          </div>
          <AvatarContainer className="avatar_border_color_white avatar_border_size_xxl avatar_bg_color_gray-200
          avatar_size_lg">
            <label className="avatar-setting__label">
              <input
                ref={inputRef}
                className="input-file__input"
                type="file"
                name="document"
                multiple
                onChange={handleFileChange}
              />
              <img src={`http://localhost:3000/${user.userData.userAvatar}`} alt="avatar" className="avatar-setting__upload-avatar" />
            </label>
          </AvatarContainer>
        </>
      )
    } else if (uploadAvatar) {
      return (
        <>
          <div className="avatar-setting__text">
            Have a favorite selfie? Upload it now.
            <div className="avatar-setting__btn-delete-avatar">
              <Btn
                type="button"
                className="btn_primary btn_padding_none_vertical"
                onClick={() => setUploadAvatar(null)}
              >
                Deleted Avatar
              </Btn>
            </div>
          </div>
          <AvatarContainer className="avatar_border_color_white avatar_border_size_xxl avatar_bg_color_gray-200
        avatar_size_lg">
            <label className="avatar-setting__label">
              <input
                ref={inputRef}
                className="input-file__input"
                type="file"
                name="document"
                multiple
                onChange={handleFileChange}
              />
              <img src={URL.createObjectURL(uploadAvatar)} alt="avatar" className="avatar-setting__upload-avatar" />
            </label>
          </AvatarContainer>
        </>
      )
    }
    else {
      return (
        <>
          <div className="avatar-setting__text">
            Have a favorite selfie? Upload it now.
            <div className="avatar-setting__btn-delete-avatar">
              <Btn
                type="button"
                className="btn_primary btn_padding_none_vertical"
                onClick={() => setUploadAvatar(null)}
              >
                Deleted Avatar
              </Btn>
            </div>
          </div>
          <AvatarContainer className="avatar_border_color_white avatar_border_size_xxl avatar_bg_color_gray-200
          avatar_size_lg">
            <label className="avatar-setting__label">
              <input
                ref={inputRef}
                className="input-file__input"
                type="file"
                name="document"
                multiple
                onChange={handleFileChange}
              />
              <AvatarDefaultIcon width={'120px'} height={'120px'} className='avatar-setting__icon' />
            </label>
          </AvatarContainer>
        </>
      )
    }
  }

  return (
    <div className="avatar-setting">
      <div className="avatar-setting__title">
        <h3>Pick a profile picture</h3>
      </div>
      <div className="avatar-setting__body">
        {renderAvatarSettingBody()}
      </div >
    </div >
  )
}
