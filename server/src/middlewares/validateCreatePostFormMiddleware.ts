import sharp from 'sharp'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { documentInPostUpload } from '../utils/multerConfig'
import { createResForMissingFields } from '../utils/createResForMissingFields'
import { UserModel } from '../models/userSchema'

export async function validateCreatePostFormMiddleware(req: Request, res: Response, next: NextFunction) {
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

      if (req.files) {
        const files = req.files as Express.Multer.File[]
        const resizedFiles = []
        const userId = dataFromClient.user._id
        const timeStamp = Date.now()

        for (const file of files) {
          const { buffer } = file
          const originalFileName = path.basename(`${userId}_${timeStamp + files.indexOf(file)}`, path.extname(file.originalname))
          const resizedImagePath = `public/documentInPost/${originalFileName}${path.extname(file.originalname)}`

          await sharp(buffer)
            .resize({ width: 1200 })
            .toFile(resizedImagePath)

          resizedFiles.push(resizedImagePath)
        }

        dataFromClient.postData = {
          title: title,
          text: text,
          document: resizedFiles,
          postScope: postScope
        }
      }

      return next()
    } catch (error: any) {
      dataFromClient.error = {
        status: 400,
        errorNumber: 3,
        message: error.message
      }
      console.log(error)
      return next()
    }
  })
}
