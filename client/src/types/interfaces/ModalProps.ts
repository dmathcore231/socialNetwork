import { ReactNode, MouseEventHandler } from "react"

export interface ModalProps {
  isActive: boolean
  title: string
  children: ReactNode
  onClose: MouseEventHandler<HTMLButtonElement>
  cancelBtn: {
    visible: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    title?: string | null
  }
  submitBtn: {
    visible: boolean
    title?: string | null
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
  className?: string
  idForm?: string
}
