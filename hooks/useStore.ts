import { useDispatch, useSelector } from 'react-redux'
import { StoreCreationData, StoreUpdateData } from 'services/models'
import { createStore, getStore, updateStore } from 'store/store/actions'
import { storeSelector, storeExistsSelector } from 'store/store/selectors'

export const useStore = () => {
  const dispatch = useDispatch()

  return {
    createStore: (data: StoreCreationData) => dispatch(createStore(data)),
    getCurrentStore: () => dispatch(getStore()),
    updateStore: (data: StoreUpdateData) => dispatch(updateStore(data)),
    currentStore: useSelector(storeSelector),
    storeExists: useSelector(storeExistsSelector),
  }
}
