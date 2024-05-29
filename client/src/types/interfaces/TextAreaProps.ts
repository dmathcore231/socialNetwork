import { ChangeEvent } from 'react'

export interface TextAreaProps {
  name: string
  maxLength: number
  minLength: number
  required: boolean
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  id?: string
  placeholder?: string
  className?: string
  value?: string
  col?: number
  row?: number
  spellCheck?: boolean
  btnInTextArea?: JSX.Element
}
