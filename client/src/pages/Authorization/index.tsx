import './styles.scss'
import { useState } from 'react'
import { Btn } from '../../components/Btn'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'

export function Authorization(): JSX.Element {
  const [isModalActive, setIsModalActive] = useState(false)
  const [userName, setUserName] = useState<string>('')

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
        title='Create your account'
        onClose={() => setIsModalActive(false)}
        onSubmit={() => setIsModalActive(false)}
      >
        <form className='form form-auth'>
          <Input
            type='text'
            id='username'
            label={
              {
                text: "What’s your name?",
                labelInvisible: true
              }
            }
            required={true}
            placeholder='User Name'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </form>
      </Modal>
    </div>

  )
}
