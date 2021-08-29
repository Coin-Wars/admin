import { createAsyncThunk } from '@reduxjs/toolkit'
import * as productsApi from 'services/api/products'

export const createProduct = createAsyncThunk(
  'products/create',
  productsApi.createProduct
)

export const updateProduct = createAsyncThunk(
  'products/update',
  productsApi.updateProduct
)

export const getByStoreId = createAsyncThunk(
  'products/getByStoreId',
  productsApi.getProductsByStoreId
)
