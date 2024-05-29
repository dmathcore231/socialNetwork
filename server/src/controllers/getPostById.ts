import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'

export async function getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { id } = req.params

  if (status) return next()

  dataFromClient.postById = await PostModel.findById(id)
    .populate('postActivityData.comments')
  dataFromClient.message = 'Successfully got post by id'

  return next()
}
