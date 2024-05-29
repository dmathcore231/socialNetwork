import mongoose, { Schema } from 'mongoose'
import { User } from '../types/interface/User'
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
    userBirthDay: {
      type: String,
      default: null
    },
    userGender: {
      type: String,
      default: null
    },
    userTag: {
      type: String,
    },
    userAvatar: {
      type: String || null,
      default: null
    },
    userBanner: {
      type: String || null,
      default: null
    },
    userAbout: {
      type: String || null,
      default: null
    },
    userLocation: {
      type: String || null,
      default: null
    }
  },

  userPersonalData: {
    email: String,
    password: String,
    phone: String
  },

  userActivityData: {
    posts: {
      type: [Schema.Types.ObjectId],
      ref: 'Post',
      default: []
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      default: []
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'Post',
      default: []
    },
    reposts: {
      type: Array<RepostData>,
      default: []
    },
    subscriptions: {
      type: Array<String>,
      default: []
    },
    reports: {
      type: Array<ReportData>,
      default: []
    }
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
