import React from 'react'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { withStoreOwning } from 'hocs/withStoreOwning'
import { Heading, Button, Flex, Divider, VStack } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import { ProductCard } from 'components/product/ProductCard'
import { useDisclosure } from '@chakra-ui/hooks'
import { CreateProductModal } from 'components/modals/CreateProductModal'
import { useProducts } from 'hooks/useProducts'

const Products: React.VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getProducts } = useProducts()

  const products = getProducts()

  const onModalClose = async () => {
    onClose()
    await products.refetch()
  }

  return (
    <>
      <NextSeo title={routes.products.name} />
      <AuthorizedLayout>
        <CreateProductModal isOpen={isOpen} onClose={onModalClose} />
        <Flex w="100%" justifyContent="space-between" alignItems="end">
          <Heading>Товары</Heading>
          <Button leftIcon={<BiPlus />} onClick={onOpen}>
            Добавить
          </Button>
        </Flex>
        <Divider my="4" />
        {products.data && (
          <VStack>
            {products.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </VStack>
        )}
      </AuthorizedLayout>
    </>
  )
}

export default withAuth(withStoreOwning(Products))
