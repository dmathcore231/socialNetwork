import { Request, Response, NextFunction } from 'express'
import { formDataWithoutFile } from '../utils/multerConfig'
import { createResForMissingFields } from '../utils/createResForMissingFields'
import { UserModel } from '../models/userSchema'

export function validateSignUpFormMiddleware(req: Request, res: Response, next: NextFunction): void {
   formDataWithoutFile(req, res, async (err) => {
      const { firstName, lastName, email, password } = req.body

      try {
         createResForMissingFields([
            { field: firstName, label: 'First name' },
            { field: lastName, label: 'Last name' },
            { field: email, label: 'Email' },
            { field: password, label: 'Password' }
         ])

         const existingEmail = await UserModel.findOne({ 'userPersonalData.email': email })
         if (existingEmail) {
            res.locals.dataFromClient.error = {
               status: 409,
               errorNumber: 1,
               message: 'User with this email already exists'
            }
            return next()
         }

         return next()
      } catch (error: any) {
         res.locals.dataFromClient.error = {
            status: 400,
            errorNumber: 3,
            message: error.message
         }
         return next()
      }
   })
}
