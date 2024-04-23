import './styles.scss'
import { useNavigate, NavLink } from 'react-router-dom'
import { LinkBackProps } from '../../types/interfaces/LinkBackProps'
import { SIZE_ICON_MD } from '../../helpers'
import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon'

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
      <ArrowLeftIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
    </NavLink>
  )
}
