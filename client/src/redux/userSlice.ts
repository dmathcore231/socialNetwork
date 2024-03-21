import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { UserState } from '../types/interfaces/User'
import { requestSignUp } from "../services/auth"
import { ResponseWithoutPayload } from "../types/interfaces/ResponseFromServer"

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

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    accessToken: null,
    token: null,
    user: null,
    ResponseState: {
      status: null,
      error: false,
      errorNumber: null,
      loading: false,
      message: null,
    }
  } as UserState,

  reducers: {},

  extraReducers: (builder) => {
    builder
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
        if (action.payload) {
          state.ResponseState.loading = false
          state.ResponseState.error = action.payload.error
          state.ResponseState.errorNumber = action.payload.errorNumber
          state.ResponseState.message = action.payload.message
        }
      })
  }
})

export const userReducer = userSlice.reducer

