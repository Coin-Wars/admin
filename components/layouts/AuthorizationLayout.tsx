import React from 'react'
import { Container, Center, Flex } from '@chakra-ui/react'
import { UnauthNavbar } from 'components/common/navbar/UnauthNavbar'

export const AuthorizationLayout: React.FC = ({ children }) => (
  <>
    <UnauthNavbar />
    <Flex h="100vh" align={'center'} justify={'center'}>
      <Container maxW="container.sm">
        <Center>{children}</Center>
      </Container>
    </Flex>
  </>
)
