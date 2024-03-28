import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, EXP_IN_ACCESS_TOKEN, EXP_IN_REFRESH_TOKEN } from '../utils/constants'
import { UserModel } from '../models/userSchema'
import { UserDataInResponse } from '../types/UserDataInResponse'

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body
  const { status } = res.locals.dataFromClient.error
  const { dataFromClient } = res.locals
  const { accessToken, refreshToken } = dataFromClient.token

  const user = await UserModel.findOne({ 'userPersonalData.email': email })

  if (!status && user) {

    const setAccessToken = jwt.sign({ id: user._id },
      SECRET_KEY,
      { expiresIn: EXP_IN_ACCESS_TOKEN }
    )
    const setRefreshToken = jwt.sign({ id: user._id, fullName: user.userName.fullName, tagUser: user.tagUser, _role: user._role },
      SECRET_KEY,
      { expiresIn: EXP_IN_REFRESH_TOKEN }
    )

    const dataUser: UserDataInResponse = {
      _role: user._role,
      _id: user._id,
      userName: { ...user.userName },
      userPersonalData: {
        email: user.userPersonalData.email,
        phone: user.userPersonalData.phone
      },
      birthDayUser: user.birthDayUser,
      genderUser: user.genderUser,
      tagUser: user.tagUser
    }

    dataFromClient.user = dataUser
    dataFromClient.message = 'User successfully authenticated'
    accessToken.value = setAccessToken
    refreshToken.value = setRefreshToken

    return next()
  }

  return next()
}
