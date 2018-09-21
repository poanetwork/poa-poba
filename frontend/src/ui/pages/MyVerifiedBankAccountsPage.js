import React from 'react'
import WithBackButton from './WithBackButton'
import VerifiedBankAccounts from '../containers/VerifiedBankAccounts'
import getInstance from '../../PoBAContract'

function generateGetPoBAContract(web3) {
  return async () => getInstance(web3.currentProvider)
}

export const MyVerifiedBankAccounts = props => {
  const verifiedBankAccountsProps = {
    account: props.account,
    getPoBAContract: generateGetPoBAContract(props.web3)
  }
  return <VerifiedBankAccounts {...verifiedBankAccountsProps} />
}

const MyVerifiedBankAccountsPage = WithBackButton(MyVerifiedBankAccounts)

export default MyVerifiedBankAccountsPage
