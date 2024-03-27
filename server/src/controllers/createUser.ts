import { Request, Response, NextFunction } from 'express'
import { hash } from 'bcrypt'
import { UserModel } from '../models/userSchema'

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, password } = req.body
  const { status } = res.locals.dataFromClient.error

  if (!status) {
    const hashedPassword = await hash(password, 10)

    const user = await UserModel.create({
      userName: {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`
      },
      userPersonalData: {
        email,
        password: hashedPassword
      }
    })
    await user.save()
    res.locals.dataFromClient.user = user
    res.locals.dataFromClient.message = 'User successfully created'

    return next()
  }

  return next()
}
