import React from 'react'
import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  UnorderedList,
  ListItem,
  Divider,
  Tag,
  HStack,
} from '@chakra-ui/react'
import { Product } from 'services/models'
import { Image } from 'components/common/Image'
import Slider from 'react-slick'
import styled from 'styled-components'
import { BiEditAlt, BiX } from 'react-icons/bi'
import { useProducts } from 'hooks/useProducts'
import { useDisclosure } from '@chakra-ui/hooks'
import { EditProductModal } from 'components/modals/EditProductModal'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.VFC<ProductCardProps> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteProduct, getProducts } = useProducts()
  const { refetch: refetchProducts } = getProducts()

  const onDelete = async () => {
    await deleteProduct.mutateAsync(product.id)
    await refetchProducts()
  }

  return (
    <>
      <EditProductModal product={product} isOpen={isOpen} onClose={onClose} />
      <Flex
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        p="6"
        position="relative"
      >
        {Boolean(product.images.length) && (
          <Box
            w="150px"
            h="150px"
            overflow="hidden"
            mr="6"
            display="flex"
            alignItems="center"
            justifyContent="center"
            rounded={'lg'}
            boxShadow={'lg'}
            bg="gray.200"
          >
            <Slider>
              {product.images.map((image) => (
                <SlideWrapper key={image.id}>
                  <ImageWrapper src={image.image as any} />
                </SlideWrapper>
              ))}
            </Slider>
          </Box>
        )}

        <Box w="100%">
          <HStack
            spacing={3}
            alignItems="center"
            justifyContent="start"
            flexWrap="wrap"
          >
            <Heading size="md">{product.name}</Heading>
            {product.price && <Heading size="sm">{product.price} руб.</Heading>}
            {product.is_shipping_required && (
              <Tag colorScheme="blue">Есть доставка</Tag>
            )}
          </HStack>
          <Divider my={3} />
          <Flex>
            <Text>{product.description}</Text>
            {Boolean(product.options.length) && (
              <UnorderedList ml={10}>
                {product.options.map((option) => (
                  <ListItem key={option.id}>
                    {option.key}: {option.value}
                  </ListItem>
                ))}
              </UnorderedList>
            )}
          </Flex>
        </Box>

        <ProductPanelWrapper>
          <IconButton
            size="sm"
            aria-label="Edit"
            icon={<BiEditAlt />}
            onClick={onOpen}
          />
          <IconButton
            size="sm"
            aria-label="Remove"
            icon={<BiX />}
            ml={2}
            onClick={onDelete}
          />
        </ProductPanelWrapper>
      </Flex>
    </>
  )
}

const SlideWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`

const ImageWrapper = styled(Image)`
  object-fit: cover;
  width: 100%;
`

const ProductPanelWrapper = styled(Flex)`
  top: 10px;
  right: 10px;
  position: absolute;
`
