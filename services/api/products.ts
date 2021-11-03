import { axios } from './index'
import {
  Product,
  ProductCreationData,
  ProductUpdateData,
} from 'services/models'
import { EntityId } from '@reduxjs/toolkit'
import { objectToFormData } from 'utils/objectToFormData'
import { arrayToNumberedList } from 'utils/arrayToNumberedList'

export const createProduct = (data: ProductCreationData) => {
  const { images, options, ...rest } = data

  return axios
    .post<Product>(
      'products/',
      objectToFormData({
        ...rest,
        ...(arrayToNumberedList(images, 'image') || []),
        options: JSON.stringify(options),
      }),
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)
}

export const getProductsByStoreId = (storeId: EntityId) =>
  axios
    .get<Product[]>('products/', { params: { store_id: storeId } })
    .then((res) => res.data)

export const updateProduct = (data: ProductUpdateData) => {
  const { images, options, ...rest } = data

  return axios
    .patch<Product>(
      `products/${data.id}/`,
      objectToFormData({
        ...rest,
        ...arrayToNumberedList(images || [], 'image'),
        options: JSON.stringify(options),
      }),
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)
}

export const deleteProduct = (id: EntityId) =>
  axios.delete(`products/${id}/`).then((res) => res.data)

export const deleteProductImage = (productId: EntityId, imageId: EntityId) =>
  axios
    .delete(`products/${productId}/images/${imageId}/`)
    .then((res) => res.data)

export const deleteProductOption = (productId: EntityId, optionId: EntityId) =>
  axios
    .delete(`products/${productId}/options/${optionId}/`)
    .then((res) => res.data)
