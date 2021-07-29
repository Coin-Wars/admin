import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'

const Settings: React.VFC = () => <AuthorizedLayout>settings</AuthorizedLayout>

export default withAuth(Settings)
