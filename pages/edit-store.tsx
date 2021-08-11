import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { withStoreOwning } from 'hocs/withStoreOwning'
import { EditStoreForm } from 'components/forms/EditStoreForm'

const CreateStore: React.VFC = () => (
  <>
    <NextSeo title={routes.editStore.name} />
    <AuthorizedLayout>
      <EditStoreForm />
    </AuthorizedLayout>
  </>
)

export default withAuth(withStoreOwning(CreateStore))
