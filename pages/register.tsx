import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthorizationLayout } from 'components/layouts/AuthorizationLayout'
import { useAuth } from 'hooks/useAuth'

const Register: NextPage = () => {
  const { isLogged } = useAuth()

  return (
    <>
      <NextSeo title="Регистрация" />
      <AuthorizationLayout>register page!</AuthorizationLayout>
    </>
  )
}

export default Register
