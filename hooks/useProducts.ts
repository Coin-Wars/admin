import { useMutation, useQuery } from 'react-query'
import * as productsApi from 'services/api/products'
import { useStore } from './useStore'
import { EntityId } from '@reduxjs/toolkit'
import { ProductCreationData } from 'services/models'

interface DeleteProductImageData {
  productId: EntityId
  imageId: EntityId
}

interface DeleteProductOptionData {
  productId: EntityId
  optionId: EntityId
}

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
    deleteProduct: useMutation(productsApi.deleteProduct),
    updateProduct: useMutation(productsApi.updateProduct),
    deleteProductOption: useMutation(
      ({ productId, optionId }: DeleteProductOptionData) =>
        productsApi.deleteProductOption(productId, optionId)
    ),
    deleteProductImage: useMutation(
      ({ productId, imageId }: DeleteProductImageData) =>
        productsApi.deleteProductImage(productId, imageId)
    ),
  }
}
