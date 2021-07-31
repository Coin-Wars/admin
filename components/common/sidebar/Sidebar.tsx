import React from 'react'
import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  CloseButton,
  BoxProps,
} from '@chakra-ui/react'
import { SidebarLink } from './SidebarLink'
import { sidebarLinks } from 'resources/sidebarLinks'

interface SidebarProps extends BoxProps {}

export const Sidebar: React.VFC<SidebarProps> = ({ ...rest }) => (
  <Box
    transition="3s ease"
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    top={0}
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      <CloseButton display={{ base: 'flex', md: 'none' }} />
    </Flex>
    {sidebarLinks.map((link) => (
      <SidebarLink link={link.path} key={link.path} icon={link.icon}>
        {link.name}
      </SidebarLink>
    ))}
  </Box>
)