import React from 'react'
import { Stat, useColorModeValue } from '@chakra-ui/react'

export const StatCard: React.FC = ({ children }) => (
  <Stat
    px={{ base: 4, sm: 6 }}
    py="5"
    bg={useColorModeValue('white', 'gray.700')}
    shadow="base"
    rounded="lg"
  >
    {children}
  </Stat>
)
