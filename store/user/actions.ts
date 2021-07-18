import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from 'services/api/auth'
import { LoginData, RegisterData, Tokens, User } from 'services/models'
import Router from 'next/router'

export const getCurrentUser = createAsyncThunk<
  ReturnType<typeof authApi.getCurrentUser>
>('user/getCurrentUser', authApi.getCurrentUser)

export const register = createAsyncThunk<Promise<User>, RegisterData>(
  'user/register',
  authApi.register
)

export const login = createAsyncThunk<Promise<Tokens>, LoginData>(
  'user/login',
  async (data) => {
    const { access, refresh } = await authApi.getTokens(data)

    Cookies.set('access_token', access)
    Cookies.set('refresh_token', refresh)

    return { access, refresh }
  }
)

export const logout = createAsyncThunk('user/logout', () => {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  Router.push('/')
})

export const reenter = createAsyncThunk<
  Promise<Tokens>,
  Omit<Tokens, 'access'>
>('user/reenter', async ({ refresh }) => {
  const { access } = await authApi.refreshToken(refresh)
  Cookies.set('access_token', access)
  return { access, refresh }
})
