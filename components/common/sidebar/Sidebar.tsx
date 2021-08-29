import React, { useMemo } from 'react'
import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  CloseButton,
  BoxProps,
} from '@chakra-ui/react'
import { SidebarLink } from './SidebarLink'
import { routes } from 'resources/routes'
import { BiHome, BiStore, BiCube } from 'react-icons/bi'
import { useStore } from 'hooks/useStore'
import { zIndexes } from 'assets/styles/variables'

interface SidebarProps extends BoxProps {}

export const Sidebar: React.VFC<SidebarProps> = ({ ...rest }) => {
  const { currentStore, storeExists } = useStore()

  const sidebarLinks = useMemo(
    () =>
      [
        { ...routes.panel, icon: BiHome, show: true },
        { ...routes.createStore, icon: BiStore, show: !storeExists },
        { ...routes.editStore, icon: BiStore, show: storeExists },
        { ...routes.products, icon: BiCube, show: storeExists },
      ].filter((link) => link.show),
    [currentStore]
  )

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      top={0}
      h="full"
      zIndex={zIndexes.sidebar}
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
}
