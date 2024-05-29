import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'
import { LikeData } from '../types/likeData'
import { UserModel } from '../models/userSchema'

export async function toggleLikePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { user } = dataFromClient
  const { userTag, userAvatar, userName: { fullName } } = user.userData
  const { status } = dataFromClient.error
  const { id } = req.params

  if (status) return next()

  const post = await PostModel.findById(id)

  if (post && post.postActivityData.likes) {
    const userLikeData: LikeData = {
      _timestamp: Date.now(),
      _postId: id,
      userDataCreator: {
        _id: dataFromClient.user._id,
        _role: dataFromClient.user._role,
        fullName: fullName,
        tag: userTag,
        userAvatar: userAvatar
      }
    }

    const checkLikePost = await PostModel.findOne(
      {
        _id: id,
        'postActivityData.likes': { $elemMatch: { 'userDataCreator._id': dataFromClient.user._id } }
      })

    if (checkLikePost) {
      const updatePost = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $pull: { 'postActivityData.likes': { 'userDataCreator._id': { $in: [dataFromClient.user._id] } } } },
        { new: true }
      )
        .populate('postActivityData.comments')

      await UserModel.findByIdAndUpdate(
        { _id: dataFromClient.user._id },
        { $pull: { 'userActivityData.likes': { $in: [id] } } },
        { new: true }
      )

      dataFromClient.postById = updatePost
    } else {
      const updatePost = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $push: { 'postActivityData.likes': userLikeData } },
        { new: true }
      )
        .populate('postActivityData.comments')

      await UserModel.findByIdAndUpdate(
        { _id: dataFromClient.user._id },
        { $push: { 'userActivityData.likes': id } },
        { new: true }
      )

      dataFromClient.postById = updatePost
    }

    dataFromClient.message = 'Post successfully liked'

    return next()
  }
}
