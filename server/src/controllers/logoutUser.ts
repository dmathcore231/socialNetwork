import { Request, Response, NextFunction } from 'express'

export async function logoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { dataFromClient } = res.locals
  const { status } = dataFromClient.error

  if (!status) {
    dataFromClient.message = 'User successfully logout'
    dataFromClient.user = null
    dataFromClient.token = {
      accessToken: {
        validToken: null,
        value: null,
        expired: null
      },
      refreshToken: {
        validToken: null,
        value: null,
        expired: null
      }
    }
    return next()
  }

  return next()
}
