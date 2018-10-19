import React from 'react'
import { Link } from 'react-router-dom'
import glamorous, { P, H1, H2 } from 'glamorous'
import PlaidButton from '../containers/PlaidButton'
import buttonStyle from '../styles/button'
import align from '../styles/align'
import { howItWorksIconStyles, myAccountsIconStyles } from '../styles/icons'

const HowItWorksIcon = glamorous.i(howItWorksIconStyles, align.iconRight)
const MyAccountsIcon = glamorous.i(myAccountsIconStyles, align.iconRight)

const IndexPage = () => (
  <div>
    <H1>Proof of bank account</H1>
    <P className="main">
      This ĐApp can be used to prove your ownership of a bank account in one of the supported banks.
      A widget provided by <a href="https://plaid.com/">Plaid</a> is used to verify that you have
      access to the bank account. Except for blockchain transaction fee to call the smart-contract,
      there is no extra cost of the verifiaction process. If you have more questions, check out{' '}
      <strong>How it works</strong> section.
    </P>
    <Link to="/help">
      <button style={buttonStyle}>
        How it works <HowItWorksIcon />
      </button>
    </Link>
    <PlaidButton />

    <H2>My bank accounts</H2>
    <P>To view the list of your verified bank accounts click the button below.</P>
    <Link to="/mybankaccountslist">
      <button style={buttonStyle}>
        My Bank Accounts <MyAccountsIcon />
      </button>
    </Link>
  </div>
)

export default IndexPage
