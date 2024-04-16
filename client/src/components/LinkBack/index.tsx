import './styles.scss'
import { useNavigate, NavLink } from 'react-router-dom'
import { LinkBackProps } from '../../types/interfaces/LinkBackProps'
import { defaultSizeIcon } from '../../helpers'
import { ArrowLeft } from '../../assets/icons/ArrowLeft'

export function LinkBack({ BackToHome }: LinkBackProps): JSX.Element {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  function goHome() {
    navigate('/')
  }

  return (
    <NavLink
      to="#"
      className="link-back"
      onClick={BackToHome ? goHome : goBack}
    >
      <ArrowLeft width={defaultSizeIcon} height={defaultSizeIcon} />
    </NavLink>
  )
}
