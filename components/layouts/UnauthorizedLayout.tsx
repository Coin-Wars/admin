import React from 'react'
import { Container } from '@chakra-ui/react'
import { UnauthNavbar } from 'components/common/navbar/UnauthNavbar'

export const UnauthorizedLayout: React.FC = ({ children }) => (
  <>
    <UnauthNavbar />
    <Container pt="90px">{children}</Container>
  </>
)
