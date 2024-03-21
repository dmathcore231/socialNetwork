import { Request, Response, NextFunction } from 'express'
import { DataFromClient } from '../types/interface/DataFromClient'

export function setLocalData(req: Request, res: Response, next: NextFunction) {

  const data: DataFromClient = {
    user: null,
    token: {
      accessToken: null,
      validAccessToken: null
    },
    error: {
      status: null,
      errorNumber: null,
      message: null
    }
  }
  res.locals.dataFromClient = data
  next()
}

