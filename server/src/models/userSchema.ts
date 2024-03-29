import mongoose, { Schema } from 'mongoose'
import { User } from '../types/interface/User'

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
    userAvatar: {
      avatarSizeSm: String,
      avatarSizeLg: String
    },
    userBanner: String,
    userAbout: String,
    userLocation: String
  },

  userPersonalData: {
    email: String,
    password: String,
    phone: String
  },

  userActivityData: {
    posts: [String],
    comments: [String],
    likes: [String],
    reposts: [String],
    subscriptions: [String],
    reports: [String]
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
