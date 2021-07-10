import { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { AuthorizationLayout } from 'components/layouts/AuthorizationLayout'
import { useAuth } from 'hooks/useAuth'

const Login: NextPage = () => {
  const { isLogged } = useAuth()

  return (
    <>
      <NextSeo title="Login" />
      <AuthorizationLayout>
        <Button>is logged - {String(isLogged)}</Button>
      </AuthorizationLayout>
    </>
  )
}

export default Login
