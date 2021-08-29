import { useAppDispatch } from 'store'
import {
  createProduct,
  updateProduct,
  getByStoreId,
} from 'store/products/actions'
import { ProductCreationData, ProductUpdateData } from 'services/models'
import { EntityId } from '@reduxjs/toolkit'

export const useProducts = () => {
  const dispatch = useAppDispatch()

  return {
    createProduct: (data: ProductCreationData) =>
      dispatch(createProduct(data)).unwrap(),
    updateProduct: (data: ProductUpdateData) =>
      dispatch(updateProduct(data)).unwrap(),
    getByStoreId: (storeId: EntityId) =>
      dispatch(getByStoreId(storeId)).unwrap(),
  }
}
