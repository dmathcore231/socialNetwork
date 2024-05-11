import './styles.scss'
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setUserAvatarData } from '../../../redux/userSettings'
import { AvatarContainer } from '../../../components/AvatarContainer'
import { Btn } from '../../../components/Btn'
import { Spinner } from '../../../components/Spinner'
import { AvatarSettingsProps } from '../../../types/interfaces/AvatarSettingsProps'
import { AvatarDefaultIcon } from '../../../assets/icons/AvatarDefaultIcon'

export function AvatarSettings({ setFileUploaded }: AvatarSettingsProps): JSX.Element {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const { ResponseState: { loading } } = useAppSelector(state => state.user)
  const { userAvatarData } = useAppSelector(state => state.userSettings)

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  useEffect(() => {
    if (uploadedFile) {
      setFileUploaded(uploadedFile)
    }
  }, [uploadedFile, setFileUploaded])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0]
    setUploadedFile(file)

    dispatch(setUserAvatarData({
      ...userAvatarData,
      uploadedUserAvatar: URL.createObjectURL(file)
    }))
  }

  function handleClickBtnDeleteAvatar() {
    dispatch(setUserAvatarData({
      ...userAvatarData,
      uploadedUserAvatar: null,
      userAvatarDeleted: true
    }))
  }

  function renderAvatarSettingBody(): JSX.Element {
    if (loading) {
      return (
        <div className="avatar-setting__spinner">
          <Spinner width='24px' height='24px' />
        </div>
      )
    } else if (userAvatarData.defaultUserAvatar
      && !userAvatarData.uploadedUserAvatar
      && !userAvatarData.userAvatarDeleted
    ) {
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
              <img src={`http://localhost:3000/${userAvatarData.defaultUserAvatar}`} alt="avatar" className="avatar-setting__upload-avatar" />
            </label>
          </AvatarContainer>
        </>
      )
    } else if (userAvatarData.uploadedUserAvatar) {
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
              <img src={userAvatarData.uploadedUserAvatar} alt="avatar" className="avatar-setting__upload-avatar" />
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
