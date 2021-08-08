import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { HStack } from '@chakra-ui/react'
import { StatCard } from 'components/stat/StatCard'
import { StatLabel } from 'components/stat/StatLabel'
import { StatValue } from 'components/stat/StatValue'

const Panel: React.VFC = () => {
  return (
    <>
      <NextSeo title={routes.panel.name} />
      <AuthorizedLayout>
        <HStack spacing="24px">
          <StatCard>
            <StatLabel>Заказы</StatLabel>
            <StatValue>228 📦</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Прибыль</StatLabel>
            <StatValue>1488 руб. 💵</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Покупатели </StatLabel>
            <StatValue>2,5 🚶‍♂</StatValue>
          </StatCard>
        </HStack>
      </AuthorizedLayout>
    </>
  )
}

export default withAuth(Panel)
