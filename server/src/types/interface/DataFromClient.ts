import { User } from "./User"

export interface DataFromClient {
  user: User | null
  token: {
    accessToken: {
      validToken: boolean | null
      value: string | null
      expired: boolean | null
    }
    refreshToken: {
      validToken: boolean | null
      value: string | null
      expired: boolean | null
    }
  }
  error: {
    status: number | null
    errorNumber: number | null
    message: string | null
  }
  message: string | null
}
