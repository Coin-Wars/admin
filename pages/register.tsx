import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthorizationLayout } from 'components/layouts/AuthorizationLayout'
import { RegisterForm } from 'components/forms/RegisterForm'
import { withUnAuth } from 'hocs/withUnauth'
import { routes } from 'resources/routes'

const Register: NextPage = () => (
  <>
    <NextSeo title={routes.register.name} />
    <AuthorizationLayout>
      <RegisterForm />
    </AuthorizationLayout>
  </>
)

export default withUnAuth(Register)
