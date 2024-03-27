import { User } from "./User"

export interface DataFromClient {
  user: User | null
  token: {
    accessToken: string | null
    validAccessToken: boolean | null
    refreshToken: string | null
    validRefreshToken: boolean | null
  }
  error: {
    status: number | null
    errorNumber: number | null
    message: string | null
  }
  message: string | null
}
