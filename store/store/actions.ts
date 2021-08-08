import { createAsyncThunk } from '@reduxjs/toolkit'
import * as storeApi from 'services/api/store'
import { StoreCreationData } from 'services/models'

export const createStore = createAsyncThunk<
  ReturnType<typeof storeApi.create>,
  StoreCreationData
>('store/create', storeApi.create)
