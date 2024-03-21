import './styles.scss'
import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Btn } from '../../components/Btn'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'
import { FormSignUp } from '../../types/FormSignUp'
import { fetchSignUp } from '../../redux/userSlice'
import { useAppDispatch } from '../../hooks'

export function Authorization(): JSX.Element {
  const dispatch = useAppDispatch()

  const [modalSignUpIsActive, setModalSignUpIsActive] = useState(false)
  const [modalSignInIsActive, setModalSignInIsActive] = useState(false)
  const [passwordInvalid, setPasswordInvalid] = useState(false)

  const defaultFormSignUp: FormSignUp = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [formSignUp, setFormSignUp] = useState(defaultFormSignUp)
  const [formSignIn, setFormSignIn] = useState({
    email: '',
    password: '',
  })

  function handleSubmitFormSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (formSignUp.password === formSignUp.confirmPassword) {
      setPasswordInvalid(false)
      const formData = new FormData()
      formData.append('firstName', formSignUp.firstName)
      formData.append('lastName', formSignUp.lastName)
      formData.append('email', formSignUp.email)
      formData.append('password', formSignUp.password)
      setModalSignUpIsActive(false)

      dispatch(fetchSignUp(formData))
      setFormSignUp(defaultFormSignUp)
      setModalSignInIsActive(true)
    } else {
      setFormSignUp({ ...formSignUp, password: '', confirmPassword: '' })
      setPasswordInvalid(true)
    }
  }

  function handleClickCancelModalSignUp() {
    setModalSignUpIsActive(false)
    setFormSignUp(defaultFormSignUp)
  }

  function handleSubmitFormSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', formSignIn.email)
    formData.append('password', formSignIn.password)

    console.log(formSignIn)
    setModalSignInIsActive(false)
    setFormSignIn({ email: '', password: '' })
  }

  function handleClickCancelModalSignIn() {
    setModalSignInIsActive(false)
    setFormSignIn({ email: '', password: '' })
  }

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
              onClick={() => setModalSignUpIsActive(true)}
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
              onClick={() => setModalSignInIsActive(true)}
            >
              Sign In
            </Btn>
          </div>
        </div>
      </div>
      <Modal
        isActive={modalSignUpIsActive}
        title='Create your account'
        onClose={handleClickCancelModalSignUp}
        cancelBtn={{
          visible: true,
          onClick: handleClickCancelModalSignUp,
        }}
        submitBtn={{
          visible: true,
        }}
        idForm="form-sign-up"
      >
        <form className="form form-sign-up"
          onSubmit={handleSubmitFormSignUp}
          id="form-sign-up"
        >
          <Input
            type='text'
            id='firstName'
            label={
              {
                text: "What’s your first name?",
                labelInvisible: true
              }
            }
            required={true}
            placeholder="First Name"
            onChange={(e) => setFormSignUp({ ...formSignUp, firstName: e.target.value })}
            value={formSignUp.firstName}
          />
          <Input
            type='text'
            id='lastName'
            label={
              {
                text: "What’s your last name?",
                labelInvisible: true
              }
            }
            required={true}
            placeholder="Last Name"
            onChange={(e) => setFormSignUp({ ...formSignUp, lastName: e.target.value })}
            value={formSignUp.lastName}
          />

          <Input
            type="email"
            id="email"
            label={
              {
                text: "What’s your email?",
                labelInvisible: true
              }
            }
            required={true}
            placeholder="Email"
            onChange={(e) => setFormSignUp({ ...formSignUp, email: e.target.value })}
            value={formSignUp.email}
          />
          <Input
            type="password"
            id="password"
            className={passwordInvalid ? "input_error" : ""}
            label={
              {
                text: "Create a password",
                labelInvisible: true
              }
            }
            required={true}
            placeholder='Password'
            onChange={(e) => setFormSignUp({ ...formSignUp, password: e.target.value })}
            value={formSignUp.password}
          />
          <Input
            type="password"
            id="confirmPassword"
            className={passwordInvalid ? "input_error" : ""}
            label={
              {
                text: "Confirm your password",
                labelInvisible: true
              }
            }
            required={true}
            placeholder='Confirm Password'
            onChange={(e) => setFormSignUp({ ...formSignUp, confirmPassword: e.target.value })}
            value={formSignUp.confirmPassword}
          />
        </form>
      </Modal>
      <Modal
        isActive={modalSignInIsActive}
        title="Sign In"
        onClose={handleClickCancelModalSignIn}
        idForm="form-sign-in"
        cancelBtn={{
          visible: true,
          onClick: handleClickCancelModalSignIn,

        }}
        submitBtn={{
          visible: true,
        }}
      >
        <form className="form form-sign-in"
          onSubmit={handleSubmitFormSignIn}
          id="form-sign-in"
        >
          <Input
            type="email"
            id="email"
            label={
              {
                text: "Email",
                labelInvisible: true
              }
            }
            required={true}
            placeholder="Email"
            onChange={(e) => setFormSignIn({ ...formSignIn, email: e.target.value })}
            value={formSignIn.email}
          />
          <Input
            type="password"
            id="password"
            className={passwordInvalid ? "input_error" : ""}
            label={
              {
                text: "Password",
                labelInvisible: true
              }
            }
            required={true}
            placeholder='Password'
            onChange={(e) => setFormSignIn({ ...formSignIn, password: e.target.value })}
            value={formSignIn.password}
          />
          <Link to="#" className='form__link'>Forgot password?</Link>
        </form>
      </Modal>
    </div>
  )
}
