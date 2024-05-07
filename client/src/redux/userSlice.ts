import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { UserState } from '../types/interfaces/User'
import { requestSignUp, requestSignIn, requestGetUserDataByToken, requestLogout } from "../services/auth"
import { requestCreateUserAvatar, requestDeleteUserAvatar } from "../services/user"
import { ResponseWithoutPayload, ResponseWithUserDataPayload } from "../types/interfaces/ResponseFromServer"
import { setDataInLocalStorage } from "../helpers"

const initialState: UserState = {
  accessToken: null,
  user: null,
  ResponseState: {
    status: null,
    error: false,
    errorNumber: null,
    loading: false,
    message: null,
  }
}

export const fetchSignUp = createAsyncThunk<ResponseWithoutPayload, FormData, { rejectValue: ResponseWithoutPayload }>('user/fetchUserRegistration',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestSignUp(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithoutPayload
      return rejectWithValue(errResponse)
    }
  })

export const fetchSignIn = createAsyncThunk<ResponseWithUserDataPayload, FormData, { rejectValue: ResponseWithoutPayload }>('user/fetchUserSignIn',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestSignIn(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithoutPayload
      return rejectWithValue(errResponse)
    }
  })

export const fetchGetUserDataByToken = createAsyncThunk<ResponseWithUserDataPayload, void, { rejectValue: ResponseWithoutPayload }>('user/fetchGetUserDataByToken',
  async (_, { rejectWithValue }) => {
    try {
      return await requestGetUserDataByToken()
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithoutPayload
      return rejectWithValue(errResponse)
    }
  })

export const fetchLogout = createAsyncThunk<ResponseWithoutPayload, void, { rejectValue: ResponseWithoutPayload }>('user/fetchLogout',
  async (_, { rejectWithValue }) => {
    try {
      return await requestLogout()
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithoutPayload
      return rejectWithValue(errResponse)
    }
  })

export const fetchCreateUserAvatar = createAsyncThunk<ResponseWithUserDataPayload, FormData, { rejectValue: ResponseWithoutPayload }>('user/fetchCreateUserAvatar',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestCreateUserAvatar(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithoutPayload
      return rejectWithValue(errResponse)
    }
  })

export const fetchDeleteUserAvatar = createAsyncThunk<ResponseWithUserDataPayload, void, { rejectValue: ResponseWithoutPayload }>('user/fetchDeleteUserAvatar',
  async (_, { rejectWithValue }) => {
    try {
      return await requestDeleteUserAvatar()
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithoutPayload
      return rejectWithValue(errResponse)
    }
  })

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },

    logout: (state) => {
      state.accessToken = null
      state.user = null
    },

    resetResponseState: (state) => {
      state.ResponseState = {
        status: null,
        error: false,
        errorNumber: null,
        loading: false,
        message: null,
      }
    }

  },

  extraReducers: (builder) => {
    builder
      //SignUp
      .addCase(fetchSignUp.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
        }
      })

      //SignIn
      .addCase(fetchSignIn.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<ResponseWithUserDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.accessToken = action.payload.token
        state.user = action.payload.user
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
          state.accessToken = null
          state.user = null
          setDataInLocalStorage('token', null)
        }
      })

      //GetUserDataByToken
      .addCase(fetchGetUserDataByToken.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchGetUserDataByToken.fulfilled, (state, action: PayloadAction<ResponseWithUserDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.user = action.payload.user
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchGetUserDataByToken.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
          state.accessToken = null
          state.user = null
          setDataInLocalStorage('token', null)
        }
      })

      //Logout
      .addCase(fetchLogout.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchLogout.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.accessToken = null
        state.user = null
        setDataInLocalStorage('token', null)
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
          state.accessToken = null
          state.user = null
          setDataInLocalStorage('token', null)
        }
      })

      //createUserAvatar
      .addCase(fetchCreateUserAvatar.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchCreateUserAvatar.fulfilled, (state, action: PayloadAction<ResponseWithUserDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.user = action.payload.user
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchCreateUserAvatar.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
          state.user = null
          setDataInLocalStorage('token', null)
        }
      })

      //DeleteUserAvatar
      .addCase(fetchDeleteUserAvatar.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })

      .addCase(fetchDeleteUserAvatar.fulfilled, (state, action: PayloadAction<ResponseWithUserDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.user = action.payload.user
        setDataInLocalStorage('token', action.payload.token)
      })

      .addCase(fetchDeleteUserAvatar.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
          state.user = null
          setDataInLocalStorage('token', null)
        }
      })
  }
})

export const userReducer = userSlice.reducer
export const { setToken, resetResponseState } = userSlice.actions

