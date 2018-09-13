import React from 'react'
import { H1, P } from 'glamorous'
import WithBackButton from './WithBackButton'

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
        Sign transaction in your Wallet to add your data to smart contract
      </P>
    </div>
  )
}

export default WithBackButton(HelpPage)
