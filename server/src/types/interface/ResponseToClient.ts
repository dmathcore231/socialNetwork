
export interface ResponseWithoutPayload {
  status: number
  error: boolean
  errorNumber: number | null
  message: string
}
