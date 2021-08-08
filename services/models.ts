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
  telegram_user: number
}

export type UserUpdateData = Object.Optional<
  Object.Nullable<{
    email: string
    first_name: string
    last_name: string
    telegram_user: number
    old_password: string
    password: string
  }>
>

export interface StoreCreationData {
  telegram_token: string
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
