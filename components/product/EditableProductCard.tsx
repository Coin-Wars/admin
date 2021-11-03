import React, { useMemo } from 'react'
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
import currencyFormatter from 'currency-formatter'
import NoImage from 'public/images/no-product-image.png'

interface ProductCardProps {
  product: Product
}

export const EditableProductCard: React.VFC<ProductCardProps> = ({
  product,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteProduct, getProducts } = useProducts()
  const { refetch: refetchProducts } = getProducts()

  const onDelete = async () => {
    await deleteProduct.mutateAsync(product.id)
    await refetchProducts()
  }

  const images = useMemo(
    () =>
      product.images.length ? product.images : [{ id: 0, image: NoImage }],
    [product]
  )

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
        {Boolean(images.length) && (
          <Box
            w="150px"
            h="150px"
            overflow="hidden"
            mr="6"
            rounded={'lg'}
            boxShadow={'lg'}
            bg="gray.200"
          >
            <Slider>
              {images.map((image) => (
                <Box key={image.id}>
                  <SlideWrapper>
                    <ImageWrapper src={image.image as any} />
                  </SlideWrapper>
                </Box>
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
            {product.price && (
              <Heading size="sm">
                {currencyFormatter.format(product.price, {
                  code: product.price_currency,
                })}
              </Heading>
            )}
            {product.is_shipping_required && (
              <Tag colorScheme="blue">Есть доставка</Tag>
            )}
          </HStack>
          <Divider my={3} />
          <Flex>
            <Text wordBreak="break-word">{product.description}</Text>
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
  height: 150px;
  width: 100%;
`

const ImageWrapper = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const ProductPanelWrapper = styled(Flex)`
  top: 10px;
  right: 10px;
  position: absolute;
`
