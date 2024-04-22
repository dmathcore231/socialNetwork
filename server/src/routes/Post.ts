import express, { Request, Response } from "express"
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware"
import { validateCreatePostFormMiddleware } from "../middlewares/validateCreatePostFormMiddleware"
import { getPostByIdMiddleware } from "../middlewares/getPostByIdMiddleware"
import { editPostMiddleware } from "../middlewares/editPostMiddleware"
import { createPost } from "../controllers/createPost"
import { getPostById } from "../controllers/getPostById"
import { updatePostData } from "../controllers/updatePostData"
import { ResponseWithoutPayload, ResponseWithPostDataPayload } from "../types/interface/ResponseToClient"

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

      if (errorNumber === 7) {
        res.clearCookie('refreshToken')
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
      message: "Internal Server Error"
    }
    return res.status(response.status).send(response)
  }
}

function setResponseGetPostById(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { postById } = dataFromClient
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

    const response: ResponseWithPostDataPayload = {
      status: 200,
      errorNumber: null,
      error: false,
      message: dataFromClient.message,
      token: accessToken.value,
      post: postById
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

function setResponseUpdatePostData(req: Request, res: Response) {
  const { dataFromClient } = res.locals
  const { postById } = dataFromClient
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

    const response: ResponseWithPostDataPayload = {
      status: 200,
      errorNumber: null,
      error: false,
      message: dataFromClient.message,
      token: accessToken.value,
      post: postById
    }

    return res.status(response.status).send(response)
  } catch (error) {
    const response: ResponseWithoutPayload = {
      status: 500,
      errorNumber: 8,
      error: true,
      message: "Internal Server Error"
    }
    console.log(error)
    return res.status(response.status).send(response)
  }
}

postRouter.post("/post/create", checkTokenMiddleware, validateCreatePostFormMiddleware, createPost, setResponseCreatePost)
postRouter.get("/post/:id", checkTokenMiddleware, getPostByIdMiddleware, getPostById, setResponseGetPostById)
postRouter.patch("/post/:id", checkTokenMiddleware, editPostMiddleware, updatePostData, setResponseUpdatePostData)

export { postRouter }
