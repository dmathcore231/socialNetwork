import { ChangeEvent } from 'react'

export interface InputProps {
  type: string
  id: string
  label: {
    text: string | null
    labelInvisible: boolean
  }
  required: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  className?: string
  name?: string
}
