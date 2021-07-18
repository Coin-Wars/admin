import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthorizationLayout } from 'components/layouts/AuthorizationLayout'
import { useAuth } from 'hooks/useAuth'
import { LoginForm } from 'components/forms/LoginForm'
import { withUnAuth } from 'hocs/withUnauth'

const Login: NextPage = () => {
  const { isLogged } = useAuth()

  return (
    <>
      <NextSeo title="Вход" />
      <AuthorizationLayout>
        <LoginForm />
      </AuthorizationLayout>
    </>
  )
}

export default withUnAuth(Login)
