import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from 'services/api/auth'
import { Tokens } from 'services/models'
import Router from 'next/router'

export const getCurrentUser = createAsyncThunk<
  ReturnType<typeof authApi.getCurrentUser>,
  Tokens['access']
>('user/getCurrentUser', authApi.getCurrentUser)

export const register = createAsyncThunk('user/register', () => {})

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
