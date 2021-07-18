import React from 'react'
import { Container, Center, Flex, useColorModeValue } from '@chakra-ui/react'

export const AuthorizationLayout: React.FC = ({ children }) => (
  <Flex align={'center'} justify={'center'}>
    <Container maxW="container.sm">
      <Center>{children}</Center>
    </Container>
  </Flex>
)
