import { ReactNode, MouseEventHandler } from "react"

export interface ModalProps {
  isActive: boolean
  title: string
  children: ReactNode
  onClose: MouseEventHandler<HTMLButtonElement>
  onSubmit: MouseEventHandler<HTMLButtonElement>
  modalClass?: string
  titleBtnSubmit?: string
  titleBtnCancel?: string
}
