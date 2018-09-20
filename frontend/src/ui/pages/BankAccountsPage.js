import React from 'react'
import WithBackButton from './WithBackButton'
import BankAccounts from '../containers/BankAccounts'
import getInstance from '../../PoBAContract'
import { getBankAccounts, getSignedBankAccount } from '../../PoBAServer'

function generateGetPoBAContract(web3) {
  return async () => getInstance(web3.currentProvider)
}

export const BankAccountsContainer = props => {
  const plaidToken = props.props.match.params.token
  const PoBAServer = {
    getBankAccounts,
    getSignedBankAccount
  }
  const bankAccountProps = {
    account: props.account,
    getPoBAContract: generateGetPoBAContract(props.web3),
    PoBAServer,
    plaidToken
  }
  return <BankAccounts {...bankAccountProps} />
}

export default WithBackButton(BankAccountsContainer)
