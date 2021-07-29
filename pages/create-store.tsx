import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'

const CreateStore: React.VFC = () => (
  <AuthorizedLayout>hello !</AuthorizedLayout>
)

export default withAuth(CreateStore)
