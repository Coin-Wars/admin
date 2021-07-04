import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { verifyToken } from 'services/api/auth'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')

      if (!accessToken) {
        Router.replace('/')
      } else {
        verifyToken(accessToken).then((data) => {
          if (data) {
            setVerified(data)
          } else {
            localStorage.removeItem('accessToken')
            Router.replace('/')
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
