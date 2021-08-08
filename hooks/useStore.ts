import { useDispatch } from 'react-redux'
import { StoreCreationData } from 'services/models'
import { createStore } from 'store/store/actions'

export const useStore = () => {
  const dispatch = useDispatch()

  return {
    createStore: (data: StoreCreationData) => dispatch(createStore(data)),
  }
}
