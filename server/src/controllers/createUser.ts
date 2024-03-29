import { Request, Response, NextFunction } from 'express'
import { hash } from 'bcrypt'
import { UserModel } from '../models/userSchema'

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, password } = req.body
  const { status } = res.locals.dataFromClient.error
  const currentDate = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long'
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate)

  if (!status) {
    const hashedPassword = await hash(password, 10)

    const user = await UserModel.create({
      userData: {
        userName: {
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`
        },
        userTag: `@${firstName}${lastName}`
      },

      userPersonalData: {
        email,
        password: hashedPassword
      },

      userActivityData: {
        posts: null,
        comments: null,
        likes: null,
        reposts: null,
        subscriptions: null,
        reports: null
      },

      formattedRegistrationDate: formattedDate,
    })

    await user.save()
    res.locals.dataFromClient.user = user
    res.locals.dataFromClient.message = 'User successfully created'

    return next()
  }

  return next()
}
