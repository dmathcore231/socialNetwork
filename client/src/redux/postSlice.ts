import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { ResponseWithoutPayload } from "../types/interfaces/ResponseFromServer"
import { PostState } from "../types/interfaces/Post"
import { requestCreatePost } from "../services/post"

const initialState: PostState = {
  post: null,
  ResponseState: {
    status: null,
    error: false,
    errorNumber: null,
    loading: false,
    message: null,
  }
}

export const fetchCreatePost = createAsyncThunk('post/fetchCreatePost', async (body: FormData, { rejectWithValue }) => {
  try {
    return await requestCreatePost(body)
  } catch (error) {
    const err = error as AxiosError
    const errResponse = err.response?.data as ResponseWithoutPayload
    return rejectWithValue(errResponse)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatePost.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchCreatePost.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
      })
      .addCase(fetchCreatePost.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
        }
      })
  }
})

export const postReducer = postSlice.reducer
