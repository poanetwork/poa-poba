import React, { Component } from 'react'
import axios from 'axios'
import contract from 'truffle-contract'
import BankAccountsList from '../presentational/BankAccountsList'
import { successAlert, errorAlert } from '../presentational/alerts'
import pobaArtifact from '../../artifacts/PoBA.json'
// eslint-disable-line import/no-unresolved
const PobaContract = contract(pobaArtifact)

const getBankAccounts = async token => {
  const result = await axios.get(`/api/accounts/bank-accounts/${token}`)
  const { ach, eft } = result.data.accounts.numbers
  return [...ach, ...eft]
}

const getSignedBankAccount = async (accountId, ethAccount, token) => {
  const result = await axios.post('/api/accounts/sign-account', {
    accountId,
    ethAccount,
    token
  })

  return result.data
}

class BankAccountsPage extends Component {
  constructor(props) {
    super(props)

    const plaidToken = props.props.match.params.token
    this.state = {
      ethAccount: props.account,
      plaidToken,
      bankAccounts: [],
      loading: true
    }
    this.fetchBankAccounts = this.fetchBankAccounts.bind(this)
    this.pobaContract = null
  }

  async componentDidMount() {
    this.fetchBankAccounts(this.state.plaidToken)

    PobaContract.setProvider(this.props.web3.currentProvider)
    try {
      this.pobaContract = await PobaContract.deployed()
    } catch (e) {
      console.error('Contract is not deployed on this network', e)
      errorAlert('Contract is not deployed on this network')
    }
  }

  async chooseBankAccount(accountId) {
    // @TODO: set loading status
    try {
      const { plaidToken, ethAccount } = this.state
      const txData = await getSignedBankAccount(accountId, ethAccount, plaidToken)
      this.pobaContract.register(
        txData.bankAccount.account,
        txData.bankAccount.institution,
        txData.v,
        txData.r,
        txData.s,
        { from: ethAccount }
      )
      successAlert()
    } catch (e) {
      console.error('There was a problem registering the address', e)
      errorAlert()
    } finally {
      // @TODO: unset loading status
    }
  }

  async fetchBankAccounts(token) {
    return getBankAccounts(token).then(bankAccounts => {
      this.setState({ bankAccounts })
    })
  }

  render() {
    const { bankAccounts } = this.state
    return (
      <BankAccountsList
        bankAccounts={bankAccounts}
        onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
      />
    )
  }
}

export default BankAccountsPage
