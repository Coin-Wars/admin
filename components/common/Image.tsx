import React from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import styled from 'styled-components'

type ImageProps = {
  className?: string
} & NextImageProps

export const Image: React.VFC<ImageProps> = (props) => (
  <Container className={props.className}>
    <ImageWrapper {...props} layout="fill" />
  </Container>
)

const Container = styled.div`
  display: inline-block;
  > div {
    position: unset !important;
    height: 100%;
  }
`

const ImageWrapper = styled(NextImage)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`
