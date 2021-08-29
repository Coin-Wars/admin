import { createAsyncThunk, EntityId } from '@reduxjs/toolkit'
import * as storeApi from 'services/api/store'
import { Store, StoreCreationData, StoreUpdateData } from 'services/models'
import { infoSelector } from 'store/user/selectors'
import { storeSelector } from 'store/store/selectors'
import { RootState } from 'store'
import Router from 'next/router'

export const createStore = createAsyncThunk(
  'store/create',
  async (data: StoreCreationData) => {
    const store = await storeApi.create(data)
    Router.replace('/edit-store')
    return store
  }
)

export const getStore = createAsyncThunk<Store, void, { state: RootState }>(
  'store/getStoreBySellerId',
  (_, { getState }) => {
    const { id } = infoSelector(getState())
    return storeApi.getBySellerId(id as EntityId).then((stores) => stores[0])
  }
)

export const updateStore = createAsyncThunk<
  ReturnType<typeof storeApi.update>,
  StoreUpdateData,
  { state: RootState }
>('store/update', (data, { getState }) => {
  const { id } = storeSelector(getState())
  return storeApi.update({ id: id as EntityId, ...data })
})
