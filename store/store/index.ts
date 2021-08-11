import { createSlice, EntityId } from '@reduxjs/toolkit'
import { createStore, getStore, updateStore } from './actions'
import { Object } from 'ts-toolbelt'

export type StoreState = Object.Nullable<{
  id: EntityId
  name: string
  description: string
  logo: string
}>

const initialState = {
  id: null,
  name: null,
  description: null,
  logo: null,
} as StoreState

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setInfo(state, action) {
      return { ...action.payload }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createStore.fulfilled, (state, action) =>
        storeSlice.caseReducers.setInfo(state, action)
      )
      .addCase(getStore.fulfilled, (state, action) =>
        storeSlice.caseReducers.setInfo(state, action)
      )
      .addCase(updateStore.fulfilled, (state, action) =>
        storeSlice.caseReducers.setInfo(state, action)
      )
  },
})

export const { reducer, actions } = storeSlice
