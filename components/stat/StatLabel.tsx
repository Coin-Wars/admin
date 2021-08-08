import React from 'react'
import {
  StatLabel as ChakraStatLabel,
  useColorModeValue,
} from '@chakra-ui/react'

export const StatLabel: React.FC = ({ children }) => (
  <ChakraStatLabel
    fontWeight="medium"
    isTruncated
    color={useColorModeValue('gray.500', 'gray.400')}
  >
    {children}
  </ChakraStatLabel>
)
