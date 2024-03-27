import express, { Request, Response } from "express"
import { createUser } from "../controllers/createUser"
import { authenticateUser } from "../controllers/authenticateUser"
import { validFormSignUp } from "../middlewares/validFormSignUp"
import { validFormSignIn } from "../middlewares/validFormSignIn"
import { ResponseWithoutPayload, ResponseWithUserDataPayload } from "../types/interface/ResponseToClient"

const authRouter = express.Router()

function setResponseSignUp(req: Request, res: Response) {
  const { status, errorNumber, message } = res.locals.dataFromClient.error
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
}

function setResponseSignIN(req: Request, res: Response) {
  const { status, errorNumber, message } = res.locals.dataFromClient.error
  const { token, user } = res.locals.dataFromClient

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
      message: res.locals.dataFromClient.message,
      token: token.accessToken,
      user
    }

    res.cookie('refreshToken', token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict', httpOnly: false, secure: true })
    return res.status(response.status).send(response)
  } catch (error) {

  }
}

authRouter.post("/auth/signup", validFormSignUp, createUser, setResponseSignUp)
authRouter.post("/auth/signin", validFormSignIn, authenticateUser, setResponseSignIN)

export { authRouter }

