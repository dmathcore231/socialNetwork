import { UserData } from '../UserData'
import { ResponseStatus } from '../ResponseStatus'

export interface UserState {
  accessToken: string | null
  user: UserData | null
  responseStatus: ResponseStatus
}
