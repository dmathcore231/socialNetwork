
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
    posts: string[] | null
    comments: string[] | null
    likes: string[] | null
    reposts: string[] | null
    subscriptions: string[] | null
    reports: string[] | null
  }
}

