import express, { Request, Response } from "express"
import { createUser } from "../controllers/createUser"
import { validFormSignUp } from "../middlewares/validFormSignUp"
import { ResponseWithoutPayload } from "../types/interface/ResponseToClient"

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
    message
  }
  return res.status(201).send(response)
}

authRouter.post("/auth", validFormSignUp, createUser, setResponseSignUp)

export { authRouter }

