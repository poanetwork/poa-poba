import React from 'react'
import glamorous from 'glamorous'
import LogoContainer from './LogoContainer'
import Logo from './Logo'
import { headerHeight } from './styles/constants'

  const BaseHeader = glamorous.header({
  height: headerHeight,
  padding: '23px 0'
})

const Header = () => (
  <BaseHeader>
    <LogoContainer>
      <Logo href="/" />
    </LogoContainer>
  </BaseHeader>
)

export default Header
