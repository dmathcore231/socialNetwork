import { AxiosError } from "axios"
import { client } from "../utils/client"
import { authSignUpEndPoint, authSignInEndPoint } from "./endPoint"
import { ResponseWithoutPayload, ResponseWithUserDataPayload } from "../types/interfaces/ResponseFromServer"

export const requestSignUp = async (body: FormData): Promise<ResponseWithoutPayload> => {
  try {
    const { data } = await client.post(authSignUpEndPoint, body, {
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

export const requestSignIn = async (body: FormData): Promise<ResponseWithUserDataPayload> => {
  try {
    const { data } = await client.post(authSignInEndPoint, body, {
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
