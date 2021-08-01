import React, { createContext } from 'react'
import { useToast } from '@chakra-ui/toast'

export const ToastContext = createContext<ReturnType<typeof useToast>>(
  (() => {}) as ReturnType<typeof useToast>
)

export const ToastProvider: React.FC = ({ children }) => {
  const toast = useToast()
  return <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
}
