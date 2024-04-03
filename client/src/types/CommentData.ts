import { ReportData } from "./ReportData"
import { LikeData } from "./likeData"
import { UserDataCreator } from "./UserDataCreator"

export type CommentData = {
  _timestamp: number
  formattedDate: string
  userDataCreator: UserDataCreator
  text: string
  likes: LikeData[]
  reports: ReportData[]
}
