import { Request, Response, NextFunction } from 'express'
import { documentInPostUpload } from '../utils/multerConfig'
import { PostModel } from '../models/postSchema'
import { createResForMissingFields } from '../utils/createResForMissingFields'

export async function editPostMiddleware(req: Request, res: Response, next: NextFunction) {
  documentInPostUpload.single('file')(req, res, async (err) => {
    const { dataFromClient } = res.locals
    const { status } = dataFromClient.error
    const { title, text, postScope } = req.body
    const { id } = req.params

    if (status) return next()

    try {
      if (err) {
        dataFromClient.error = {
          status: 422,
          errorNumber: 9,
          message: 'Error uploading file'
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

      createResForMissingFields([
        { field: title, label: 'Title' },
        { field: text, label: 'Text' },
        { field: postScope, label: 'Post scope' }
      ])

      dataFromClient.postData = {
        title: title,
        text: text,
        document: req.file ? req.file.path : null,
        postScope: postScope
      }

      return next()
    } catch (error: any) {
      dataFromClient.error = {
        status: 400,
        errorNumber: 3,
        message: error.message
      }

      return next()
    }
  })
}
