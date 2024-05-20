import { UserModel } from "../models/userSchema"
import { User } from "../types/interface/User"
import { UserDataInResponse } from "../types/UserDataInResponse"

export async function getFormattedUserData(userData: User): Promise<UserDataInResponse> {
  const user = await UserModel.findById(userData._id).populate('userActivityData.posts')

  const test = {
    _role: userData._role,
    _id: userData._id,
    formattedRegistrationDate: userData.formattedRegistrationDate,
    userData: { ...userData.userData },
    userPersonalData: {
      email: userData.userPersonalData.email,
      phone: userData.userPersonalData.phone
    },
    userActivityData: {
      ...userData.userActivityData,
      posts: user!.userActivityData.posts
    },
  }

  return {
    _role: userData._role,
    _id: userData._id,
    formattedRegistrationDate: userData.formattedRegistrationDate,
    userData: { ...userData.userData },
    userPersonalData: {
      email: userData.userPersonalData.email,
      phone: userData.userPersonalData.phone
    },
    userActivityData: {
      ...userData.userActivityData,
      posts: user!.userActivityData.posts
    },
  }
}
