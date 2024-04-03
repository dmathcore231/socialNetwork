import multer from 'multer'
import path from 'path'

export const formDataWithoutFile = multer().none()

const userAvatarsStorage = multer.diskStorage({
  destination: 'public/userAvatars',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // need fix name file (id user + date now)
  }
})

const documentInPostStorage = multer.diskStorage({
  destination: 'public/documentInPost',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // need fix name file (id user + date now)
  }
})

export const userAvatarsUpload = multer({ storage: userAvatarsStorage })
export const documentInPostUpload = multer({ storage: documentInPostStorage })

