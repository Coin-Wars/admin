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

  console.log(
    objectToFormData({
      ...rest,
      ...arrayToNumberedList(images, 'image'),
      options: JSON.stringify(options),
    })
  )

  return axios
    .post<Product>(
      'products/',
      objectToFormData({
        ...rest,
        ...arrayToNumberedList(images, 'image'),
        options: options,
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

export const updateProduct = (data: ProductUpdateData) =>
  axios
    .patch<Product>(`products/${data.id}`, objectToFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
