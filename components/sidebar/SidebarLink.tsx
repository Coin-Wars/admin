import React from 'react'
import { Link, Flex, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import RouterLink from 'next/link'

interface SidebarLinkProps {
  icon: IconType
  link: string
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  children,
  icon,
  link,
  ...rest
}) => (
  <RouterLink href={link} passHref>
    <Link href={link} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
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
  </RouterLink>
)
