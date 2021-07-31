import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'

const CreateStore: React.VFC = () => (
  <>
    <NextSeo title={routes.create_store.name} />
    <AuthorizedLayout>hello !</AuthorizedLayout>
  </>
)

export default withAuth(CreateStore)
