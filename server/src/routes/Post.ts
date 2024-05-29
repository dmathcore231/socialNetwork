import express, { Request, Response } from "express"
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware"
import { validateCreatePostFormMiddleware } from "../middlewares/validateCreatePostFormMiddleware"
import { getPostByIdMiddleware } from "../middlewares/getPostByIdMiddleware"
import { editPostMiddleware } from "../middlewares/editPostMiddleware"
import { setLikePostMiddleware } from "../middlewares/setLikePostMiddleware"
import { deletePostMiddleware } from "../middlewares/deletePostMiddleware"
import { createCommentPostMiddleware } from "../middlewares/createCommentPostMiddleware"
import { createPost } from "../controllers/createPost"
import { getPostById } from "../controllers/getPostById"
import { updatePostData } from "../controllers/updatePostData"
import { toggleLikePost } from "../controllers/toggleLikePost"
import { deletePost } from "../controllers/deletePost"
import { createComment } from "../controllers/createComment"
import { ResponseWithoutPayload, ResponseWithPostDataPayload, ResponseWithUserDataPayload } from "../types/interface/ResponseToClient"

const postRouter = express.Router()

function setResponseCreatePost(req: Request, res: Response): Response {
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

function setResponseGetPostById(req: Request, res: Response): Response {
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

function setResponseUpdatePostData(req: Request, res: Response): Response {
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

function setResponseToggleLikePost(req: Request, res: Response): Response {
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

function setResponseDeletePost(req: Request, res: Response): Response {
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
      user: dataFromClient.user,
      token: accessToken.value
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

function setResponseCreateComment(req: Request, res: Response): Response {
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
      user: dataFromClient.user,
      token: accessToken.value
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

postRouter.post("/post/create", checkTokenMiddleware, validateCreatePostFormMiddleware, createPost, setResponseCreatePost)
postRouter.get("/post/:id", checkTokenMiddleware, getPostByIdMiddleware, getPostById, setResponseGetPostById)
postRouter.patch("/post/:id", checkTokenMiddleware, editPostMiddleware, updatePostData, setResponseUpdatePostData)
postRouter.patch("/post/:id/like", checkTokenMiddleware, setLikePostMiddleware, toggleLikePost, setResponseToggleLikePost)
postRouter.delete("/post/:id", checkTokenMiddleware, deletePostMiddleware, deletePost, setResponseDeletePost)
postRouter.patch("/post/:id/comments", checkTokenMiddleware, createCommentPostMiddleware, createComment, setResponseCreateComment)

export { postRouter }
