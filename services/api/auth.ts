import { Tokens } from 'services/models'

export const verifyToken = (token: Tokens['access']) =>
  Promise.resolve(Boolean(token))
