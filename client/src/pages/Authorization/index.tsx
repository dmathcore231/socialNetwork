import './styles.scss'
import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { fetchSignUp, fetchSignIn } from '../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { FormSignUp, FormSignIn } from '../../types/FormState'
import { InvalidField } from '../../types/InvalidField'
import { ModalState } from '../../types/ModalState'
import { defaultFormSignUp, defaultFormSignIn, defaultModalState } from '../../helpers/defaultState'
import { Btn } from '../../components/Btn'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'
import { Spinner } from '../../components/Spinner'
import { Logo } from '../../components/Logo'


export function Authorization(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const breakPointMd = useMediaQuery({ query: '(max-width: 48rem)' })

  const { ResponseState: { status, errorNumber, message, loading } } = useAppSelector((state) => state.user)

  const [modalActive, setModalActive] = useState(defaultModalState)
  const [invalidField, setInvalidField] = useState<InvalidField[]>([])
  const [formSignUp, setFormSignUp] = useState(defaultFormSignUp)
  const [formSignIn, setFormSignIn] = useState(defaultFormSignIn)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (modalActive.modalContent === 'signUp' && isSubmit) {
      const formData = new FormData()
      Object.entries(formSignUp).forEach(([key, value]) => {
        formData.append(key, value)
      })
      dispatch(fetchSignUp(formData))
    } else if (modalActive.modalContent === 'signIn' && isSubmit) {
      const formData = new FormData()
      Object.entries(formSignIn).forEach(([key, value]) => {
        formData.append(key, value)
      })
      dispatch(fetchSignIn(formData))
    }
    if (modalActive.modalContent === 'signUp' && status === 201) {
      setModalActive({
        isActive: true,
        modalContent: 'signIn',
      })
      setInvalidField([])
    } else if (modalActive.modalContent === 'signIn' && status === 200 && modalActive.isActive) {
      setModalActive({
        isActive: false,
        modalContent: null,
      })
      navigate('/', { replace: true })
    }

    setIsSubmit(false)
  }, [isSubmit, status])

  useEffect(() => {
    if (errorNumber === 1) {
      setInvalidField((prev => [...prev, {
        name: 'email',
        message: message,
        value: formSignUp.email
      }]))
    } else if (errorNumber === 4) {
      setInvalidField((prev => [...prev, {
        name: 'email',
        message: message,
        value: formSignIn.email
      }]))
    } else if (errorNumber === 5) {
      setInvalidField((prev => [...prev, {
        name: 'passwordInvalid',
        message: message,
        value: formSignIn.password
      }]))
    }
  }, [errorNumber, isSubmit])

  function handleToggleModal(state: ModalState) {
    setModalActive({
      isActive: state.isActive,
      modalContent: state.modalContent,
    })
  }

  function handleClickCancelModal() {
    setModalActive(defaultModalState)
    setFormSignUp(defaultFormSignUp)
    setFormSignIn(defaultFormSignIn)
    setInvalidField([])
  }

  function handleSubmitModal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let newInvalidFields = [...invalidField]
    if (formSignUp.password !== formSignUp.confirmPassword) {
      const newItem: InvalidField = {
        name: 'password',
        message: 'Passwords do not match',
        value: formSignUp.password
      }

      const filter = invalidField.some(item => item.name === newItem.name)
      if (!filter) {
        newInvalidFields.push(newItem)
      }

    } else {
      newInvalidFields = newInvalidFields.filter((item) => item.name !== 'password')
    }

    const emailSignUp = newInvalidFields.some(item => item.name === 'email'
      && item.value !== formSignUp.email)
    const emailSignIn = newInvalidFields.some(item => item.name === 'email'
      && item.value !== formSignIn.email)

    if (emailSignUp || emailSignIn) {
      newInvalidFields = newInvalidFields.filter((item) => item.name !== 'email')
    }

    if (newInvalidFields.some((item) => item.name === 'passwordInvalid' && item.value !== formSignIn.password)) {
      newInvalidFields = newInvalidFields.filter((item) => item.name !== 'passwordInvalid')
    }

    if (newInvalidFields.length === 0) {
      setIsSubmit(true)
    }

    setInvalidField(newInvalidFields)
  }

  function renderLabel<InputLabelState>(nameField: string, form: FormSignUp | FormSignIn | null = null, defaultLabel: InputLabelState) {
    const checkInvalidField = invalidField.find(item => item.name === nameField)
    if (checkInvalidField && !form) {
      return (
        {
          text: checkInvalidField.message,
          labelInvisible: false
        }
      )
    } else if (checkInvalidField && form && checkInvalidField.value === form.email) {
      return (
        {
          text: checkInvalidField.message,
          labelInvisible: false
        }
      )
    }
    else {
      return defaultLabel
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
            label={renderLabel('email', formSignUp,
              { text: "Enter your email", labelInvisible: true })}
            required={true}
            placeholder="Email"
            onChange={(e) => setFormSignUp({ ...formSignUp, email: e.target.value })}
            value={formSignUp.email}
            error={invalidField.find(item => item.name === 'email' && item.value === formSignUp.email) ? true : false}
          />
          <Input
            type="password"
            id="password"
            label={renderLabel('password', null, { text: "Enter your password", labelInvisible: true })}
            required={true}
            placeholder='Password'
            onChange={(e) => setFormSignUp({ ...formSignUp, password: e.target.value })}
            value={formSignUp.password}
            error={invalidField.find(item => item.name === 'password') ? true : false}
          />
          <Input
            type="password"
            id="confirmPassword"
            label={renderLabel('password', null, { text: "Confirm Password", labelInvisible: true })}
            required={true}
            placeholder='Confirm Password'
            onChange={(e) => setFormSignUp({ ...formSignUp, confirmPassword: e.target.value })}
            value={formSignUp.confirmPassword}
            error={invalidField.find(item => item.name === 'password') ? true : false}
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
            label={renderLabel('email', formSignIn, { text: "Enter your email", labelInvisible: true })}
            required={true}
            placeholder="Email"
            onChange={(e) => setFormSignIn({ ...formSignIn, email: e.target.value })}
            value={formSignIn.email}
            error={invalidField.find(item => item.name === 'email' && item.value === formSignIn.email) ? true : false}
          />
          <Input
            type="password"
            id="password"
            label={renderLabel('passwordInvalid', null, { text: "Password", labelInvisible: true })}
            required={true}
            placeholder='Password'
            onChange={(e) => setFormSignIn({ ...formSignIn, password: e.target.value })}
            value={formSignIn.password}
            error={invalidField.find(item => item.name === 'passwordInvalid') ? true : false}
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
      <div className="authorization__item authorization__item_ai_center ">
        {breakPointMd
          ? (
            <Logo size='md' />
          )
          : (
            <Logo size='lg' />
          )}
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
              className='btn_primary btn_outline'
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
