import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, EXP_IN_ACCESS_TOKEN } from '../utils/constants'
import { UserModel } from '../models/userSchema'

export async function getUserByToken(req: Request, res: Response, next: NextFunction) {
  const { dataFromClient } = res.locals
  const { accessToken } = dataFromClient.token
  const { status } = dataFromClient.error

  if (!status) {
    const user = await UserModel.findById(dataFromClient.user._id)

    if (user) {
      const setAccessToken = jwt.sign({ id: user._id },
        SECRET_KEY,
        { expiresIn: EXP_IN_ACCESS_TOKEN }
      )

      dataFromClient.user = await UserModel.findOne({ _id: user._id })
        .select('-userPersonalData.password')
        .populate('userActivityData.posts')
        .populate('userActivityData.likes')
      dataFromClient.message = 'User Data successfully get'
      accessToken.value = (accessToken.expired ? setAccessToken : accessToken.value)
      accessToken.validToken = true
      accessToken.expired = false
    }

    return next()
  }

  return next()
}
