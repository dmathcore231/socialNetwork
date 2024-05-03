import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userSchema'
import { PostModel } from '../models/postSchema';
import { getFormattedUserData } from '../helpers/getFormattedUserData'

export async function createUserAvatar(req: Request, res: Response, next: NextFunction) {
  const { dataFromClient } = res.locals
  const { _id } = dataFromClient.user
  const { status } = dataFromClient.error
  const { userAvatar } = dataFromClient.user.userData

  if (status) return next()

  const user = await UserModel.findById(_id)

  if (user) {
    user.userData.userAvatar = userAvatar

    await user.save()

    await PostModel.updateMany(
      { 'creationData.userDataCreator._id': _id },
      { $set: { 'creationData.userDataCreator.userAvatar': userAvatar } }
    )

    await UserModel.updateMany(
      { '_id': _id },
      { $set: { 'userActivityData.posts.$[].creationData.userDataCreator.userAvatar': userAvatar } }
    )

    dataFromClient.user = getFormattedUserData(user!)
    dataFromClient.message = 'User avatar successfully created'
  }

  return next()
}
