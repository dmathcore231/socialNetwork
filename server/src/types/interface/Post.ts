import { Document } from "mongoose"
import { ReportData } from "../ReportData"
import { ActivityData } from "./ActivityData"
import { UserDataCreator } from "../UserDataCreator"

export interface Post extends Document {
  creationData: {
    _timeStamp: Date
    formattedCreationDate: string
    userDataCreator: UserDataCreator
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
