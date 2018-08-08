import React from 'react'
import { H1, P } from 'glamorous'

import BackButton from '../containers/BackButton'

const HelpPage = () => {
  return (
    <div>
      <div>
        <H1>How it works?</H1>
        <div>
          <div>
            <div>
              <P style={{fontWeight: 'bold'}}>
                <span>Step 1: </span>
                Connect Bank Account
              </P>
              <P>Choose the Bank and complete the form with your username and password</P>
            </div>
            <div>
              <P style={{fontWeight: 'bold'}}>
                <span>Step 2: </span>
                Choose the bank account
              </P>
              <P>Choose one of your bank accounts to verify</P>
            </div>
            <div>
              <P style={{fontWeight: 'bold'}}>
                <span>Step 3: </span>
                Sign transaction & Finalize proof
              </P>
              <P>Sign transaction in MetaMask to add your data to smart contract</P>
            </div>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  )
}

export default HelpPage
