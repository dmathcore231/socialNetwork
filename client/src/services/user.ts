import { AxiosError } from "axios"
import { client } from "../utils/client"
import { userAvatarEndPoint } from "./endPoint"
import { ResponseWithUserDataPayload } from "../types/interfaces/ResponseFromServer"

export const requestCreateUserAvatar = async (body: FormData): Promise<ResponseWithUserDataPayload> => {
  try {
    const { data } = await client.post(userAvatarEndPoint, body, {
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
