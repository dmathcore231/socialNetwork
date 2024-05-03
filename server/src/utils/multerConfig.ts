import multer from 'multer'

export const formDataWithoutFile = multer().none()

const documentInPostStorage = multer.memoryStorage()
const userAvatarsStorage = multer.memoryStorage()

export const userAvatarsUpload = multer({ storage: userAvatarsStorage })
export const documentInPostUpload = multer({ storage: documentInPostStorage })

