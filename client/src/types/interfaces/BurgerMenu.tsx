import { Dispatch, SetStateAction } from 'react'

export interface BurgerMenuProps {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  btnBurger: boolean
  shadowUnderMenu: boolean
}
