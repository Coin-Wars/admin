import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

export const BaseLayout: React.FC = ({ children }) => (
  <Box bg={useColorModeValue('gray.50', 'gray.800')} minH={'100vh'}>
    {children}
  </Box>
)
