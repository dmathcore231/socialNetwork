import { Request, Response, NextFunction } from 'express'
import { documentInPostUpload } from '../utils/multerConfig'
import { createResForMissingFields } from '../utils/createResForMissingFields'

export function validateCreatePostFormMiddleware(req: Request, res: Response, next: NextFunction) {
  documentInPostUpload.array('document', 5)(req, res, async (err) => {
    const { dataFromClient } = res.locals
    const { status } = dataFromClient.error
    const { title, text, postScope } = req.body

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

      createResForMissingFields([
        { field: title, label: 'Title' },
        { field: text, label: 'Text' },
        { field: postScope, label: 'Post scope' }
      ])

      dataFromClient.postData = {
        title: title,
        text: text,
        document: req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : null,
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
