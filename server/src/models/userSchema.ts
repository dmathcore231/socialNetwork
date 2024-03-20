import mongoose, { Schema } from 'mongoose'
import { User } from '../types/interface/User'

const userSchema: Schema<User> = new Schema<User>({
  userName: {
    firstName: String,
    lastName: String,
    fullName: String
  },
  userPersonalData: {
    email: String,
    password: String,
    phone: String
  },
  birthDayUser: String,
  genderUser: String,
  tagUser: String,
  _role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  }
}, { id: false })

export const UserModel = mongoose.model<User>('User', userSchema)
