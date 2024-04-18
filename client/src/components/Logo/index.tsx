import './styles.scss'
import { Link } from 'react-router-dom'
import { LogoProps } from '../../types/interfaces/LogoProps'
import { LogoIcon } from '../../assets/icons/LogoIcon'

export function Logo({ size }: LogoProps): JSX.Element {

  function renderLogo(): JSX.Element {
    if (size === 'sm') {
      return (
        <LogoIcon width="40px" height="40px" className='logo__icon' />
      )
    } else if (size === 'md') {
      return (
        <LogoIcon width="50px" height="50px" className='logo__icon' />
      )
    } else {
      return (
        <LogoIcon width="80px" height="80px" className='logo__icon' />
      )
    }
  }

  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        {renderLogo()}
      </Link>
    </div>
  )
}
