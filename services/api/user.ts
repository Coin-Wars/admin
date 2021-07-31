import { ID, User, UserUpdateData } from 'services/models'
import { axios } from './index'

export const updateUser = (userId: ID, data: UserUpdateData) =>
  axios.patch<User>(`users/${userId}`, data).then((res) => res.data)
export const getCurrentUser = () =>
  axios.get<User>('users/me/').then((res) => res.data)
