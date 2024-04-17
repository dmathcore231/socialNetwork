import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'

export async function getPostById(req: Request, res: Response, next: NextFunction) {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { id } = req.params

  if (status) return next()

  const post = await PostModel.findById(id)
  dataFromClient.postById = post
  dataFromClient.message = 'Successfully got post by id'

  return next()
}
