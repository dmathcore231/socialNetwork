import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, EXP_IN_ACCESS_TOKEN } from '../utils/constants'
import { UserDataInResponse } from '../types/UserDataInResponse'
import { UserModel } from '../models/userSchema'

export async function getUserByToken(req: Request, res: Response, next: NextFunction) {
  const { dataFromClient } = res.locals
  const { accessToken } = dataFromClient.token
  const { status } = dataFromClient.error

  if (!status) {
    const user = await UserModel.findById(dataFromClient.user._id)

    if (user) {
      console.log('++')
      const dataUser: UserDataInResponse = {
        _role: user._role,
        _id: user._id,
        formattedRegistrationDate: user.formattedRegistrationDate,
        userData: { ...user.userData },
        userPersonalData: {
          email: user.userPersonalData.email,
          phone: user.userPersonalData.phone
        },
        userActivityData: { ...user.userActivityData },
      }

      const setAccessToken = jwt.sign({ id: user._id },
        SECRET_KEY,
        { expiresIn: EXP_IN_ACCESS_TOKEN }
      )

      dataFromClient.user = dataUser
      dataFromClient.message = 'User Data successfully get '
      accessToken.value = (accessToken.expired ? setAccessToken : accessToken.value)
      accessToken.validToken = true
      accessToken.expired = false
      console.log(dataUser)
    }

    return next()
  }

  return next()
}
