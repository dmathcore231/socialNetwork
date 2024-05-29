import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { UserModel } from '../models/userSchema'
import { SECRET_KEY } from '../utils/constants'
import cookieParser from 'cookie-parser'

export function checkTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  cookieParser()(req, res, async () => {
    const { dataFromClient } = res.locals
    const { accessToken, refreshToken } = dataFromClient.token
    const refreshTokenInReq = req.cookies.refreshToken
    const accessTokenInReq = req.headers.authorization?.replace('Bearer ', '')

    try {
      if (refreshTokenInReq && accessTokenInReq) {
        const decodeAccessToken = jwt.verify(accessTokenInReq, SECRET_KEY) as JwtPayload
        const decodeRefreshToken = jwt.verify(refreshTokenInReq, SECRET_KEY) as JwtPayload
        const user = await UserModel.findById(decodeAccessToken.id)
        const currentTimestamp = Math.floor(Date.now() / 1000)

        if (decodeAccessToken.value && decodeAccessToken.exp! - currentTimestamp <= 300) {
          decodeAccessToken.value.expired = true
        }

        accessToken.value = accessTokenInReq
        accessToken.validToken = true
        refreshToken.value = refreshTokenInReq
        refreshToken.validToken = true
        dataFromClient.user = user

        return next()
      } else {
        dataFromClient.error = {
          status: 401,
          errorNumber: 7,
          message: 'Unauthorized'
        }
        accessToken.validToken = false
        refreshToken.validToken = false
        return next()
      }
    } catch (error: unknown) {
      const err: VerifyErrors = error as VerifyErrors
      const decodeAccessToken = jwt.decode(accessTokenInReq!) as JwtPayload
      const decodeRefreshToken = jwt.decode(refreshTokenInReq) as JwtPayload
      const currentTimestamp = Math.floor(Date.now() / 1000)

      if (err.name === 'TokenExpiredError' && decodeRefreshToken.exp! - currentTimestamp <= 300) {
        dataFromClient.error = {
          status: 401,
          errorNumber: 6,
          message: 'Refresh token expired'
        }
        refreshToken.expired = true

        return next()

      } else if (err.name === 'TokenExpiredError') {
        const user = await UserModel.findById(decodeAccessToken.id)
        dataFromClient.user = user
        accessToken.value = decodeAccessToken
        accessToken.validToken = true
        accessToken.expired = true

        return next()
      } else {
        dataFromClient.error = {
          status: 401,
          errorNumber: 7,
          message: 'Unauthorized'
        }
        accessToken.validToken = false
        refreshToken.validToken = false

        return next()
      }
    }
  })
}
