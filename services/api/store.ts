import { StoreCreationData } from 'services/models'
import { axios } from './index'

export const create = (data: StoreCreationData) =>
  axios.post('stores/', data).then((res) => res.data)
