import React from 'react'
import glamorous, { P } from 'glamorous'
import LogoContainer from './LogoContainer'
import Logo from './Logo'
import Socials from './Socials'
import { footerHeight, headerBackgroundImage } from './styles/constants'
import { fullWidth } from './styles/mixins'

const BaseFooter = glamorous.div('footer', fullWidth, {
  bottom: '0',
  height: footerHeight,
  backgroundImage: headerBackgroundImage
})

const Footer = () => (
  <BaseFooter>
    <LogoContainer>
      <P color="white" lineHeight={footerHeight} textAlign="center" fontSize="12px" margin="0">
        2018 POA Network. All rights reserved.
      </P>
      <Logo href="/" size="small" />
      <Socials />
    </LogoContainer>
  </BaseFooter>
)

export default Footer
