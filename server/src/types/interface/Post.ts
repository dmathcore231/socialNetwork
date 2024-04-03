import { Document } from "mongoose"
import { UserDataInResponse } from "../UserDataInResponse"
import { ReportData } from "../ReportData"
import { ActivityData } from "./ActivityData"

export interface Post extends Document {
  creationData: {
    _timeStamp: number
    formattedCreationDate: string
    user: UserDataInResponse
  }

  postData: {
    title: string
    text: string
    document: string
    postScope: 'global' | 'personal'
  }

  postActivityData: ActivityData
  reports: ReportData[] | null
}
