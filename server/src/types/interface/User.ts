import { Document } from 'mongoose'

export interface User extends Document {
  userName: {
    firstName: string
    lastName: string
    fullName: string
  }
  userPersonalData: {
    email: string
    password: string
    phone: string
  }
  birthDayUser: string
  genderUser: string
  tagUser: string
  _role: 'user' | 'moderator' | 'admin'
}
