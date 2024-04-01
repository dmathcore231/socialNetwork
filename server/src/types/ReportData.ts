import { User } from "./interface/User"

export type ReportData = {
  _timestamp: number
  user: Partial<User>
  issue: string
}
