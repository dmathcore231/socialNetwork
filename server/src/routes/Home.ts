import express, { Request, Response } from "express"
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware"
import { getAllPosts } from "../controllers/getAllPosts"
import {
  ResponseWithoutPayload,
  ResponseWithAllPostsDataPayload
} from "../types/interface/ResponseToClient"

const homeRouter = express.Router()

export function setResponseHome(req: Request, res: Response) {
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

      return res.status(status).send(response)
    }

    const response: ResponseWithAllPostsDataPayload = {
      status: 200,
      errorNumber: null,
      error: false,
      message: dataFromClient.message,
      token: accessToken.value,
      posts: dataFromClient.allPosts
    }

    return res.status(response.status).send(response)
  } catch (error) {
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: 'Internal Server Error'
    }
    console.log(error)
    return res.status(response.status).send(response)
  }
}


homeRouter.get("/home", checkTokenMiddleware, getAllPosts, setResponseHome)


export { homeRouter }
