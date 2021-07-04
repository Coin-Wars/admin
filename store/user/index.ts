import { createSlice } from '@reduxjs/toolkit'
import { verifyToken } from './actions'

const initialState = {
  auth: {
    isLogged: false,
    accessToken: null,
    refreshToken: null,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuth(state) {
      state.auth = initialState.auth
    },
  },
  extraReducers(builder) {
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.auth.isLogged = true
    })
  },
})

export const { reducer, actions } = userSlice
