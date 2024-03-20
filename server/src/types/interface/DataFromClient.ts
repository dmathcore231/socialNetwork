import { User } from "./User"

export interface DataFromClient {
  user: User | null
  token: {
    accessToken: string | null
    validAccessToken: boolean | null
  }
  error: {
    status: number | null
    message: string | null
  }
}
