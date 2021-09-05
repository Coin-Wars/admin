import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Product } from 'services/models'
import { Image } from 'components/common/Image'
import { Carousel } from 'react-responsive-carousel'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.VFC<ProductCardProps> = ({ product }) => (
  <Box w="100%" borderWidth="1px" borderRadius="lg" bg="white" p="6">
    {product.images && (
      <Carousel>
        {product.images.map((image) => (
          <div key={image.id}>
            <Image src={image.image as any} />
          </div>
        ))}
      </Carousel>
    )}
    <Heading size="md">{product.name}</Heading>
    <Text>{product.description}</Text>
  </Box>
)
