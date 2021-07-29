import { routes } from './routes'
import { BiHome, BiStore } from 'react-icons/bi'

export const sidebarLinks = [
  { ...routes.panel, icon: BiHome },
  { ...routes.create_store, icon: BiStore },
]
