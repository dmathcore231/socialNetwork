import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./userSlice"
import { postReducer } from "./postSlice"
import { homeReducer } from "./homeSlice"
import { userSettingsReducer } from "./userSettings"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    home: homeReducer,
    userSettings: userSettingsReducer,
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
