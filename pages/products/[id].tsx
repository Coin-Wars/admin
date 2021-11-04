import React from 'react'
import { NextSeo } from 'next-seo'
import { format } from 'util'
import { routes } from 'resources/routes'
import { StoreLayout } from 'components/layouts/StoreLayout'
import { useRouter } from 'next/router'
import { useProducts } from 'hooks/useProducts'
import { Spinner } from '@chakra-ui/react'

const Product: React.VFC = () => {
  const router = useRouter()
  const { id } = router.query
  const { getProductById } = useProducts()

  const productQuery = getProductById(Number(id))

  return productQuery.data ? (
    <>
      <NextSeo title={format(routes.product.name, productQuery.data.name)} />
      <StoreLayout>{productQuery.data.name}</StoreLayout>
    </>
  ) : (
    <Spinner />
  )
}

export default Product
