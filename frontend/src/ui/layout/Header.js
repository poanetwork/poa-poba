import React from 'react'
import glamorous from 'glamorous'
import LogoContainer from './LogoContainer'
import Logo from './Logo'
import { headerStyles } from '../styles/layout'

const BaseHeader = glamorous.header(headerStyles)

const Header = () => (
  <BaseHeader>
    <LogoContainer>
      <Logo href="/" />
    </LogoContainer>
  </BaseHeader>
)

export default Header
