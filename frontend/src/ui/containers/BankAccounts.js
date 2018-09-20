import React, { Component } from 'react'
import Loading from '../presentational/Loading'
import BankAccountsList from '../presentational/BankAccountsList'
import { errorAlert, successAlert } from '../presentational/alerts'

const ERROR_MSG_CONTRACT_NOT_DEPLOYED = 'Contract is not deployed on this network'
const ERROR_MSG_VERIFYING_BANK_ACCOUNT = 'There was a problem verifying the the bank account'

class BankAccounts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ethAccount: props.account,
      plaidToken: props.plaidToken,
      bankAccounts: [],
      loading: false
    }
    this.PoBAServer = this.props.PoBAServer

    this.fetchBankAccounts = this.fetchBankAccounts.bind(this)
  }

  async componentDidMount() {
    try {
      this.PoBAContract = await this.props.getPoBAContract()
      await this.fetchBankAccounts(this.state.plaidToken)
    } catch (e) {
      console.error(ERROR_MSG_CONTRACT_NOT_DEPLOYED, e)
      errorAlert(ERROR_MSG_CONTRACT_NOT_DEPLOYED)
    }
  }

  async chooseBankAccount(accountId) {
    this.setState({ loading: true })
    try {
      const { plaidToken, ethAccount } = this.state
      const txData = await this.PoBAServer.getSignedBankAccount(accountId, ethAccount, plaidToken)
      const registerResult = await this.PoBAContract.registerBankAccount(txData, ethAccount)
      if (registerResult) {
        successAlert()
        // @TODO: set flag in bankAccount to signal that it is verified
        // this.getVerifiedBankAccounts(this.state.ethAccount)
      } else {
        throw new Error(ERROR_MSG_VERIFYING_BANK_ACCOUNT)
      }
    } catch (e) {
      console.error(ERROR_MSG_VERIFYING_BANK_ACCOUNT, e)
      errorAlert(ERROR_MSG_VERIFYING_BANK_ACCOUNT)
    } finally {
      this.setState({ loading: false })
    }
  }

  async fetchBankAccounts(token) {
    this.setState({ loading: true })
    const accounts = await this.PoBAServer.getBankAccounts(token)
    const verifiedBankAccounts = await this.PoBAContract.getVerifiedBankAccounts(
      this.state.ethAccount
    )
    const verifiedBankAccountsNumbers = verifiedBankAccounts.map(account => account[0])
    const bankAccounts = accounts.map(account => {
      const verified = !!verifiedBankAccountsNumbers.includes(account.account)
      return Object.assign({ verified }, account)
    })
    this.setState({
      loading: false,
      bankAccounts
    })
  }

  render() {
    const { loading, bankAccounts } = this.state
    return (
      <div className="bank-accounts-page">
        <Loading show={loading} />
        <BankAccountsList
          bankAccounts={bankAccounts}
          onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
        />
      </div>
    )
  }
}

export default BankAccounts
