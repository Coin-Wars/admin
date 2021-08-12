import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { HStack, Heading, Text, Box } from '@chakra-ui/react'
import { StatCard } from 'components/stat/StatCard'
import { StatLabel } from 'components/stat/StatLabel'
import { StatValue } from 'components/stat/StatValue'
import { useStore } from 'hooks/useStore'
import { Logo } from 'components/store/Logo'
import styled from 'styled-components'

const Panel: React.VFC = () => {
  const { currentStore, storeExists } = useStore()

  return (
    <>
      <NextSeo title={routes.panel.name} />
      <AuthorizedLayout>
        {storeExists && (
          <Box>
            {currentStore.logo && (
              <LogoWrapper>
                <Logo src={currentStore.logo} />
              </LogoWrapper>
            )}
            <Heading display="inline-block">{currentStore.name}</Heading>
            {currentStore.description && (
              <Text>{currentStore.description}</Text>
            )}
          </Box>
        )}
        <HStack spacing="24px" mt="24px">
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

const LogoWrapper = styled.div`
  margin-right: 12px;
  display: inline-block;
`
