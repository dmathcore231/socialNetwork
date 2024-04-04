import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./userSlice"
import { postReducer } from "./postSlice"
import { homeReducer } from "./homeSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    home: homeReducer,
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
