import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'

export async function setLikePostMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { id } = req.params

  if (status) return next()

  if (!id) {
    dataFromClient.error = {
      status: 404,
      errorNumber: 10,
      message: 'Post not found'
    }
    return next()
  }

  const post = await PostModel.findById(id)

  if (!post) {
    dataFromClient.error = {
      status: 404,
      errorNumber: 10,
      message: 'Post not found'
    }
    return next()
  }

  dataFromClient.postById = post

  return next()
}
