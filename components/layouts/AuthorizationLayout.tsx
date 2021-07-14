import React from 'react'
import { Container, Center, Flex, useColorModeValue } from '@chakra-ui/react'

export const AuthorizationLayout: React.FC = ({ children }) => (
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Container maxW="container.sm">
      <Center>{children}</Center>
    </Container>
  </Flex>
)
