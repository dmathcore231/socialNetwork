import { Request, Response } from 'express'
import { validFormSignUp } from '../middlewares/validFormSignUp'

export async function createUser(req: Request, res: Response) {
  console.log(res.locals.dataFromClient)
}
