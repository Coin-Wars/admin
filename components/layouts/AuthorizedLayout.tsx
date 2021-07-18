import React from 'react'
import { Container, Drawer, DrawerContent, Box } from '@chakra-ui/react'
import { Sidebar } from 'components/sidebar/Sidebar'
import { Navbar } from 'components/common/Navbar'

export const AuthorizedLayout: React.FC = ({ children }) => (
  <Container>
    <Drawer
      autoFocus={false}
      placement="left"
      returnFocusOnClose={false}
      isOpen={true}
      onClose={() => {}}
    >
      <DrawerContent>
        <Sidebar />
      </DrawerContent>
    </Drawer>
    <Navbar />
    <Box ml={{ base: 0, md: 60 }} p="4">
      {children}
    </Box>
  </Container>
)
