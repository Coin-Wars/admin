import React from 'react'
import { Link, Flex, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface SidebarLinkProps {
  icon: IconType
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  children,
  icon,
  ...rest
}) => (
  <Link href="#" style={{ textDecoration: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  </Link>
)
