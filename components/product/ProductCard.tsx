import React, { useMemo } from 'react'
import { Product } from 'services/models'
import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import Slider from 'react-slick'
import { Image } from 'components/common/Image'
import currencyFormatter from 'currency-formatter'
import styled from 'styled-components'
import NoImage from 'public/images/no-product-image.png'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.VFC<ProductCardProps> = ({ product }) => {
  const images = useMemo(
    () =>
      product.images.length ? product.images : [{ id: 0, image: NoImage }],
    [product]
  )

  console.log(images)

  return (
    <Box
      w="200px"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      overflow="hidden"
    >
      {Boolean(images.length) && (
        <Box height="170px" w="100%" bg="gray.200">
          <Slider>
            {images.map((image) => (
              <Box key={image.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  h="170px"
                  overflow="hidden"
                >
                  <ImageWrapper src={image.image as any} />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      )}
      <Box p="4">
        <Flex justifyContent="space-between">
          <Heading size="sm">{product.name} </Heading>
          <Heading size="sm">
            {product.price &&
              currencyFormatter.format(product.price, {
                code: product.price_currency,
              })}
          </Heading>
        </Flex>
        <Text mt={2} height="50px" noOfLines={2} wordBreak="break-word">
          {product.description}
        </Text>
      </Box>
    </Box>
  )
}

const ImageWrapper = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`
