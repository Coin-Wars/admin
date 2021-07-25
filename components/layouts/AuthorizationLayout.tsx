import React from 'react'
import { Container, Center, Flex, useColorModeValue } from '@chakra-ui/react'

export const AuthorizationLayout: React.FC = ({ children }) => (
  <Flex h="100vh" align={'center'} justify={'center'}>
    <Container maxW="container.sm">
      <Center>{children}</Center>
    </Container>
  </Flex>
)
