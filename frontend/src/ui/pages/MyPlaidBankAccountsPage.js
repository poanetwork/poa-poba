import React from 'react'
import WithBackButton from './WithBackButton'
import { PlaidContextConsumer } from '../context/PlaidContext'
import PlaidBankAccounts from '../containers/PlaidBankAccounts'
import getInstance from '../../PoBAContract'
import { getBankAccounts, getSignedBankAccount } from '../../PoBAServer'

function generateGetPoBAContract(web3) {
  return async () => getInstance(web3.currentProvider)
}

export const MyPlaidAccountsContainer = ({ account, web3, plaidToken }) => {
  const PoBAServer = {
    getBankAccounts,
    getSignedBankAccount
  }
  const plaidBankAccountsProps = {
    getPoBAContract: generateGetPoBAContract(web3),
    account,
    PoBAServer,
    plaidToken
  }
  return <PlaidBankAccounts {...plaidBankAccountsProps} />
}

export const MyPlaidContextAccountsContainer = props => {
  return (
    <PlaidContextConsumer>
      {plaidContext => {
        const propsWithPlaidToken = {
          ...props,
          plaidToken: plaidContext.getPlaidToken()
        }
        return <MyPlaidAccountsContainer {...propsWithPlaidToken} />
      }}
    </PlaidContextConsumer>
  )
}

const MyPlaidAccountsPage = WithBackButton(MyPlaidContextAccountsContainer)

export default MyPlaidAccountsPage
