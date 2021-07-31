import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'

const Settings: React.VFC = () => (
  <>
    <NextSeo title={routes.settings.name} />
    <AuthorizedLayout>settings</AuthorizedLayout>
  </>
)

export default withAuth(Settings)
