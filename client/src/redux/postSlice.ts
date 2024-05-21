import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { ResponseWithoutPayload, ResponseWithPostDataPayload } from "../types/interfaces/ResponseFromServer"
import { PostState } from "../types/interfaces/Post"
import { requestCreatePost, requestGetPostById, requestEditPost, requestToggleLikePost } from "../services/post"
import { setDataInLocalStorage } from "../helpers"

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

export const fetchGetPostById = createAsyncThunk('post/fetchGetPostById', async (id: string, { rejectWithValue }) => {
  try {
    return await requestGetPostById(id)
  } catch (error) {
    const err = error as AxiosError
    const errResponse = err.response?.data as ResponseWithoutPayload
    return rejectWithValue(errResponse)
  }
})

export const fetchEditPost = createAsyncThunk<ResponseWithPostDataPayload, { id: string, body: FormData }, { rejectValue: ResponseWithPostDataPayload }>('post/fetchEditPost', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await requestEditPost(id, body)
  } catch (error) {
    const err = error as AxiosError
    const errResponse = err.response?.data as ResponseWithPostDataPayload
    return rejectWithValue(errResponse)
  }
})

export const fetchToggleLikePost = createAsyncThunk<ResponseWithPostDataPayload, { id: string }, { rejectValue: ResponseWithPostDataPayload }>('post/fetchToggleLikePost', async ({ id }, { rejectWithValue }) => {
  try {
    return await requestToggleLikePost(id)
  } catch (error) {
    const err = error as AxiosError
    const errResponse = err.response?.data as ResponseWithPostDataPayload
    return rejectWithValue(errResponse)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
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
          state.ResponseState.loading = false
        }
      })

      //GetPostById
      .addCase(fetchGetPostById.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchGetPostById.fulfilled, (state, action: PayloadAction<ResponseWithPostDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.post = action.payload.post
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchGetPostById.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
        }
      })

      //EditPost
      .addCase(fetchEditPost.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchEditPost.fulfilled, (state, action: PayloadAction<ResponseWithPostDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.post = action.payload.post
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchEditPost.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
        }
      })

      //ToggleLikePost
      .addCase(fetchToggleLikePost.pending, (state) => {
        state.ResponseState.loading = true
        state.ResponseState.error = false
      })
      .addCase(fetchToggleLikePost.fulfilled, (state, action: PayloadAction<ResponseWithPostDataPayload>) => {
        state.ResponseState.status = action.payload.status
        state.ResponseState.error = action.payload.error
        state.ResponseState.errorNumber = action.payload.errorNumber
        state.ResponseState.message = action.payload.message
        state.ResponseState.loading = false
        state.post = action.payload.post
        setDataInLocalStorage('token', action.payload.token)
      })
      .addCase(fetchToggleLikePost.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.ResponseState.status = payload.status
          state.ResponseState.error = payload.error
          state.ResponseState.errorNumber = payload.errorNumber
          state.ResponseState.message = payload.message
          state.ResponseState.loading = false
        }
      })
  }
})

export const postReducer = postSlice.reducer
export const { resetResponseState } = postSlice.actions
