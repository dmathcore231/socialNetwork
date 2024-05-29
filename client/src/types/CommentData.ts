import { UserDataCreator } from './UserDataCreator'
import { ReportData } from './ReportData'
import { LikeData } from './likeData'

export type CommentData = {
  _id: string
  _postId: string
  _timestamp: number
  userDataCreator: UserDataCreator
  formattedDate: string
  text: string
  likes: LikeData[]
  reports: ReportData[]
}
