import { Request, Response, NextFunction } from 'express'
import { PostModel } from '../models/postSchema'
import { formDataWithoutFile } from '../utils/multerConfig'
import { createResForMissingFields } from '../utils/createResForMissingFields'


export async function createCommentPostMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  formDataWithoutFile(req, res, async (err) => {
    const { dataFromClient } = res.locals
    const { status } = dataFromClient.error
    const { id } = req.params
    const { textComment } = req.body

    if (status) return next()

    try {
      createResForMissingFields([
        { field: textComment, label: 'Text comment' }
      ])

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
    } catch (error: any) {
      dataFromClient.error = {
        status: 400,
        errorNumber: 3,
        message: error.message
      }
      return next(error)
    }
  })
}
