import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { routes } from 'resources/routes'
import { useStore } from 'hooks/useStore'

export function withStoreOwning<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { currentStore } = useStore()
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      if (currentStore) {
        setVerified(true)
      } else {
        Router.replace(routes.panel.path)
      }
    }, [])

    if (verified) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}
