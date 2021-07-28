import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'
import { routes } from 'resources/routes'

export function withUnAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { tokens } = useAuth()
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      if (tokens.access) {
        Router.replace(routes.panel.path)
      } else {
        setVerified(true)
      }
    }, [])

    if (verified) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}
