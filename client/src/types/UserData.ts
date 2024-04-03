import { PostData } from "./PostData"
import { CommentData } from "./CommentData"
import { LikeData } from "./likeData"
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
    posts: PostData[] | null
    comments: CommentData[] | null
    likes: LikeData[] | null
    reposts: RepostData[] | null
    subscriptions: string[] | null
    reports: ReportData[] | null
  }
}

