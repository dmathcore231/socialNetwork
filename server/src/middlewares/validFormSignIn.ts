import { Request, Response, NextFunction } from 'express'
import { createResForMissingFields } from '../utils/createResForMissingFields'
import { UserModel } from '../models/userSchema'
import { compare } from 'bcrypt'

export async function validFormSignIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  try {
    createResForMissingFields([
      { field: email, label: 'Email' },
      { field: password, label: 'Password' }
    ])

    const user = await UserModel.findOne({ 'userPersonalData.email': email })
    if (!user) {
      res.locals.dataFromClient.error = {
        status: 401,
        errorNumber: 4,
        message: 'User not found'
      }
      return next()
    }

    const validPassword = await compare(password, user.userPersonalData.password)
    if (!validPassword) {
      res.locals.dataFromClient.error = {
        status: 401,
        errorNumber: 5,
        message: 'Invalid password'
      }
      return next()
    }

    return next()
  } catch (error: any) {
    res.locals.dataFromClient.error = {
      status: 400,
      errorNumber: 2,
      message: error.message
    }

    return next()
  }
}
