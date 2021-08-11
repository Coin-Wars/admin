import { createAsyncThunk, EntityId } from '@reduxjs/toolkit'
import * as storeApi from 'services/api/store'
import { Store, StoreUpdateData } from 'services/models'
import { infoSelector } from 'store/user/selectors'
import { storeSelector } from 'store/store/selectors'
import { RootState } from 'store'

export const createStore = createAsyncThunk('store/create', storeApi.create)

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
  return storeApi.update(data, id as EntityId)
})
