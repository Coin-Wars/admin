import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthorizationLayout } from 'components/layouts/AuthorizationLayout'
import { useAuth } from 'hooks/useAuth'
import { RegisterForm } from 'components/forms/RegisterForm'

const Register: NextPage = () => {
  const { isLogged } = useAuth()

  return (
    <>
      <NextSeo title="Регистрация" />
      <AuthorizationLayout>
        <RegisterForm />
      </AuthorizationLayout>
    </>
  )
}

export default Register
