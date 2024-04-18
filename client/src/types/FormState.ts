export type FormSignUp = {
  [key: string]: string;
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type FormSignIn = {
  email: string
  password: string
}

export type FormCreatePost = {
  title: string
  text: string
  document: string | null | FileList
  postScope: 'global' | 'personal'
}

export type FormState = FormSignUp | FormSignIn
