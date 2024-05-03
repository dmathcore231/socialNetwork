import { CommentData } from './CommentData'
import { ReportData } from './ReportData'
import { RepostData } from './RepostData'
import { Post } from './interface/Post'
import { LikeData } from './likeData'

export type UserDataInResponse = {
  _role: 'user' | 'moderator' | 'admin'
  _id: string
  formattedRegistrationDate: string
  userData: {
    userName: {
      firstName: string
      lastName: string
      fullName: string
    }
    userTag: string
    userAvatar?: string | null
    userBanner?: string | null
    userAbout?: string | null
    userLocation?: string | null
    userBirthDay?: string | null
    userGender?: string | null
  }

  userPersonalData: {
    email: string
    phone?: string
  }

  userActivityData: {
    posts: Post[] | null
    comments: CommentData[] | null
    likes: LikeData[] | null
    reposts: RepostData[] | null
    subscriptions: string[] | null
    reports: ReportData[] | null
  }
}
