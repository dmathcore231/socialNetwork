import { ChangeEvent } from 'react'
import { InputLabelState } from '../InputLabelState'

export interface InputProps {
  type: string
  id: string
  label: InputLabelState
  required: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  className?: string
  name?: string
  error?: boolean
  multiple?: boolean
  btnInInput?: JSX.Element
}
