import { UserData } from './UserData'

export type PostData = {
  _id: string
  timeStamp: number
  text: string
  user: UserData
  file?: string
  statPost: {
    comments: number
    reposts: number
    likes: number
    viewed: number
  }
}
