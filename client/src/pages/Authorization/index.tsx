import './styles.scss'
import { useState, FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSignUp } from '../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { FormSignUp, FormSignIn } from '../../types/FormState'
import { InvalidField } from '../../types/InvalidField'
import { Btn } from '../../components/Btn'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'
import { Spinner } from '../../components/Spinner'
import { ModalState } from '../../types/ModalState'

export function Authorization(): JSX.Element {
  const dispatch = useAppDispatch()

  const { ResponseState: { status, errorNumber, message, loading } } = useAppSelector((state) => state.user)

  const defaultFormSignUp: FormSignUp = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const defaultFormSignIn: FormSignIn = {
    email: '',
    password: '',
  }

  const defaultModalState: ModalState = {
    isActive: false,
    modalContent: null,
  }

  const [modalActive, setModalActive] = useState(defaultModalState)
  const [invalidField, setInvalidField] = useState<InvalidField | null>(null)
  const [formSignUp, setFormSignUp] = useState(defaultFormSignUp)
  const [formSignIn, setFormSignIn] = useState(defaultFormSignIn)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (isSubmit) {
      const formData = new FormData()
      Object.entries(formSignUp).forEach(([key, value]) => {
        formData.append(key, value)
      })
      dispatch(fetchSignUp(formData))
    }
  }, [isSubmit])

  useEffect(() => {
    if (errorNumber === 1) {
      setInvalidField({
        nameField: 'email',
        message: message,
        value: formSignUp.email
      })
    }
  }, [errorNumber])

  useEffect(() => {
    if (status === 200) {
      setModalActive({
        isActive: true,
        modalContent: 'signUp',
      })
    }
  }, [status])

  function handleToggleModal(state: ModalState) {
    setModalActive({
      isActive: state.isActive, //global modal
      modalContent: state.modalContent, //toggle Modal content
    })
  }

  function handleClickCancelModal() {
    setModalActive(defaultModalState)
    setFormSignUp(defaultFormSignUp)
    setFormSignIn(defaultFormSignIn)
    setInvalidField(null)
  }

  function handleSubmitModal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (formSignUp.password !== formSignUp.confirmPassword) {
      setInvalidField({ nameField: 'password', message: 'Passwords do not match' })
    } else if (invalidField === null) { // need fix (added else if)
      setIsSubmit(true)
    }
  }

  function renderModalContent(content: string | null) {
    if (content === 'signUp') {
      return (
        <form className="form form-sign-up"
          onSubmit={handleSubmitModal}
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
            error={invalidField?.nameField === 'email' && formSignUp.email === invalidField.value}
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
            error={invalidField?.nameField === 'password'
              && formSignUp.password !== formSignUp.confirmPassword}
            label={invalidField?.nameField === 'password'
              && formSignUp.password !== formSignUp.confirmPassword
              ? { text: invalidField.message, labelInvisible: false }
              : { text: "Password", labelInvisible: true }}
            required={true}
            placeholder='Password'
            onChange={(e) => setFormSignUp({ ...formSignUp, password: e.target.value })}
            value={formSignUp.password}
          />
          <Input
            type="password"
            id="confirmPassword"
            error={invalidField?.nameField === 'password'
              && formSignUp.password !== formSignUp.confirmPassword}
            label={invalidField?.nameField === 'password'
              && formSignUp.password !== formSignUp.confirmPassword
              ? { text: invalidField.message, labelInvisible: false }
              : { text: "Confirm password", labelInvisible: true }}
            required={true}
            placeholder='Confirm Password'
            onChange={(e) => setFormSignUp({ ...formSignUp, confirmPassword: e.target.value })}
            value={formSignUp.confirmPassword}
          />
        </form>
      )
    } else if (content === 'signIn') {
      return (
        <form className="form form-sign-in"
          onSubmit={handleSubmitModal}
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
      )
    } else if (loading) {
      return (
        <div className='loading'>
          <Spinner width='40px' height='40px' />
        </div>
      )
    } else {
      return null
    }
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
              onClick={() => handleToggleModal({
                isActive: !modalActive.isActive,
                modalContent: 'signUp'
              })}
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
              onClick={() => handleToggleModal({
                isActive: !modalActive.isActive,
                modalContent: 'signIn'
              })}
            >
              Sign In
            </Btn>
          </div>
        </div>
      </div>
      <Modal
        isActive={modalActive.isActive}
        title={modalActive.modalContent === 'signUp' ? "Sign Up" : "Sign In"}
        onClose={handleClickCancelModal}
        cancelBtn={{
          visible: true,
          onClick: handleClickCancelModal,
        }}
        submitBtn={{
          visible: true,
        }}
        idForm={modalActive.modalContent === 'signUp' ? "form-sign-up" : "form-sign-in"}
      >
        {renderModalContent(modalActive.modalContent)}
      </Modal>
    </div>
  )
}
