import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Sidebar } from 'components/sidebar/Sidebar'

export const AuthorizedLayout: React.FC = ({ children }) => (
  <Box>
    <Sidebar />
    <Container>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Container>
  </Box>
)
