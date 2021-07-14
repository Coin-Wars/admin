import {
  LoginData,
  RegisterData,
  Tokens,
  User,
  UserUpdate,
} from 'services/models'
import { axios } from './index'

export const register = (data: RegisterData) =>
  axios.post<RegisterData, User>('users/', data)
export const updateUser = (data: UserUpdate) =>
  axios.patch<UserUpdate, User>('users/', data)
export const getCurrentUser = () => axios.get<unknown, User>('users/me/')

export const getTokens = (data: LoginData) =>
  axios.post<LoginData, Tokens>('users/token/', data)
export const refreshToken = (refresh: Tokens['refresh']) =>
  axios.post<Tokens['refresh'], Omit<Tokens, 'refresh'>>(
    'users/token/refresh/',
    { refresh }
  )
