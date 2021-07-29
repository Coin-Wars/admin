import React from 'react'
import {
  useColorModeValue,
  Box,
  Flex,
  IconButton,
  Text,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuDivider,
  VStack,
  MenuList,
} from '@chakra-ui/react'
import { zIndexes } from 'assets/styles/variables'
import { BiChevronDown, BiMenu, BiUserCircle } from 'react-icons/bi'
import { useAuth } from 'hooks/useAuth'
import RouterLink from 'next/link'
import { routes } from 'resources/routes'

export const AuthNavbar: React.VFC = () => {
  const { nickname, logout } = useAuth()

  return (
    <Flex
      zIndex={zIndexes.navbar}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        variant="outline"
        aria-label="open menu"
        icon={<BiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  bg="white"
                  size={'sm'}
                  icon={<BiUserCircle fontSize="1.5rem" />}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{nickname}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <BiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <RouterLink href={routes.settings.path}>
                <MenuItem>Настройки</MenuItem>
              </RouterLink>
              <MenuDivider />
              <MenuItem onClick={logout}>Выход</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
