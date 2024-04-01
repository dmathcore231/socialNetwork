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
    userBirthDay?: string
    userGender?: string
    userTag: string
    userAvatar?: {
      avatarSizeSm: string
      avatarSizeLg: string
    }
    userBanner?: string
    userAbout?: string
    userLocation?: string
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
