import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'

export const storeStateSelector = (state: RootState) => state.store

export const storeSelector = createSelector(
  storeStateSelector,
  (store) => store
)
