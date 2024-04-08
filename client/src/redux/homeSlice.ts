import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestGetAllPosts } from "../services/home"
import { ResponseWithAllPostsDataPayload } from "../types/interfaces/ResponseFromServer"
import { HomeState } from "../types/interfaces/Home"
import { setDataInLocalStorage } from "../helpers"

const initialState: HomeState = {
  token: null,
  posts: [],
  ResponseState: {
    status: null,
    error: false,
    errorNumber: null,
    loading: false,
    message: null,
  }
}

export const fetchGetAllPosts = createAsyncThunk<ResponseWithAllPostsDataPayload, void, { rejectValue: ResponseWithAllPostsDataPayload }>('home/fetchGetAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await requestGetAllPosts()
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseWithAllPostsDataPayload
      return rejectWithValue(errResponse)
    }
  })

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllPosts.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchGetAllPosts.fulfilled, (state, action: PayloadAction<ResponseWithAllPostsDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.loading = false
        state.ResponseState.message = action.payload.message
        state.posts = action.payload.posts
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchGetAllPosts.rejected, (state, action) => {
        const payload = action.payload as ResponseWithAllPostsDataPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
        }
      })
  }
})


export const homeReducer = homeSlice.reducer
