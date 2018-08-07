import React from 'react'
import glamorous, { P } from 'glamorous'
import LogoContainer from './LogoContainer'
import Socials from './Socials'
import { footerHeight } from '../styles/constants'

const BaseFooter = glamorous.div('footer', {
  bottom: '0',
  height: footerHeight
})

const Footer = () => (
  <BaseFooter>
    <LogoContainer>
      <P color="#5c34a2" lineHeight={footerHeight} textAlign="left" fontSize="12px" margin="0">
        2018 POA Network. All rights reserved.
      </P>
      <Socials />
    </LogoContainer>
  </BaseFooter>
)

export default Footer
