import { ActivityData } from './interfaces/Post'
import { ReportData } from './ReportData'
import { UserDataCreator } from './UserDataCreator'

export type PostData = {
  _id: string
  creationData: {
    _timeStamp: string
    formattedCreationDate: string
    userDataCreator: UserDataCreator
  },

  postData: {
    title: string
    text: string
    document: string[]
    postScope: 'global' | 'personal'
  }

  postActivityData: ActivityData
  reports: ReportData[] | null
}
