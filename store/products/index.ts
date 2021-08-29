import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Product } from 'services/models'
import { createProduct, updateProduct, getByStoreId } from './actions'

const productsAdapter = createEntityAdapter<Product>()

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {
    addOne: productsAdapter.addOne,
    addMany: productsAdapter.addMany,
  },
  extraReducers(builder) {
    builder
      .addCase(createProduct.fulfilled, (state, action) =>
        productsSlice.caseReducers.addOne(state, action)
      )
      .addCase(updateProduct.fulfilled, (state, action) =>
        productsSlice.caseReducers.addOne(state, action)
      )
      .addCase(getByStoreId.fulfilled, (state, action) =>
        productsSlice.caseReducers.addMany(state, action)
      )
  },
})

export const { actions, reducer } = productsSlice
