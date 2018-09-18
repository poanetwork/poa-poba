import React, { Component } from 'react'
import axios from 'axios'
import contract from 'truffle-contract'
import Loading from '../presentational/Loading'
import WithBackButton from './WithBackButton'
import BankAccountsList from '../presentational/BankAccountsList'
import { errorAlert, successAlert } from '../presentational/alerts'
import pobaArtifact from '../../artifacts/PoBA.json'
// eslint-disable-line import/no-unresolved
const PobaContract = contract(pobaArtifact)

const getBankAccounts = async token => {
  const result = await axios.get(`/api/accounts/bank-accounts/${token}`)
  const { ach, eft } = result.data.accounts.numbers
  const { institution } = result.data.accounts.item.institution
  const accounts = [...ach, ...eft]
  return accounts.map(account => Object.assign({ institution: institution.name }, account))
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
      loading: false
    }
    this.pobaContract = null

    this.fetchBankAccounts = this.fetchBankAccounts.bind(this)
    this.getVerifiedBankAccounts = this.getVerifiedBankAccounts.bind(this)
  }

  async componentDidMount() {
    PobaContract.setProvider(this.props.web3.currentProvider)
    try {
      this.pobaContract = await PobaContract.deployed()
      await this.fetchBankAccounts(this.state.plaidToken)
    } catch (e) {
      console.error('Contract is not deployed on this network', e)
      errorAlert('Contract is not deployed on this network')
    }
  }

  async chooseBankAccount(accountId) {
    const errorMessage = 'There was a problem verifying the the bank account'

    this.setState({ loading: true })
    try {
      const { plaidToken, ethAccount } = this.state
      const txData = await getSignedBankAccount(accountId, ethAccount, plaidToken)
      const registerResult = await this.pobaContract.register(
        txData.bankAccount.account,
        txData.bankAccount.institution,
        txData.identityNames,
        txData.v,
        txData.r,
        txData.s,
        { from: ethAccount }
      )
      if (registerResult) {
        this.getVerifiedBankAccounts(this.state.ethAccount)
        successAlert()
        // @TODO: set flag in bankAccount to signal that it is verified
      } else {
        throw new Error(errorMessage)
      }
    } catch (e) {
      console.error(errorMessage, e)
      errorAlert(errorMessage)
    } finally {
      this.setState({ loading: false })
    }
  }

  async fetchBankAccounts(token) {
    this.setState({ loading: true })
    const accounts = await getBankAccounts(token)
    const verifiedBankAccounts = await this.getVerifiedBankAccounts(this.state.ethAccount)
    const verifiedBankAccountsNumbers = verifiedBankAccounts.map(account => account[0])
    const bankAccounts = accounts.map(account => {
      const verified = !!verifiedBankAccountsNumbers.includes(account.account)
      return Object.assign({ verified }, account)
    })
    this.setState({ bankAccounts })
    this.setState({ loading: false })
  }

  // eslint-disable-next-line consistent-return
  async getVerifiedBankAccounts(ethAccount) {
    try {
      const accountsLengthResult = await this.pobaContract.accountsLength(ethAccount)
      const accountsLength = accountsLengthResult.c[0]
      const promises = []
      for (let index = 0; index < accountsLength; index++) {
        promises.push(this.pobaContract.getBankAccounts(ethAccount, index))
      }
      return Promise.all(promises)
    } catch (e) {
      const errorMessage = 'Error getting verified bank accounts'
      console.error(errorMessage, e)
      errorAlert(errorMessage)
    }
  }

  render() {
    const { loading, bankAccounts } = this.state
    return (
      <div>
        <Loading show={loading} />
        <BankAccountsList
          bankAccounts={bankAccounts}
          onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
        />
      </div>
    )
  }
}

export default WithBackButton(BankAccountsPage)
