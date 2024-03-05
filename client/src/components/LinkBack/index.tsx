import './styles.scss'
import { useNavigate, NavLink } from 'react-router-dom'
import { ArrowLeft } from '../../assets/icons/ArrowLeft'

export function LinkBack(): JSX.Element {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }
  return (
    <NavLink
      to="#"
      className="link-back"
      onClick={goBack}
    >
      <ArrowLeft width='24px' height='24px' />
    </NavLink>
  )
}
