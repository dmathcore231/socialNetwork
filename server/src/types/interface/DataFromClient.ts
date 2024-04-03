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

  postData: {
    title: string | null
    text: string | null
    document: string | null
    postScope: 'global' | 'personal' | null
  }

  message: string | null
}
