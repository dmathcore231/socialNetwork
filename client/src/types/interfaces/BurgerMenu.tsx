import { ReactNode, Dispatch } from 'react'

export interface BurgerMenuProps {
  isActive: boolean
  setIsActive: Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
}
