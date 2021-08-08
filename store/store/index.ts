import { createSlice, EntityId } from '@reduxjs/toolkit'
import { createStore } from './actions'
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
      state = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(createStore.fulfilled, (state, action) =>
      storeSlice.caseReducers.setInfo(state, action)
    )
  },
})

export const { reducer, actions } = storeSlice
