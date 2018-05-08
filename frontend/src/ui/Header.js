import React from 'react'
import glamorous from 'glamorous'
import LogoContainer from './LogoContainer'
import Logo from './Logo'
import { headerHeight, headerBackgroundImage } from './styles/constants'
import { fullWidth } from './styles/mixins'

const BaseHeader = glamorous.header(fullWidth, {
  top: '0',
  height: headerHeight,
  padding: '23px 0',
  backgroundImage: headerBackgroundImage
})

const Header = () => (
  <BaseHeader>
    <LogoContainer>
      <Logo href="/" />
    </LogoContainer>
  </BaseHeader>
)

export default Header
