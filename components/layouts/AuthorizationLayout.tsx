import React from 'react'
import styled from 'styled-components'
import { Container, Center, Box } from '@chakra-ui/react'

export const AuthorizationLayout: React.FC = ({ children }) => (
  <BackgroundContainer>
    <Container maxW="container.xl">
      <Center>{children}</Center>
    </Container>
  </BackgroundContainer>
)

const BackgroundContainer = styled(Box)`
  background: white;
  min-height: 100vh;
`
