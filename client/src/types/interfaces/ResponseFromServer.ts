import { UserData } from "../UserData"
import { PostData } from "../PostData"

export interface ResponseWithoutPayload {
  status: number
  error: boolean
  errorNumber: number | null
  message: string
}

export interface ResponseWithUserDataPayload extends ResponseWithoutPayload {
  token: string
  user: UserData
}

export interface ResponseWithAllPostsDataPayload extends ResponseWithoutPayload {
  token: string
  posts: PostData[]
}
