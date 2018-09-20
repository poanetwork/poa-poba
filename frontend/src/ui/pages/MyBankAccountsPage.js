import React from 'react'
import WithBackButton from './WithBackButton'
import MyBankAccounts from '../containers/MyBankAccounts'
import getInstance from '../../PoBAContract'

function generateGetPoBAContract(web3) {
  return async () => getInstance(web3.currentProvider)
}

export const MyBankAccountsContainer = props => {
  const myBankAccountProps = {
    account: props.account,
    getPoBAContract: generateGetPoBAContract(props.web3)
  }
  return <MyBankAccounts {...myBankAccountProps} />
}

export default WithBackButton(MyBankAccountsContainer)
