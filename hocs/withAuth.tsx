import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'
import { useUser } from 'hooks/useUser'
import { routes } from 'resources/routes'
import { createAxiosInterceptors } from 'services/api'
import { useStore } from 'react-redux'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { tokens } = useAuth()
    const { getCurrentUser } = useUser()
    const store = useStore()
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      if (!tokens.access) {
        Router.replace(routes.main.path)
      } else {
        createAxiosInterceptors(store)
        getCurrentUser().then(() => {
          setVerified(true)
        })
      }
    }, [])

    if (verified) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}
