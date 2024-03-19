import { ReactNode, MouseEventHandler } from "react"

export interface BtnProps {
  type: "button" | "submit"
  className: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  formId?: string
}
