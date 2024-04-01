import { Document } from 'mongoose'
import { CommentData } from '../CommentData'
import { Post } from './Post'
import { LikeData } from '../likeData'
import { ReportData } from '../ReportData'
import { RepostData } from '../RepostData'

export interface User extends Document {
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
    password: string
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

  registrationDate: Date
  formattedRegistrationDate: string
  _role: 'user' | 'moderator' | 'admin'
}
