import React from 'react'
import { Link } from 'react-router-dom'
import glamorous, { P } from 'glamorous'
import PlaidButton from '../containers/PlaidButton'
import { responsiveButtonStyles } from '../styles/button'
import align from '../styles/align'
import { howItWorksIconStyles, myAccountsIconStyles } from '../styles/icons'
import { breakpoints } from '../styles/constants'

const HowItWorksIcon = glamorous.i(howItWorksIconStyles, align.iconRight)
const MyAccountsIcon = glamorous.i(myAccountsIconStyles, align.iconRight)
const ResponsiveButton = glamorous.button(responsiveButtonStyles)

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
const ResponsiveH2 = glamorous.h2({
  [`@media(min-width: ${breakpoints.md})`]: {
    marginTop: '70px'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    fontSize: '20px',
    marginTop: '40px'
  }
})

const IndexPage = () => (
  <div>
    <ResponsiveH1>Proof of bank account</ResponsiveH1>
    <P className="main">
      This ĐApp can be used to prove your ownership of a bank account in one of the supported banks.
      A widget provided by <a href="https://plaid.com/">Plaid</a> is used to verify that you have
      access to the bank account. Except for blockchain transaction fee to call the smart-contract,
      there is no extra cost of the verifiaction process. If you have more questions, check out{' '}
      <strong>How it works</strong> section.
    </P>
    <Link to="/help">
      <ResponsiveButton>
        How it works <HowItWorksIcon />
      </ResponsiveButton>
    </Link>
    <PlaidButton />

    <ResponsiveH2>My bank accounts</ResponsiveH2>
    <P>To view the list of your verified bank accounts click the button below.</P>
    <Link to="/mybankaccountslist">
      <ResponsiveButton>
        My Bank Accounts <MyAccountsIcon />
      </ResponsiveButton>
    </Link>
  </div>
)

export default IndexPage
