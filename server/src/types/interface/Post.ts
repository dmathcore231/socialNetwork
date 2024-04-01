import { Document } from "mongoose"
import { User } from "./User"
import { ReportData } from "../ReportData"
import { ActivityData } from "./ActivityData"

export interface Post extends Document {
  creationData: {
    _timeStamp: number
    formattedCreationDate: string
    user: Partial<User>
  }

  postData: {
    title: string
    text: string
    document: string
  }

  postActivityData: ActivityData

  reports: ReportData[] | null
}
