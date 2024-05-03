import './styles.scss'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchCreateUserAvatar } from '../../../redux/userSlice'
import { AvatarContainer } from '../../../components/AvatarContainer'
import { AvatarSettingsProps } from '../../../types/interfaces/AvatarSettingsProps'
import { AvatarDefaultIcon } from '../../../assets/icons/AvatarDefaultIcon'

export function AvatarSettings({ isSubmit, indexItemActive }: AvatarSettingsProps): JSX.Element {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.user)

  const [uploadAvatar, setUploadAvatar] = useState<File | null>(null)

  useEffect(() => {
    if (isSubmit && indexItemActive === 0 && uploadAvatar) {
      const formData = new FormData()
      formData.append('avatar', uploadAvatar)
      dispatch(fetchCreateUserAvatar(formData))
    }
  }, [isSubmit, indexItemActive, uploadAvatar, dispatch])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0]
    setUploadAvatar(file)
  }

  return (
    <div className="avatar-setting">
      <div className="avatar-setting__title">
        <h3>Pick a profile picture</h3>
      </div>
      <div className="avatar-setting__body">
        {user!.userData.userAvatar
          ? (
            <>
              <p>Have a favorite selfie? Upload it now.</p>
              <AvatarContainer className="avatar_border_color_white avatar_border_size_xxl
            avatar_bg_color_gray-200 avatar_size_lg">
                <label className="avatar-setting__label">
                  <input
                    className="input-file__input"
                    type="file"
                    name="document"
                    multiple
                    onChange={handleFileChange}
                  />
                  {uploadAvatar
                    ? (
                      <img src={URL.createObjectURL(uploadAvatar)} alt="avatar" className="avatar-setting__upload-avatar" />
                    )
                    : (
                      <AvatarDefaultIcon width={'120px'} height={'120px'} className='avatar-setting__icon' />
                    )}
                </label>
              </AvatarContainer>
            </>
          )
          : (
            <>
              <p>Have a favorite selfie? Upload it now.</p>
              <AvatarContainer className="avatar_border_color_white avatar_border_size_xxl
              avatar_bg_color_gray-200 avatar_size_lg">
                <label className="avatar-setting__label">
                  <input
                    className="input-file__input"
                    type="file"
                    name="document"
                    multiple
                    onChange={handleFileChange}
                  />
                  {uploadAvatar
                    ? (
                      <img src={URL.createObjectURL(uploadAvatar)} alt="avatar" className="avatar-setting__upload-avatar" />
                    )
                    : (
                      <AvatarDefaultIcon width={'120px'} height={'120px'} className='avatar-setting__icon' />
                    )}
                </label>
              </AvatarContainer>
            </>
          )}
      </div>
    </div>
  )
}
