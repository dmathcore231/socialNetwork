import { User } from "./interface/User"
import { ReportData } from "./ReportData"
import { LikeData } from "./likeData"

export type CommentData = {
  _timestamp: number
  formattedDate: string
  user: Partial<User>
  text: string
  likes: LikeData[]
  reports: ReportData[]
}
