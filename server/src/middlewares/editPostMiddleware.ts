import { Request, Response, NextFunction } from 'express'
import path from 'path'
import sharp from 'sharp'
import { documentInPostUpload } from '../utils/multerConfig'
import { PostModel } from '../models/postSchema'
import { createResForMissingFields } from '../utils/createResForMissingFields'

export async function editPostMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  documentInPostUpload.array('document', 5)(req, res, async (err) => {
    const { dataFromClient } = res.locals
    const { status } = dataFromClient.error
    const { title, text, document, postScope } = req.body
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

      if (req.files) {
        const files = req.files as Express.Multer.File[]
        const userId = dataFromClient.user._id
        const timeStamp = Date.now()
        const updateDocument = []

        for (const file of files) {
          const { buffer } = file
          const originalFileName = path.basename(`${userId}_${timeStamp + files.indexOf(file)}`, path.extname(file.originalname));
          const resizedImagePath = `public/documentInPost/${originalFileName}${path.extname(file.originalname)}`

          await sharp(buffer)
            .resize({ width: 1200 })
            .toFile(resizedImagePath)

          updateDocument.push(resizedImagePath)
        }

        dataFromClient.postData = {
          title: title,
          text: text,
          document: updateDocument,
          postScope: postScope
        }
      }

      if (!req.files && document) {
        dataFromClient.postData = {
          title: title,
          text: text,
          document: document,
          postScope: postScope
        }
      }

      if (req.files && document) {
        if (typeof document === 'string') {
          dataFromClient.postData = {
            title: title,
            text: text,
            document: [...dataFromClient.postData.document, document],
            postScope: postScope
          }
        } else {
          dataFromClient.postData = {
            title: title,
            text: text,
            document: [...dataFromClient.postData.document, ...document],
            postScope: postScope
          }
        }
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
