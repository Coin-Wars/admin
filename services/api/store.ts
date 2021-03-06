import { StoreCreationData, Store, StoreUpdateData } from 'services/models'
import { axios } from './index'
import { EntityId } from '@reduxjs/toolkit'
import { objectToFormData } from 'utils/objectToFormData'

export const create = (data: StoreCreationData) =>
  axios
    .post('stores/', objectToFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)

export const getBySellerId = (sellerId: EntityId) =>
  axios
    .get<Store[]>('stores/', { params: { seller_id: sellerId } })
    .then((res) => res.data)

export const update = (data: StoreUpdateData) =>
  axios
    .patch<Store>(`stores/${data.id}/`, objectToFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)

export const getById = (storeId: EntityId) =>
  axios.get<Store>(`stores/${storeId}/`).then((res) => res.data)
