import express, { Request, Response } from "express"
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware"
import { validateCreatePostFormMiddleware } from "../middlewares/validateCreatePostFormMiddleware"
import { createPost } from "../controllers/createPost"
import { ResponseWithoutPayload } from "../types/interface/ResponseToClient"

const postRouter = express.Router()

function setResponseCreatePost(req: Request, res: Response) {
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

      return res.status(status).send(response)
    }

    const response: ResponseWithoutPayload = {
      status: 201,
      errorNumber: null,
      error: false,
      message: dataFromClient.message
    }

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

postRouter.post("/post/create", checkTokenMiddleware, validateCreatePostFormMiddleware, createPost, setResponseCreatePost)

export { postRouter }
