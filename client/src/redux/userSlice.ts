import { createSlice } from "@reduxjs/toolkit"
import { UserState } from '../types/interfaces/User'

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    accessToken: null,
    user: null,
    responseStatus: {
      status: null,
      error: false,
      loading: false,
      message: null,
    }
  } as UserState,

  reducers: {},
})

export const userReducer = userSlice.reducer

