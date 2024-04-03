import { UserDataInResponse } from "./UserDataInResponse"

export type ReportData = {
  _timestamp: number
  user: UserDataInResponse
  issue: string
}
