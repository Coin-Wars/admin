import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'

export function withUnAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { tokens } = useAuth()
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      console.log(tokens)
      if (tokens.access) {
        Router.replace('/panel')
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
