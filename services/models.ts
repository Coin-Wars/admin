export type ID = number

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
  readonly id: ID
  email: string
  first_name: string
  last_name: string
  telegram_user: number
}

export interface UserUpdate {
  email?: string
  first_name?: string
  last_name?: string
  telegram_user?: number
  old_password?: string
  password?: string
}
