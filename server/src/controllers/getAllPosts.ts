import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'

export async function getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error

  if (status) return next()

  const getAllPosts = await PostModel.find().sort({ 'creationData._timeStamp': -1 })

  dataFromClient.allPosts = getAllPosts
  dataFromClient.message = "Successfully got all posts"

  return next()
}
