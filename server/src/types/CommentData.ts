import { UserDataInResponse } from "./UserDataInResponse"
import { ReportData } from "./ReportData"
import { LikeData } from "./likeData"

export type CommentData = {
  _timestamp: number
  formattedDate: string
  user: UserDataInResponse
  text: string
  likes: LikeData[]
  reports: ReportData[]
}
