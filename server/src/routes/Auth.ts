import express, { Request, Response } from "express"
import { createUser } from "../controllers/createUser"
import { authenticateUser } from "../controllers/authenticateUser"
import { getUserByToken } from "../controllers/getUserByToken"
import { logoutUser } from "../controllers/logoutUser"
import { validateSignUpFormMiddleware } from "../middlewares/validateSignUpFormMiddleware"
import { validateSignInFormMiddleware } from "../middlewares/validateSignInFormMiddleware"
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware"
import { checkUserDataMiddleware } from "../middlewares/checkUserDataMiddleware"
import { ResponseWithoutPayload, ResponseWithUserDataPayload } from "../types/interface/ResponseToClient"

const authRouter = express.Router()

function setResponseSignUp(req: Request, res: Response) {
  const { status, errorNumber, message } = res.locals.dataFromClient.error
  try {
    if (status) {
      const response: ResponseWithoutPayload = {
        status,
        errorNumber,
        error: true,
        message
      }

      return res.status(status).send(response)
    }

    const response: ResponseWithoutPayload = {
      status: 201,
      errorNumber: null,
      error: false,
      message: res.locals.dataFromClient.message
    }

    return res.status(201).send(response)
  } catch (error) {
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: 'Internal Server Error'
    }

    return res.status(response.status).send(response)
  }
}

function setResponseSignIN(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { status, errorNumber, message } = dataFromClient.error
  const { user } = dataFromClient
  const { accessToken, refreshToken } = dataFromClient.token

  try {
    if (status) {
      const response: ResponseWithoutPayload = {
        status,
        errorNumber,
        error: true,
        message
      }

      return res.status(status).send(response)
    }

    const response: ResponseWithUserDataPayload = {
      status: 200,
      errorNumber: null,
      error: false,
      message: dataFromClient.message,
      token: accessToken.value,
      user
    }

    res.cookie('refreshToken', refreshToken.value, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict', httpOnly: false, secure: true })
    return res.status(response.status).send(response)
  } catch (error) {
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: 'Internal Server Error'
    }

    return res.status(response.status).send(response)
  }
}

function setResponseGetUserByToken(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { status, errorNumber, message } = dataFromClient.error
  const { user } = dataFromClient
  const { accessToken } = dataFromClient.token

  try {
    if (status) {
      const response: ResponseWithoutPayload = {
        status,
        errorNumber,
        error: true,
        message
      }


      if (errorNumber === 7) {
        res.clearCookie('refreshToken')
      }
      return res.status(status).send(response)
    }

    const response: ResponseWithUserDataPayload = {
      status: 200,
      errorNumber: null,
      error: false,
      message: dataFromClient.message,
      token: accessToken.value,
      user
    }

    return res.status(response.status).send(response)
  } catch (error) {
    console.log(error)
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: 'Internal Server Error'
    }

    return res.status(response.status).send(response)
  }

}

function setResponseLogoutUser(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { status, errorNumber, message } = dataFromClient.error

  try {
    if (status) {
      const response: ResponseWithoutPayload = {
        status,
        errorNumber,
        error: true,
        message
      }

      if (errorNumber === 7) {
        res.clearCookie('refreshToken')
      }
      return res.status(status).send(response)
    }

    const response: ResponseWithoutPayload = {
      status: 200,
      errorNumber: null,
      error: false,
      message: dataFromClient.message
    }

    res.clearCookie('refreshToken')
    return res.status(response.status).send(response)
  } catch (error) {
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: 'Internal Server Error'
    }
    return res.status(response.status).send(response)
  }
}

authRouter.post("/auth/signup", validateSignUpFormMiddleware, createUser, setResponseSignUp)
authRouter.post("/auth/signin", validateSignInFormMiddleware, authenticateUser, setResponseSignIN)
authRouter.get("/auth/user", checkTokenMiddleware, getUserByToken, setResponseGetUserByToken)
authRouter.post("/auth/logout", checkTokenMiddleware, checkUserDataMiddleware, logoutUser, setResponseLogoutUser)

export { authRouter }

