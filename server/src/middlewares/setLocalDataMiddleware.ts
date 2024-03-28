import { Request, Response, NextFunction } from 'express'
import { DataFromClient } from '../types/interface/DataFromClient'

export function setLocalDataMiddleware(req: Request, res: Response, next: NextFunction) {

  const data: DataFromClient = {
    user: null,
    token: {
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
    },
    error: {
      status: null,
      errorNumber: null,
      message: null
    },
    message: null
  }
  res.locals.dataFromClient = data
  return next()
}

