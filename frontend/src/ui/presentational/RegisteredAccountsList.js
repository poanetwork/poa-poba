import React from 'react'
import { Div } from 'glamorous'

// @TODO: should be used to render the component below
// const getRegisteredBankAccounts = async account => {
//   PobaContract.setProvider(this.props.web3.currentProvider)
//   try {
//     const pobaContract = await PobaContract.deployed()
//
//     const registeredAccountsCount = await pobaContract.accountsLength.call(account)
//
//     const whenAccounts = []
//     for (let i = 0; i < registeredAccountsCount; i++) {
//       whenAccounts.push(pobaContract.getBankAccounts(account, i))
//     }
//
//     const response = await Promise.all(whenAccounts)
//     const registeredAccounts = response.map(acc => {
//       return [acc[0], acc[1], acc[2].toString()]
//     })
//
//     this.setState({ registeredAccounts })
//   } catch (e) {
//     console.error('Contract is not deployed on this network', e)
//     errorAlert('Contract is not deployed on this network')
//   }
// }

const RegisteredAccountsList = ({ accounts }) =>
  accounts.length ? (
    <Div className="registered-accounts-list" textAlign="left" marginTop="1em">
      You have {accounts.length} registered account
      {accounts.length > 1 ? 's' : ''}:
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>{account}</li>
        ))}
      </ul>
    </Div>
  ) : null

export default RegisteredAccountsList
