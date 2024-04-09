import './styles.scss'
import { useRef, useEffect } from 'react'
import { DropDownProps } from '../../types/interfaces/DropDownProps'


export function DropDown({ isActive, setIsActive, children }: DropDownProps): JSX.Element {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive, setIsActive])

  return (
    <div ref={dropdownRef} className={"dropdown" + (isActive ? " dropdown_active" : "")}>
      {children}
    </div>
  )
}
