import { User } from "./User"
import { Post } from "./Post"

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

  allPosts: Post[] | null
  postById: Post | null
  message: string | null
}
