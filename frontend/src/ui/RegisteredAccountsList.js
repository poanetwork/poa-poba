import React from 'react'
import { Div } from 'glamorous'

const getRegisteredBankAccounts = async () => {
  try {
    this.pobaContract = await PobaContract.deployed()

    const registeredAccountsCount = await this.pobaContract.accountsLength.call(account)

    const whenAccounts = []
    for (let i = 0; i < registeredAccountsCount; i++) {
      whenAccounts.push(this.pobaContract.getBankAccounts(account, i))
    }

    const response = await Promise.all(whenAccounts)
    const registeredAccounts = response.map(account => {
      return [
        account[0],
        account[1],
        account[2].toString()
      ]
    })

    this.setState({ registeredAccounts })
  } catch (e) {
    console.error('Contract is not deployed on this network', e)
    errorAlert('Contract is not deployed on this network')
  }
}

const RegisteredAccountsList = ({ accounts }) =>
  accounts.length ? (
    <Div className="registered-accounts-list" textAlign="left" marginTop="1em">
      You have {accounts.length} registered account{accounts.length > 1 ? 's' : ''}:
      <ul>{accounts.map((account, index) => <li key={index}>{account}</li>)}</ul>
    </Div>
  ) : null

export default RegisteredAccountsList
