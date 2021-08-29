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
  readonly id: EntityId
  email: string
  first_name: string
  last_name: string
}

export type UserUpdateData = Object.Optional<
  Object.Nullable<{
    email: string
    first_name: string
    last_name: string
    old_password: string
    password: string
  }>
>

export interface StoreCreationData {
  name: string
  description?: string
  logo?: File
}

export interface Store {
  id: EntityId
  seller: User
  name: string
  description: string | null
  logo: string | null
}

export type StoreUpdateData = Object.Optional<
  Object.Nullable<{
    name: string
    description: string
    logo: File
  }>
>

export interface Product {
  readonly id: EntityId
  store: Store
  name: string
  description: string | null
}

export interface ProductCreationData {
  name: string
  description?: string
  image?: File
}
