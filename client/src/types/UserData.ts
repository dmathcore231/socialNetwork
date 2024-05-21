import { PostData } from "./PostData"
import { CommentData } from "./CommentData"
import { RepostData } from "./RepostData"
import { ReportData } from "./ReportData"

export type UserData = {
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
    userAvatar?: string | null
    userBanner?: string | null
    userAbout?: string | null
    userLocation?: string | null
  }

  userPersonalData: {
    email: string
    phone?: string
  }

  userActivityData: {
    posts: PostData[]
    comments: CommentData[]
    likes: PostData[]
    reposts: RepostData[]
    subscriptions: string[]
    reports: ReportData[]
  }
}

