import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCurrentUser } from 'services/api/auth'
import { useAuth } from 'hooks/useAuth'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { tokens } = useAuth()
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      if (!tokens.access) {
        Router.replace('/')
      } else {
        getCurrentUser().then((data) => {
          if (data) {
            setVerified(true)
          }
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