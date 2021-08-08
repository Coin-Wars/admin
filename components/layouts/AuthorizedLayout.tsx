import React, { useEffect } from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Sidebar } from 'components/common/sidebar/Sidebar'
import { useDisclosure } from '@chakra-ui/hooks'
import { InitialUserInfoModal } from 'components/modals/InitialUserInfoModal'

export const AuthorizedLayout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!localStorage.getItem('user_info_filled')) {
      onOpen()
      localStorage.setItem('user_info_filled', '1')
    }
  }, [])

  return (
    <>
      {isOpen && <InitialUserInfoModal isOpen={isOpen} onClose={onClose} />}
      <Box>
        <Sidebar />
        <Container maxW="6xl">
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Container>
      </Box>
    </>
  )
}
