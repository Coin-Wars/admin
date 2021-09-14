import { User, UserUpdateData } from 'services/models'
import { axios } from './index'

export const updateUser = (data: UserUpdateData) =>
  axios.patch<User>(`users/${data.id}/`, data).then((res) => res.data)

export const getCurrentUser = () =>
  axios.get<User>('users/me/').then((res) => res.data)
