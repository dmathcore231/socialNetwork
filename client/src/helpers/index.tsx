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
