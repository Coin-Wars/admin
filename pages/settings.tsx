import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { UserInfoForm } from 'components/forms/UserInfoForm'

const Settings: React.VFC = () => (
  <>
    <NextSeo title={routes.settings.name} />
    <AuthorizedLayout>
      <UserInfoForm />
    </AuthorizedLayout>
  </>
)

export default withAuth(Settings)
