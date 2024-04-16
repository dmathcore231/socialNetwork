import './styles.scss'
import { Link } from 'react-router-dom'
import { LogoProps } from '../../types/interfaces/LogoProps'
import { LogoIcon } from '../../assets/icons/LogoIcon'

export function Logo({ size }: LogoProps): JSX.Element {

  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        {size === 'md'
          ? <LogoIcon width="50px" height="50px" className='logo__icon' />
          : <LogoIcon width="40px" height="40px" className='logo__icon' />}
      </Link>
    </div>
  )
}
