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

export const infoSelector = createSelector(
  userStateSelector,
  (state) => state.info
)

export const nicknameSelector = createSelector(infoSelector, (info) => {
  if (info.first_name && info.last_name) {
    return `${info.first_name} ${info.last_name}`
  } else if (info.first_name) {
    return info.first_name
  }

  return info.email
})
