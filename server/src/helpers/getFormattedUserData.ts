import { User } from "../types/interface/User"
import { UserDataInResponse } from "../types/UserDataInResponse"

export function getFormattedUserData(userData: User): UserDataInResponse {
  return {
    _role: userData._role,
    _id: userData._id,
    formattedRegistrationDate: userData.formattedRegistrationDate,
    userData: { ...userData.userData },
    userPersonalData: {
      email: userData.userPersonalData.email,
      phone: userData.userPersonalData.phone
    },
    userActivityData: { ...userData.userActivityData },
  }
}
