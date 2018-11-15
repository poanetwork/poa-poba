import React from 'react'
import glamorous, { P } from 'glamorous'
import WithBackButton from './WithBackButton'
import { breakpoints } from '../styles/constants'

// @TODO: glamour does not support setting media queries globally
// https://github.com/threepointone/glamor/issues/333
const ResponsiveH1 = glamorous.h1({
  [`@media(min-width: ${breakpoints.md})`]: {
    fontSize: '36px',
    paddingTop: '100px'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    fontSize: '26px',
    paddingTop: '30px',
    lineHeight: '48px'
  }
})

const HelpPage = () => {
  return (
    <div className="help-page">
      <ResponsiveH1>How it works?</ResponsiveH1>
      <P>
        <strong>Step 1: Connect Bank Account</strong>
        <br />
        Choose the Bank and complete the form with your username and password
      </P>
      <P>
        <strong>Step 2: Choose the bank account</strong>
        <br />
        Choose one of your bank accounts to verify
      </P>
      <P>
        <strong>Step 3: Sign transaction & Finalize proof</strong>
        <br />
        Sign transaction in your Wallet to add your data to smart contract
      </P>
    </div>
  )
}

export default WithBackButton(HelpPage)
