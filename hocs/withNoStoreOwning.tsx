import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { routes } from 'resources/routes'
import { useStore } from 'hooks/useStore'

export function withNoStoreOwning<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { storeExists } = useStore()
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      if (storeExists) {
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
