import { UserData } from "../types/UserData"

export function setDataInLocalStorage(key: string, data: string | UserData | null): void {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.removeItem(key)
  }
}

export function getDataFromLocalStorage(key: string): string | null {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export const SIZE_ICON_MD = "24px"
export const SIZE_ICON_SM = "20px"
export const MAX_FILES_IN_POST = 5
