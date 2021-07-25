import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'

const Panel: React.VFC = () => {
  return (
    <>
      <NextSeo title="Панель" />
      <AuthorizedLayout>panel</AuthorizedLayout>
    </>
  )
}

export default withAuth(Panel)
