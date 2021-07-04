import { createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from 'services/api/auth'
import { Tokens } from 'services/models'

export const verifyToken = createAsyncThunk<
  ReturnType<typeof authApi.verifyToken>,
  Tokens['access']
>('user/verifyToken', authApi.verifyToken)
