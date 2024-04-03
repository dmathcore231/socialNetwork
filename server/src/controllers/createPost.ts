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
      userIdCreated: user._id
    },
    postData: postData
  })

  if (user.userActivityData.posts === null) {
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { "userActivityData.posts": [newPost] } }
    )

    await updateUser!.save()

    return next()
  } else {
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $push: { "userActivityData.posts": newPost } }
    )

    await updateUser!.save()

    return next()
  }
}
