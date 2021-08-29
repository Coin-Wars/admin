import {
  LoginData,
  RegisterData,
  Tokens,
  User,
  UserUpdateData,
} from 'services/models'
import { axios } from './index'

export const register = (data: RegisterData) =>
  axios.post<User>('users/', data).then((res) => res.data)

export const getTokens = (data: LoginData) =>
  axios.post<Tokens>('users/token/', data).then((res) => res.data)

export const refreshToken = (refresh: Tokens['refresh']) =>
  axios
    .post<Omit<Tokens, 'refresh'>>('users/token/refresh/', { refresh })
    .then((res) => res.data)
