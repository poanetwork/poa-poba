import React, { Component } from 'react'
import Loading from '../presentational/Loading'
import VerifiedBankAccountsList from '../presentational/VerifiedBankAccountsList'
import { errorAlert } from '../presentational/alerts'

const ERROR_MSG_CONTRACT_NOT_DEPLOYED = 'Contract is not deployed on this network'
const ERROR_MSG_REMOVE_BANK_ACCOUNT = 'Error removing the verified bank account'
const ERROR_MSG_GET_BANK_ACCOUNTS = 'Error getting verified bank accounts'

class VerifiedBankAccounts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ethAccount: props.account,
      verifiedBankAccounts: [],
      loading: false
    }

    this.getVerifiedBankAccounts = this.getVerifiedBankAccounts.bind(this)
  }

  async componentDidMount() {
    try {
      this.PoBAContract = await this.props.getPoBAContract()
      await this.getVerifiedBankAccounts(this.state.ethAccount)
    } catch (e) {
      console.error(ERROR_MSG_CONTRACT_NOT_DEPLOYED, e)
      errorAlert(ERROR_MSG_CONTRACT_NOT_DEPLOYED)
    }
  }

  async removeBankAccount(bankAccount) {
    this.setState({ loading: true })
    try {
      const walletAddress = this.state.ethAccount
      await this.PoBAContract.unregisterBankAccount(bankAccount, walletAddress)
      await this.getVerifiedBankAccounts(walletAddress)
    } catch (e) {
      errorAlert(ERROR_MSG_REMOVE_BANK_ACCOUNT)
      console.error(ERROR_MSG_REMOVE_BANK_ACCOUNT, e)
    } finally {
      this.setState({ loading: false })
    }
  }

  async getVerifiedBankAccounts(ethAccount) {
    this.setState({ loading: true })
    try {
      const verifiedBankAccountsData = await this.PoBAContract.getVerifiedBankAccounts(ethAccount)
      const verifiedBankAccounts = verifiedBankAccountsData.map(bankAccountData => ({
        bankName: bankAccountData[0],
        identityNames: bankAccountData[1].toString(),
        verifiedDate: bankAccountData[2].toString()
      }))
      this.setState({ verifiedBankAccounts })
    } catch (e) {
      errorAlert(ERROR_MSG_GET_BANK_ACCOUNTS)
      console.error(ERROR_MSG_GET_BANK_ACCOUNTS, e)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, verifiedBankAccounts } = this.state
    const content =
      verifiedBankAccounts.length > 0 ? (
        <VerifiedBankAccountsList
          bankAccounts={verifiedBankAccounts}
          onClick={bankAccount => this.removeBankAccount(bankAccount)}
        />
      ) : (
        <p className="no-results">Could not find bank accounts for the given address.</p>
      )
    return (
      <div>
        <Loading show={loading} />
        {loading ? null : content}
      </div>
    )
  }
}

export default VerifiedBankAccounts
