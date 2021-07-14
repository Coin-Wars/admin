import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'

export const userStateSelector = (state: RootState) => state.user

export const isLoggedSelector = createSelector(userStateSelector, (state) =>
  Boolean(state.auth.access)
)

export const tokensSelector = createSelector(
  userStateSelector,
  (state) => state.auth
)