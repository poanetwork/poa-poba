import React from 'react'
import glamorous from 'glamorous'
import LogoContainer from './LogoContainer'
import Logo from './Logo'
import { headerHeight } from '../styles/constants'

const BaseHeader = glamorous.header({
  gridRowStart: '1',
  gridRowEnd: '1',
  alignSelf: 'start',
  height: headerHeight,
  padding: '23px 0',
  width: '100%'
})

const Header = () => (
  <BaseHeader>
    <LogoContainer>
      <Logo href="/" />
    </LogoContainer>
  </BaseHeader>
)

export default Header
