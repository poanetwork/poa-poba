import React from 'react'
import { getPlaidToken } from '../context/PlaidAuthData'
import WithBackButton from './WithBackButton'
import PlaidBankAccounts from '../containers/PlaidBankAccounts'
import getInstance from '../../PoBAContract'
import { getBankAccounts, getSignedBankAccount } from '../../PoBAServer'

function generateGetPoBAContract(web3) {
  return async () => getInstance(web3.currentProvider)
}

export const MyPlaidAccountsContainer = props => {
  const plaidToken = getPlaidToken()
  const PoBAServer = {
    getBankAccounts,
    getSignedBankAccount
  }
  const plaidBankAccountsProps = {
    account: props.account,
    getPoBAContract: generateGetPoBAContract(props.web3),
    PoBAServer,
    plaidToken
  }
  return <PlaidBankAccounts {...plaidBankAccountsProps} />
}

const MyPlaidAccountsPage = WithBackButton(MyPlaidAccountsContainer)

export default MyPlaidAccountsPage
