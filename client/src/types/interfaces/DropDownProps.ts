import { ReactNode } from 'react'

export interface DropDownProps {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
  defaultPosition?: boolean
}
