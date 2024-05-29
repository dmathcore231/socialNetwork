import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userSchema'
import { PostModel } from '../models/postSchema'

export async function deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { id } = req.params

  if (status) return next()

  const post = await PostModel.findById(id)
  const user = await UserModel.findById(dataFromClient.user._id)

  if (post && user) {
    await PostModel.deleteOne({ _id: id })
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: dataFromClient.user._id },
      { $pull: { 'userActivityData.posts': { $in: [id] } } },
      { new: true }

    )
      .populate('userActivityData.posts')

    dataFromClient.user = updateUser
    dataFromClient.message = 'Post successfully deleted'
  }

  return next()
}
