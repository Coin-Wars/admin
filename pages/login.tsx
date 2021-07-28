import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthorizationLayout } from 'components/layouts/AuthorizationLayout'
import { LoginForm } from 'components/forms/LoginForm'
import { withUnAuth } from 'hocs/withUnauth'
import { routes } from 'resources/routes'

const Login: NextPage = () => (
  <>
    <NextSeo title={routes.login.name} />
    <AuthorizationLayout>
      <LoginForm />
    </AuthorizationLayout>
  </>
)

export default withUnAuth(Login)
