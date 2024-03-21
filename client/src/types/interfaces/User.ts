import { UserData } from '../UserData'
import { ResponseState } from '../ResponseState'

export interface UserState {
  accessToken: string | null
  user: UserData | null
  ResponseState: ResponseState
}
