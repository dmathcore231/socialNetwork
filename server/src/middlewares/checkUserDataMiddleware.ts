import { Request, Response, NextFunction } from 'express'

export async function checkUserDataMiddleware(req: Request, res: Response, next: NextFunction) {
  const { dataFromClient } = res.locals
  const { user } = dataFromClient
  const { status } = dataFromClient.error

  if (status) return next()

  if (!user) {
    dataFromClient.error = {
      status: 401,
      errorNumber: 7,
      message: 'Unauthorized'
    }
    return next()
  }

  return next()
}
