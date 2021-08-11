import nookie from 'nookies'
import { createAsyncThunk, EntityId } from '@reduxjs/toolkit'
import * as authApi from 'services/api/auth'
import * as userApi from 'services/api/user'
import {
  LoginData,
  RegisterData,
  Tokens,
  User,
  UserUpdateData,
} from 'services/models'
import Router from 'next/router'
import { actions as userActions } from './index'
import { routes } from 'resources/routes'
import { infoSelector } from './selectors'
import { RootState } from 'store'

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  userApi.getCurrentUser
)

export const register = createAsyncThunk('user/register', authApi.register)

export const login = createAsyncThunk<Promise<Tokens>, LoginData>(
  'user/login',
  async (data) => {
    const { access, refresh } = await authApi.getTokens(data)

    nookie.set(null, 'access_token', access)
    nookie.set(null, 'refresh_token', refresh)

    return { access, refresh }
  }
)

export const logout = createAsyncThunk('user/logout', (_, thunkAPI) => {
  nookie.destroy(null, 'access_token')
  nookie.destroy(null, 'refresh_token')

  thunkAPI.dispatch(userActions.resetAuth())
  Router.push(routes.main.path)
})

export const reenter = createAsyncThunk<
  Promise<Tokens>,
  Omit<Tokens, 'access'>
>('user/reenter', async ({ refresh }) => {
  const { access } = await authApi.refreshToken(refresh)
  nookie.set(null, 'access_token', access)
  return { access, refresh }
})

export const update = createAsyncThunk<
  Promise<User>,
  UserUpdateData,
  { state: RootState }
>('user/update', (data, thunkAPI) => {
  const { id } = infoSelector(thunkAPI.getState())
  return userApi.updateUser(id as EntityId, data)
})
