import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Product } from 'services/models'

const productsAdapter = createEntityAdapter<Product>()

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {},
})

export const { actions, reducer } = productsSlice
