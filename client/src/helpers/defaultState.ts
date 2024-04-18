import { FormSignUp, FormSignIn, FormCreatePost } from "../types/FormState"
import { ModalState } from "../types/ModalState"

export const defaultFormSignUp: FormSignUp = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const defaultFormSignIn: FormSignIn = {
  email: '',
  password: '',
}

export const defaultModalState: ModalState = {
  isActive: false,
  modalContent: null,
}

export const defaultFormCreatePost: FormCreatePost = {
  title: '',
  text: '',
  document: null,
  postScope: 'global',
}
