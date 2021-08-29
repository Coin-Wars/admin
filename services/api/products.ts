import { axios } from './index'
import {
  Product,
  ProductCreationData,
  ProductUpdateData,
} from 'services/models'
import { EntityId } from '@reduxjs/toolkit'
import { objectToFormData } from 'utils/objectToFormData'

export const createProduct = (data: ProductCreationData) =>
  axios
    .post<Product>('products/', objectToFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)

export const getProductsByStoreId = (storeId: EntityId) =>
  axios
    .get<Product[]>('products/', { params: { store_id: storeId } })
    .then((res) => res.data)

export const updateProduct = (data: ProductUpdateData) =>
  axios
    .patch<Product>(`products/${data.id}`, objectToFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
