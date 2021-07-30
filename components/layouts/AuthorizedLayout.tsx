import React, { useEffect } from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Sidebar } from 'components/common/sidebar/Sidebar'
import { useDisclosure } from '@chakra-ui/hooks'
import { InitialUserInfoModal } from 'components/modals/InitialUserInfoModal'

export const AuthorizedLayout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    console.log(localStorage.getItem('user_info_filled'))
    if (!localStorage.getItem('user_info_filled')) {
      onOpen()
    }
  }, [])

  return (
    <>
      {isOpen && <InitialUserInfoModal isOpen={isOpen} onClose={onClose} />}
      <Box>
        <Sidebar />
        <Container>
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Container>
      </Box>
    </>
  )
}
