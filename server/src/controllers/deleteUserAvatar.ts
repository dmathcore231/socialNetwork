import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userSchema'
import { PostModel } from '../models/postSchema'

export async function deleteUserAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { _id } = dataFromClient.user

  if (status) return next()

  const user = await UserModel.findById(dataFromClient.user._id)

  if (user) {
    user.userData.userAvatar = null

    await PostModel.updateMany(
      { 'creationData.userDataCreator._id': _id },
      { $set: { 'creationData.userDataCreator.userAvatar': null } }
    )

    await user.save()

    dataFromClient.user = await UserModel.findOne({ _id: _id })
      .populate('userActivityData.posts')
    dataFromClient.message = 'User avatar successfully deleted'

    return next()
  } else {
    dataFromClient.error = {
      status: 404,
      errorNumber: 11,
      message: 'User not found'
    }

    return next()
  }
}
