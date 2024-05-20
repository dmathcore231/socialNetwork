import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userSchema'
import { getFormattedDate } from '../helpers/getFormattedDate'
import { PostModel } from '../models/postSchema'

export async function createPost(req: Request, res: Response, next: NextFunction) {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { postData } = dataFromClient
  const { user } = dataFromClient

  if (status) return next()

  const newPost = await PostModel.create({
    creationData: {
      formattedCreationDate: getFormattedDate(),
      userDataCreator: {
        _id: user._id,
        _role: user._role,
        fullName: user.userData.userName.fullName,
        tag: user.userData.userTag,
        userAvatar: user.userData.userAvatar
      }
    },
    postData: postData
  })

  if (user.userActivityData.posts === null) {
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { "userActivityData.posts": [newPost] } },
      { new: true }
    )

    await updateUser!.save()

    return next()
  } else {
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $push: { "userActivityData.posts": newPost } },
      { new: true }
    )

    await updateUser!.save()

    return next()
  }
}
