import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSettingsState } from "../types/interfaces/User"
import { UserAvatarSettings } from "../types/UserAvatarSettings"

const initialState: UserSettingsState = {
  userAvatarData: {
    defaultUserAvatar: null,
    uploadedUserAvatar: null,
    userAvatarDeleted: false
  }
}

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,

  reducers: {
    setUserAvatarData: (state, action: PayloadAction<UserAvatarSettings>) => {
      state.userAvatarData = action.payload
    }
  },

})

export const { setUserAvatarData } = userSettingsSlice.actions
export const userSettingsReducer = userSettingsSlice.reducer
