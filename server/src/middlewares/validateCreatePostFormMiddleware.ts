import { Request, Response, NextFunction } from 'express'
import { documentInPostUpload } from '../utils/multerConfig'
import { createResForMissingFields } from '../utils/createResForMissingFields'

export function validateCreatePostFormMiddleware(req: Request, res: Response, next: NextFunction) {
  documentInPostUpload.single('file')(req, res, async (err) => {
    const { dataFromClient } = res.locals
    const { status } = dataFromClient.error
    const { creationData, postData, postActivityData } = req.body


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
        { field: creationData, label: 'Creation data' },
        { field: postData, label: 'Post data' },
        { field: postActivityData, label: 'Post activity data' }
      ])

      dataFromClient.postData = {
        title: postData.title,
        text: postData.text,
        document: req.file ? req.file.path : null,
        postScope: postData.postScope
      }

      return next()
    } catch (error) {
      dataFromClient.error = {
        status: 400,
        errorNumber: 3,
        message: error
      }

      return next()
    }
  })
}
