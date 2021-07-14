import { createSlice } from '@reduxjs/toolkit'
import { reenter, getCurrentUser, logout } from './actions'
import { ID } from 'services/models'

export interface UserAuthState {
  access: string | null
  refresh: string | null
}

export interface UserInfoState {
  id: ID | null
  email: string | null
  first_name: string | null
  last_name: string | null
  telegram_user: number | null
}

const initialState = {
  auth: {
    access: null,
    refresh: null,
  } as UserAuthState,
  info: {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    telegram_user: null,
  } as UserInfoState,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuth(state) {
      state.auth = initialState.auth
    },
    setAuth(state, action) {
      state.auth = action.payload
    },
    setInfo(state, action) {
      state.info = action.payload
    },
    reset(state, action) {
      return { ...initialState }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(reenter.fulfilled, userSlice.caseReducers.setAuth)
      .addCase(getCurrentUser.fulfilled, userSlice.caseReducers.setInfo)
      .addCase(logout.fulfilled, userSlice.caseReducers.reset)
  },
})

export const { reducer, actions } = userSlice
