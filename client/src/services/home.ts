import { AxiosError } from "axios"
import { client } from "../utils/client"
import { homeEndPoint } from "./endPoint"
import { ResponseWithAllPostsDataPayload } from "../types/interfaces/ResponseFromServer"

export const requestGetAllPosts = async (): Promise<ResponseWithAllPostsDataPayload> => {
  try {
    const { data } = await client.get(homeEndPoint)
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
