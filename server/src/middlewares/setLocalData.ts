import { Request, Response, NextFunction } from 'express'
import { DataFromClient } from '../types/interface/DataFromClient'

export function setLocalData(req: Request, res: Response, next: NextFunction) {

  const data: DataFromClient = {
    user: null,
    token: {
      accessToken: null,
      validAccessToken: null,
      refreshToken: null,
      validRefreshToken: null
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

