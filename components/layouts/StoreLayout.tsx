import React from 'react'
import { Center, Box } from '@chakra-ui/react'

export const StoreLayout: React.FC = ({ children }) => (
  <Center py={20}>
    <Box w="700px">{children}</Box>
  </Center>
)
