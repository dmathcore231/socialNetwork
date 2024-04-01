import { User } from '../interface/User'

export interface ResponseWithoutPayload {
  status: number
  error: boolean
  errorNumber: number | null
  message: string
}

export interface ResponseWithUserDataPayload extends ResponseWithoutPayload {
  token: string
  user: Partial<User>
}


