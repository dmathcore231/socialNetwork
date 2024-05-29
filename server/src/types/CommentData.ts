import { ReportData } from "./ReportData"
import { LikeData } from "./likeData"
import { UserDataCreator } from "./UserDataCreator"

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
