import { User } from '../interface/User'
import { Post } from '../interface/Post'

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

export interface ResponseWithAllPostsDataPayload extends ResponseWithoutPayload {
  token: string
  posts: Post[]
}

export interface ResponseWithPostDataPayload extends ResponseWithoutPayload {
  token: string
  post: Post
}


