import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { UserState } from '../types/interfaces/User'
import { requestSignUp, requestSignIn, requestGetUserDataByToken } from "../services/auth"
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

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},

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
        console.log(action.payload.token)
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
          state.user = null
          setDataInLocalStorage('token', null)
        }
      })
  }
})

export const userReducer = userSlice.reducer

