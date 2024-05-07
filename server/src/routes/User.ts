import express, { Request, Response } from "express"
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware"
import { createUserAvatarMiddleware } from "../middlewares/createUserAvatarMiddleware"
import { createUserAvatar } from "../controllers/createUserAvatar"
import { deleteUserAvatar } from "../controllers/deleteUserAvatar"
import { ResponseWithoutPayload, ResponseWithUserDataPayload } from "../types/interface/ResponseToClient"

const userRouter = express.Router()

function setResponseCreateUserAvatar(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { status, errorNumber, message } = dataFromClient.error
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
      user: dataFromClient.user
    }

    return res.status(response.status).send(response)

  } catch (error) {
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: "Internal Server Error"
    }

    return res.status(response.status).send(response)
  }
}

function setResponseDeleteUserAvatar(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { status, errorNumber, message } = dataFromClient.error
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
      user: dataFromClient.user
    }

    return res.status(response.status).send(response)
  } catch (error) {

  }
}

userRouter.post("/user/avatar", checkTokenMiddleware, createUserAvatarMiddleware, createUserAvatar, setResponseCreateUserAvatar)
userRouter.delete("/user/avatar", checkTokenMiddleware, deleteUserAvatar, setResponseDeleteUserAvatar)

export { userRouter }
