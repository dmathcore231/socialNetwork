import './styles.scss'
import { BtnProps } from '../../types/interfaces/BtnProps'

export function Btn({ type, className, children, onClick }: BtnProps): JSX.Element {
  return (
    <button
      type={type}
      className={"btn" + (className ? " " + className : "")}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
