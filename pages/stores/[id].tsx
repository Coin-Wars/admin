import React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { format } from 'util'
import { useStore } from 'hooks/useStore'
import { StoreLayout } from 'components/layouts/StoreLayout'
import { Heading, Divider, Spinner, Text, Box, HStack } from '@chakra-ui/react'
import { Logo } from 'components/store/Logo'
import { ProductCard } from 'components/product/ProductCard'
import { useProducts } from 'hooks/useProducts'

const Store: React.VFC = () => {
  const router = useRouter()
  const { id } = router.query
  const { getStoreByIdQuery } = useStore()
  const { getProductsByStoreIdQuery } = useProducts()

  const storeQuery = getStoreByIdQuery(Number(id))
  const productsQuery = getProductsByStoreIdQuery(Number(id))

  return storeQuery.data ? (
    <>
      <NextSeo title={format(routes.store.name, storeQuery.data.name)} />
      <StoreLayout>
        <Heading>
          {storeQuery.data.logo && (
            <Box mr={4} display="inline-block">
              <Logo src={storeQuery.data.logo} />
            </Box>
          )}
          {storeQuery.data.name}
        </Heading>
        <Text my={4}>{storeQuery.data.description}</Text>
        <Divider />
        {productsQuery.data ? (
          Boolean(productsQuery.data.length) && (
            <HStack mt={8} spacing="16px">
              {productsQuery.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </HStack>
          )
        ) : (
          <Spinner />
        )}
      </StoreLayout>
    </>
  ) : (
    <Spinner />
  )
}

export default Store
