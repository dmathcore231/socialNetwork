import { Request, Response, NextFunction } from 'express'
import { hash } from 'bcrypt'
import { UserModel } from '../models/userSchema'
import { formDefaultUserTag } from '../helpers/formDefaultUserTag'
import { getFormattedDate } from '../helpers/getFormattedDate'

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, password } = req.body
  const { status } = res.locals.dataFromClient.error

  if (!status) {
    const hashedPassword = await hash(password, 10)

    const user = await UserModel.create({
      userData: {
        userName: {
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`
        },
        userTag: formDefaultUserTag(firstName, lastName),
        userBirthDay: null,
        userGender: null,
        userAvatar: null,
        userBanner: null,
        userAbout: null,
        userLocation: null
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

      formattedRegistrationDate: getFormattedDate(),
    })

    await user.save()
    res.locals.dataFromClient.user = user
    res.locals.dataFromClient.message = 'User successfully created'

    return next()
  }

  return next()
}
