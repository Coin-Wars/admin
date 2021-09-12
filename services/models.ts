import { EntityId } from '@reduxjs/toolkit'
import { Object } from 'ts-toolbelt'

export interface Tokens {
  access: string
  refresh: string
}

export interface RegisterData {
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: EntityId
  email: string
  first_name: string
  last_name: string
}

export interface UserUpdateData extends Object.Optional<Object.Nullable<User>> {
  old_password?: string | null
  password?: string | null
}

export interface Store {
  id: EntityId
  seller: User
  name: string
  description: string
  logo: string | null
}

export interface StoreCreationData {
  name: string
  description?: string
  logo?: File
}

export interface StoreUpdateData
  extends Object.Optional<Object.Nullable<Omit<Store, 'seller'>>> {}

export interface Product {
  id: EntityId
  store: Store
  images: ProductImage[]
  options: ProductOption[]
  name: string
  description: string | null
  is_shipping_required: boolean
  price: number
}

export interface ProductImage {
  id: EntityId
  image: string
}

export interface ProductOption {
  key: string
  value: string
}

export interface ProductCreationData {
  name: string
  description?: string
  is_shipping_required: boolean
  price: number
  images: ProductImage[]
  options: ProductOption[]
  store: EntityId
}

export interface ProductUpdateData {
  id: EntityId
  name?: string
  description?: string
  is_shipping_required?: boolean
  price?: number
  images?: ProductImage[]
  options: ProductOption[]
}
