import { createSlice, EntityId } from '@reduxjs/toolkit'
import { Object } from 'ts-toolbelt'
import { reenter, getCurrentUser, logout, update } from './actions'

export type UserAuthState = Object.Nullable<{
  access: string
  refresh: string
}>

export type UserInfoState = Object.Nullable<{
  id: EntityId
  email: string
  first_name: string
  last_name: string
}>

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
      .addCase(reenter.fulfilled, (state, action) =>
        userSlice.caseReducers.setAuth(state, action)
      )
      .addCase(getCurrentUser.fulfilled, (state, action) =>
        userSlice.caseReducers.setInfo(state, action)
      )
      .addCase(logout.fulfilled, (state, action) =>
        userSlice.caseReducers.reset(state, action)
      )
      .addCase(update.fulfilled, (state, action) =>
        userSlice.caseReducers.setInfo(state, action)
      )
  },
})

export const { reducer, actions } = userSlice
