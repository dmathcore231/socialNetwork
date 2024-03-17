import './styles.scss'
import { useState } from 'react'
import { Btn } from '../../components/Btn'
import { Modal } from '../../components/Modal'

export function Authorization(): JSX.Element {
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <div className="authorization container">
      <div className="authorization__item">
        <h1>Logo</h1>
      </div>
      <div className="authorization__item">
        <div className='authorization__title'>
          <h1>Happening now</h1>
        </div>
        <div className='authorization__subtitle'>
          <h2>Join today</h2>
        </div>
        <div className='authorization-form'>
          <div className='authorization-form__item'>
            <Btn
              type='button'
              className='btn_primary'
              onClick={() => setIsModalActive(true)}
            >
              Create account
            </Btn>

          </div>
          <div className='authorization-form__item'>
            <div className='authorization-form__subtitle title title_size_lg'>
              Already have an account?
            </div>
          </div>
          <div className='authorization-form__item'>
            <Btn
              type='button'
              className='btn_primary btn_primary_outline'
              onClick={() => console.log('click')}
            >
              Sign In
            </Btn>
          </div>
        </div>
      </div>
      <Modal
        isActive={isModalActive}
        title='Modal title'
        onClose={() => setIsModalActive(false)}
        onSubmit={() => setIsModalActive(false)}
      >
        Modal Content
      </Modal>
    </div>

  )
}
