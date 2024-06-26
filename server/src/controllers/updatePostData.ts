import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'

export async function updatePostData(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error
  const { id } = req.params
  const { title, text, document, postScope } = dataFromClient.postData

  if (status) return next()

  const post = await PostModel.findById(id)

  post!.postData = {
    title: title,
    text: text,
    document: document ? document : null,
    postScope: postScope
  }

  await post!.save()

  dataFromClient.postById = post
  dataFromClient.message = 'Successfully updated post'

  return next()
}
