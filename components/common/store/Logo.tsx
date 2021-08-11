import React from 'react'
import styled from 'styled-components'
import { Image } from 'components/common/Image'

interface LogoProps {
  src: string
}

export const Logo: React.VFC<LogoProps> = ({ src }) => {
  return <LogoImage src={src} />
}

const LogoImage = styled(Image)`
  width: 80px;
  box-shadow: var(--chakra-shadows-lg);
`
