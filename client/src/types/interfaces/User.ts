import { UserData } from '../UserData'
import { ResponseState } from '../ResponseState'
import { UserAvatarSettings } from '../UserAvatarSettings'

export interface UserState {
  accessToken: string | null
  user: UserData | null
  ResponseState: ResponseState
}

export interface UserSettingsState {
  userAvatarData: UserAvatarSettings
}
