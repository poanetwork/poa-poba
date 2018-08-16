import React from 'react'
import glamorous from 'glamorous'
import Socials from './Socials'
import { footerStyles, footerTextStyles } from '../styles/layout'

const FooterWrapper = glamorous.footer('footer', footerStyles)

const Footer = () => (
  <FooterWrapper>
    <p className="rights-reserved" style={footerTextStyles}>
      2018 POA Network. All rights reserved.
    </p>
    <Socials />
  </FooterWrapper>
)

export default Footer
