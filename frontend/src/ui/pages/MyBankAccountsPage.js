import React, { Component } from 'react'
import { P } from 'glamorous'
import contract from 'truffle-contract'
import Loading from '../presentational/Loading'
import BackButton from '../containers/BackButton'
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
        bankName: bankAccountData[1]
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
    const { verifiedBankAccounts } = this.state
    return (
      <div style={{ paddingTop: '20px' }}>
        <Loading show={this.state.loading} />
        {verifiedBankAccounts.length > 0 ? (
          <VerifiedBankAccountsList
            bankAccounts={verifiedBankAccounts}
            onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
          />
        ) : (
          <P>Could not find bank accounts for the given address.</P>
        )}
        <BackButton />
      </div>
    )
  }
}

export default MyBankAccountsPage
