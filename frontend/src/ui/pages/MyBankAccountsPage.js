import React, { Component } from 'react'
import { P } from 'glamorous'
import contract from 'truffle-contract'
import Loading from '../presentational/Loading'
import WithBackButton from './WithBackButton'
import VerifiedBankAccountsList from '../presentational/VerifiedBankAccountsList'
import { errorAlert } from '../presentational/alerts'
import pobaArtifact from '../../artifacts/PoBA.json'
// eslint-disable-line import/no-unresolved
const PobaContract = contract(pobaArtifact)

class MyBankAccountsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ethAccount: props.account,
      verifiedBankAccounts: [],
      loading: false
    }
    this.pobaContract = null

    this.getVerifiedBankAccounts = this.getVerifiedBankAccounts.bind(this)
  }

  async componentDidMount() {
    PobaContract.setProvider(this.props.web3.currentProvider)
    try {
      this.pobaContract = await PobaContract.deployed()
      await this.getVerifiedBankAccounts(this.state.ethAccount)
    } catch (e) {
      console.error('Contract is not deployed on this network', e)
      errorAlert('Contract is not deployed on this network')
    }
  }

  async removeBankAccount(bankAccount) {
    this.setState({ loading: true })
    try {
      // Default estimation of gas is too low, multiply it by 2
      const gasEstimate = await this.pobaContract.unregisterBankAccount.estimateGas(
        bankAccount.account,
        bankAccount.bankName,
        { from: this.state.ethAccount }
      )
      await this.pobaContract.unregisterBankAccount(bankAccount.account, bankAccount.bankName, {
        from: this.state.ethAccount,
        gas: gasEstimate * 2
      })
      await this.getVerifiedBankAccounts(this.state.ethAccount)
      this.setState({ loading: false })
    } catch (e) {
      this.setState({ loading: false })
      console.error('Error removing the verified bank account', e)
      errorAlert('Error removing the verified bank account')
    }
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
      const verifiedBankAccountsData = await Promise.all(promises)
      const verifiedBankAccounts = verifiedBankAccountsData.map(bankAccountData => ({
        account: bankAccountData[0],
        bankName: bankAccountData[1],
        verifiedDate: bankAccountData[2].toString()
      }))
      this.setState({ verifiedBankAccounts })
    } catch (e) {
      console.error(e)
      errorAlert('Error getting verified bank accounts')
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, verifiedBankAccounts } = this.state
    return (
      <div>
        <Loading show={loading} />
        {verifiedBankAccounts.length > 0 ? (
          <VerifiedBankAccountsList
            bankAccounts={verifiedBankAccounts}
            onClick={bankAccount => this.removeBankAccount(bankAccount)}
          />
        ) : (
          <P>Could not find bank accounts for the given address.</P>
        )}
      </div>
    )
  }
}

export default WithBackButton(MyBankAccountsPage)
