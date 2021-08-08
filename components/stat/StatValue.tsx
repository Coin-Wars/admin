import React from 'react'
import { StatNumber, useColorModeValue } from '@chakra-ui/react'

export const StatValue: React.FC = ({ children }) => (
  <StatNumber
    fontSize="3xl"
    fontWeight="medium"
    color={useColorModeValue('gray.900', 'white')}
  >
    {children}
  </StatNumber>
)
