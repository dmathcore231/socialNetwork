import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'
import { UserModel } from '../models/userSchema'
import { CommentModel } from '../models/commentSchema'
import { CommentData } from '../types/CommentData'
import { getFormattedDate } from '../helpers/getFormattedDate'

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { id } = req.params
  const { textComment } = req.body

  if (status) return next()

  const post = await PostModel.findById(id)

  if (post && post.postActivityData.comments) {
    const commentData = await CommentModel.create({
      _postId: id,
      _timestamp: Date.now(),
      userDataCreator: {
        _id: dataFromClient.user._id,
        _role: dataFromClient.user._role,
        fullName: dataFromClient.user.userData.userName.fullName,
        tag: dataFromClient.user.userData.userTag,
        userAvatar: dataFromClient.user.userData.userAvatar
      },
      formattedDate: getFormattedDate(),
      text: textComment
    })

    const updatePost = await PostModel.findOne(
      {
        _id: id,
        'postActivityData.comments': { $elemMatch: { 'userDataCreator._id': dataFromClient.user._id } }
      }
    )

    if (updatePost) {
      const updatePost = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $pull: { 'postActivityData.comments': { 'userDataCreator._id': { $in: [dataFromClient.user._id] } } } },
        { new: true }
      )

      await UserModel.findByIdAndUpdate(
        { _id: dataFromClient.user._id },
        { $pull: { 'userActivityData.comments': { $in: [commentData._id] } } },
        { new: true }
      )

      dataFromClient.postById = updatePost
    } else {
      const updatePost = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $push: { 'postActivityData.comments': commentData } },
        { new: true }
      )

      await UserModel.findByIdAndUpdate(
        { _id: dataFromClient.user._id },
        { $push: { 'userActivityData.comments': commentData._id } },
        { new: true }
      )

      dataFromClient.postById = await PostModel.findById(id)
        .populate('postActivityData.comments')
    }

    dataFromClient.message = 'Post successfully commented'

    return next()
  }
}
