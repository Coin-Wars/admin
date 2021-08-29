import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { withNoStoreOwning } from 'hocs/withNoStoreOwning'
import { CreateStoreForm } from 'components/forms/CreateStoreForm'

const CreateStore: React.VFC = () => (
  <>
    <NextSeo title={routes.createStore.name} />
    <AuthorizedLayout>
      <CreateStoreForm />
    </AuthorizedLayout>
  </>
)

export default withAuth(withNoStoreOwning(CreateStore))
