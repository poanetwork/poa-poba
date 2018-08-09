import React, { Component } from 'react'
import axios from 'axios'
import contract from 'truffle-contract'
import Loading from '../presentational/Loading'
import BackButton from '../containers/BackButton'
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

const getSingleBankAccountDetails = async (token, accountId) => {
  const result = await axios.get(`/api/accounts/bank-accounts/${token}/${accountId}`)
  return result.data
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
      verifiedBankAccounts: [],
      loading: false
    }
    this.pobaContract = null

    this.fetchBankAccounts = this.fetchBankAccounts.bind(this)
    this.getVerifiedBankAccounts = this.getVerifiedBankAccounts.bind(this)
    this.getBankAccountDetails = this.getBankAccountDetails.bind(this)
  }

  async componentDidMount() {
    this.fetchBankAccounts(this.state.plaidToken)

    PobaContract.setProvider(this.props.web3.currentProvider)
    try {
      this.pobaContract = await PobaContract.deployed()
      const verifiedBankAccounts = await this.getVerifiedBankAccounts(this.state.ethAccount)
      this.setState({ verifiedBankAccounts })
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
    return getBankAccounts(token)
      .then(bankAccounts => {
        this.setState({ bankAccounts })
        const accountIdArray = bankAccounts.map(bankAccount => {
          return bankAccount.account_id
        })
        return this.getBankAccountDetails(accountIdArray)
      })
      .then(bankAccountDetailArray => {
        this.augmentAccountsToVerifyWithAccountDetails(bankAccountDetailArray)
      })
      .finally(() => this.setState({ loading: false }))
  }

  async getBankAccountDetails(accountIdArray) {
    try {
      const { plaidToken } = this.state
      const promises = accountIdArray.map(accountId =>
        getSingleBankAccountDetails(plaidToken, accountId)
      )
      const results = await Promise.all(promises)
      return results
    } catch (e) {
      console.error('Error getting bank account details', e)
      throw e
    }
  }

  augmentAccountsToVerifyWithAccountDetails(accountDetailArray) {
    const { bankAccounts } = this.state
    const accountDetailArrayAccountNumberArray = accountDetailArray.map(
      detail => detail.account.account
    )
    const augmentedBankAccounts = bankAccounts.map(bankAccount => {
      const index = accountDetailArrayAccountNumberArray.indexOf(bankAccount.account)
      const accountDetail = accountDetailArray[index]
      return Object.assign(bankAccount, {
        account: bankAccount.account,
        bankName: accountDetail.account.institution
      })
    })
    this.setState({ bankAccounts: augmentedBankAccounts })
  }

  async getVerifiedBankAccounts(ethAccount) {
    this.setState({ loading: true })
    try {
      const accountsLengthResult = await this.pobaContract.accountsLength(ethAccount)
      const accountsLength = accountsLengthResult.c[0]
      const promises = []
      for (let index = 0; index < accountsLength; index++) {
        promises.push(this.pobaContract.getBankAccounts(ethAccount, index))
      }
      const verifiedBankAccounts = await Promise.all(promises)
      console.log(verifiedBankAccounts)
      this.setState({ verifiedBankAccounts })
    } catch (e) {
      const errorMessage = 'Error getting veried bank accounts'
      console.error(errorMessage, e)
      errorAlert(errorMessage)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { bankAccounts, verifiedBankAccounts } = this.state
    return (
      <div>
        <BankAccountsList
          bankAccounts={bankAccounts}
          onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
        />
        <Loading show={this.state.loading} />
        {verifiedBankAccounts && verifiedBankAccounts.length ? (
          <pre>{JSON.stringify(verifiedBankAccounts)}</pre>
        ) : (
          <p>No verified accounts yet</p>
        )}
        <BackButton />
      </div>
    )
  }
}

export default BankAccountsPage
