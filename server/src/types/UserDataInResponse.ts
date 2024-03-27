
export type UserDataInResponse = {
  _role: 'user' | 'moderator' | 'admin'
  _id: string
  userName: {
    firstName: string
    lastName: string
    fullName: string
  },
  userPersonalData: {
    email: string
    phone?: string
  },
  birthDayUser?: string
  genderUser?: string
  tagUser?: string
}
