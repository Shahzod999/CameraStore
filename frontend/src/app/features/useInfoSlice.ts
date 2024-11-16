import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CounterState {
  userInfo: string
}

const initialState: CounterState = {
  userInfo: localStorage.getItem("userInfo") || "",
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem("userInfo", action.payload)
    },
    logOutState: (state) => {
      state.userInfo = ""
      localStorage.removeItem("userInfo")
    }
  },
})

export const { addUserInfo, logOutState } = userInfoSlice.actions
export const selecteduserInfo = (state: RootState) => state.userInfo.userInfo
export default userInfoSlice.reducer