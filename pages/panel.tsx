import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'

const Panel: React.VFC = () => {
  return (
    <>
      <NextSeo title={routes.panel.name} />
      <AuthorizedLayout>panel</AuthorizedLayout>
    </>
  )
}

export default withAuth(Panel)
