import { Request, Response, NextFunction } from 'express'
import path from 'path'
import sharp from 'sharp'
import { userAvatarsUpload } from '../utils/multerConfig'

export async function createUserAvatarMiddleware(req: Request, res: Response, next: NextFunction) {
  userAvatarsUpload.single('avatar')(req, res, async (err) => {
    const { dataFromClient } = res.locals
    const { status } = dataFromClient.error
    const { user } = dataFromClient

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

      if (req.file) {
        const avatar = req.file as Express.Multer.File
        const userId = user._id
        const timeStamp = Date.now()
        const { buffer } = avatar

        const originalFileName = path.basename(`${userId}_${timeStamp}`, path.extname(avatar.originalname))
        const resizedImagePath = `public/userAvatars/${originalFileName}${path.extname(avatar.originalname)}`
        await sharp(buffer)
          .resize({ width: 800 })
          .toFile(resizedImagePath)

        user.userData.userAvatar = resizedImagePath
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
