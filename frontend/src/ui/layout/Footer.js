import React from 'react'
import glamorous from 'glamorous'
import Socials from './Socials'
import { footerStyles, footerTextStyles } from '../styles/layout'

const FooterWrapper = glamorous.footer('footer', footerStyles)
const FooterText = glamorous.p('rights-reserved', footerTextStyles)

const Footer = () => (
  <FooterWrapper>
    <FooterText>2018 POA Network. All rights reserved.</FooterText>
    <Socials />
  </FooterWrapper>
)

export default Footer
