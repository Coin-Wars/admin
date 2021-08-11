import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { useAuth } from 'hooks/useAuth'
import { AuthNavbar } from 'components/common/navbar/AuthNavbar'
import { UnauthNavbar } from 'components/common/navbar/UnauthNavbar'

export const BaseLayout: React.FC = ({ children }) => {
  const { isLogged } = useAuth()

  return (
    <>
      {isLogged ? <AuthNavbar /> : <UnauthNavbar />}
      <Box bg={useColorModeValue('gray.50', 'gray.800')} minH="100%">
        {children}
      </Box>
    </>
  )
}
