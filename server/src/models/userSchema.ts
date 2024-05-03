import mongoose, { Schema } from 'mongoose'
import { User } from '../types/interface/User'
import { Post } from '../types/interface/Post'
import { CommentData } from '../types/CommentData'
import { LikeData } from '../types/likeData'
import { RepostData } from '../types/RepostData'
import { ReportData } from '../types/ReportData'

const userSchema: Schema<User> = new Schema<User>({
  userData: {
    userName: {
      firstName: String,
      lastName: String,
      fullName: String
    },
    userBirthDay: String,
    userGender: String,
    userTag: String,
    userAvatar: String || null,
    userBanner: String || null,
    userAbout: String || null,
    userLocation: String
  },

  userPersonalData: {
    email: String,
    password: String,
    phone: String
  },

  userActivityData: {
    posts: Array<Post> || null,
    comments: Array<CommentData> || null,
    likes: Array<LikeData> || null,
    reposts: Array<RepostData> || null,
    subscriptions: Array || null,
    reports: Array<ReportData> || null
  },

  registrationDate: {
    type: Date,
    default: Date.now
  },

  formattedRegistrationDate: {
    type: String
  },

  _role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  }
}, { id: false })

export const UserModel = mongoose.model<User>('User', userSchema)
