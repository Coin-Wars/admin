import { useMutation, useQuery } from 'react-query'
import * as productsApi from 'services/api/products'
import { useStore } from './useStore'
import { EntityId } from '@reduxjs/toolkit'
import { ProductCreationData } from 'services/models'

export const useProducts = () => {
  const { currentStore } = useStore()

  return {
    getProducts: () =>
      useQuery('products', () =>
        productsApi.getProductsByStoreId(currentStore.id as EntityId)
      ),
    createProduct: useMutation((data: ProductCreationData) =>
      productsApi.createProduct({ ...data, store: currentStore.id as EntityId })
    ),
  }
}
