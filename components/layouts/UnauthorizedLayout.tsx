import React from 'react'
import { Container } from '@chakra-ui/react'

export const UnauthorizedLayout: React.FC = ({ children }) => (
  <Container pt="90px">{children}</Container>
)
