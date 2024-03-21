import { AxiosError } from "axios"
import { client } from "../utils/client"
import { authEndPoint } from "../utils/endPoint"
import { ResponseWithoutPayload } from "../types/interfaces/ResponseFromServer"

export const requestSignUp = async (body: FormData): Promise<ResponseWithoutPayload> => {
  try {
    const { data } = await client.post(authEndPoint, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
