import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userSchema'
import { getFormattedDate } from '../helpers/getFormattedDate'
import { Post } from '../types/interface/Post'
import { getFormattedUserData } from '../helpers/getFormattedUserData'
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
      user: getFormattedUserData(user)
    },
    postData: postData
  })

  const updateUser = await UserModel.findOneAndUpdate(
    { _id: user._id },
    { $push: { userActivityData: { posts: newPost } } }
  )

  await updateUser!.save()

  return next()
}
