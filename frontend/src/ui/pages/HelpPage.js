import React from 'react'
import { H1, P } from 'glamorous'

import BackButton from '../containers/BackButton'

const HelpPage = () => {
  return (
    <div>
      <H1>How it works?</H1>
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
        Sign transaction in MetaMask to add your data to smart contract
      </P>
      <BackButton />
    </div>
  )
}

export default HelpPage
