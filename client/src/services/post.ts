import { AxiosError } from "axios"
import { client } from "../utils/client"
import { postCreateEndPoint, postEndPoint } from "./endPoint"
import { ResponseWithoutPayload, ResponseWithPostDataPayload, ResponseWithUserDataPayload } from "../types/interfaces/ResponseFromServer"

export const requestCreatePost = async (body: FormData): Promise<ResponseWithoutPayload> => {
  try {
    const { data } = await client.post(postCreateEndPoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestGetPostById = async (id: string): Promise<ResponseWithPostDataPayload> => {
  try {
    const { data } = await client.get(`${postEndPoint}/${id}`)
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestEditPost = async (id: string, body: FormData): Promise<ResponseWithPostDataPayload> => {
  try {
    const { data } = await client.patch(`${postEndPoint}/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestToggleLikePost = async (id: string): Promise<ResponseWithPostDataPayload> => {
  try {
    const { data } = await client.patch(`${postEndPoint}/${id}/like`)
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestDeletePost = async (id: string): Promise<ResponseWithUserDataPayload> => {
  try {
    const { data } = await client.delete(`${postEndPoint}/${id}`)
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestCreateComment = async (id: string, body: FormData): Promise<ResponseWithPostDataPayload> => {
  try {
    const { data } = await client.patch(`${postEndPoint}/${id}/comments`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
