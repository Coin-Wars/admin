import React from 'react'
import { Box, IconButton } from '@chakra-ui/react'
import { Image } from 'components/common/Image'
import styled from 'styled-components'
import { BiX } from 'react-icons/bi'
import { ProductImage } from 'services/models'
import { EntityId } from '@reduxjs/toolkit'

interface EditProductImageProps {
  image: ProductImage
  onDelete: (id: EntityId) => void
}

export const EditProductImage: React.VFC<EditProductImageProps> = ({
  image,
  onDelete,
}) => {
  return (
    <Box position="relative" w="100%" h="100%">
      <ImageWrapper src={image.image as any} />
      <ImageButtons>
        <IconButton
          size="sm"
          aria-label="Remove"
          icon={<BiX />}
          onClick={() => onDelete(image.id)}
        />
      </ImageButtons>
    </Box>
  )
}

const ImageButtons = styled(Box)`
  top: 5px;
  right: 5px;
  position: absolute;
`

const ImageWrapper = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
