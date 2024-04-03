import { AxiosError } from "axios"
import { client } from "../utils/client"
import { postCreateEndPoint } from "./endPoint"
import { ResponseWithoutPayload } from "../types/interfaces/ResponseFromServer"

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
