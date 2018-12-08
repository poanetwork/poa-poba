import React, { Component } from 'react'
import { P } from 'glamorous'
import Loading from '../presentational/Loading'
import PlaidBankAccountsList from '../presentational/PlaidBankAccountsList'
import { errorAlert, successAlert } from '../presentational/alerts'

const ERROR_MSG_CONTRACT_NOT_DEPLOYED = 'Contract is not deployed on this network'
const ERROR_MSG_VERIFYING_BANK_ACCOUNT = 'There was a problem verifying the the bank account'

class PlaidBankAccounts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ethAccount: props.account,
      plaidToken: props.plaidToken,
      bankAccounts: null,
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
        await this.fetchBankAccounts(this.state.plaidToken)
        successAlert()
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
    const bankAccounts = []

    try {
      const accountsOfSelectedBank = await this.PoBAServer.getBankAccounts(token)
      const verifiedBankAccounts = await this.PoBAContract.getVerifiedBankAccounts(
        this.state.ethAccount
      )
      if (accountsOfSelectedBank.length > 0) {
        const bankAccount = accountsOfSelectedBank[0]
        const selectedBankName = bankAccount.institution
        const verified = verifiedBankAccounts.some(verifiedBankAccount => {
          return verifiedBankAccount[1] === selectedBankName
        })
        bankAccounts.push(Object.assign({ verified }, bankAccount))
      }
    } catch (e) {
      console.error(ERROR_MSG_VERIFYING_BANK_ACCOUNT, e)
      errorAlert(ERROR_MSG_VERIFYING_BANK_ACCOUNT)
    } finally {
      this.setState({
        loading: false,
        bankAccounts
      })
    }
  }

  render() {
    const { loading, bankAccounts } = this.state
    const content =
      bankAccounts && bankAccounts.length > 0 ? (
        <PlaidBankAccountsList
          bankAccounts={bankAccounts}
          onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
        />
      ) : (
        <P>
          Plaid's API returned no bank accounts.
          <br />
          Please go back to the home page, repeat the process and select a different bank when
          prompted with Plaid's login form.
        </P>
      )
    return (
      <div className="bank-accounts-page">
        <Loading show={loading} />
        {loading ? null : content}
      </div>
    )
  }
}

export default PlaidBankAccounts
