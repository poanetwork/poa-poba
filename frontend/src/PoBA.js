import React, { Component } from 'react'
import PlaidLink from 'react-plaid-link'
import axios from 'axios'
import contract from 'truffle-contract'
import pobaArtifact from './artifacts/PoBA.json' // eslint-disable-line import/no-unresolved
import Title from './ui/Title'
import Loading from './ui/Loading'
import RegisteredAccountsList from './ui/RegisteredAccountsList'
import plaidLinkButtonStyles from './ui/styles/plaidLinkButton'
import BankAccountList from './ui/BankAccountList'
import { successAlert, errorAlert } from './alerts'

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

class PoBA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      token: null,
      bankAccounts: null,
      registeredAccounts: []
    }

    this.pobaContract = null
  }

  async componentDidMount() {
    const { web3, account } = this.props

    PobaContract.setProvider(web3.currentProvider)

    this.pobaContract = await PobaContract.deployed()

    const registeredAcountsCount = await this.pobaContract.accountsLength.call(account)

    const whenAccounts = []
    for (let i = 0; i < registeredAcountsCount; i++) {
      whenAccounts.push(this.pobaContract.accounts(account, i))
    }

    const registeredAccounts = await Promise.all(whenAccounts)

    this.setState({ registeredAccounts })
  }

  fetchBankAccounts = async token => {
    this.setState({ loading: true })

    return getBankAccounts(token)
      .then(bankAccounts => {
        this.setState({
          token,
          bankAccounts
        })
      }, e => {
        console.error('There was a problem getting the bank accounts', e)
        errorAlert('There was a problem getting the bank accounts')
      })
      .finally(() => this.setState({ loading: false }))
  }

  chooseBankAccount = async accountId => {
    const ethAccount = this.props.account
    const { token } = this.state

    this.setState({ loading: true })
    return getSignedBankAccount(accountId, ethAccount, token)
      .then(txData => {
        return this.pobaContract.register(
          txData.bankAccount.account,
          txData.bankAccount.institution,
          txData.v,
          txData.r,
          txData.s,
          {
            from: ethAccount
          }
        )
      })
      .then(
        () => successAlert(),
        e => {
          console.error('There was a problem registering the address', e)
          errorAlert()
        }
      )
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <div>
        <Title />

        <p>
          Turpis, fermentum a, aliquet quis, sodales at, dolor. Duis eget velit eget risus fringilla
          hendrerit. Nulla facilisi. Mauris turpis pede, aliquet ac, mattis sed, consequat in,
          massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Etiam egestas posuere metus. Aliquam erat volutpat. Donec non tortor. Vivamus posuere
          nisi mollis dolor. Quisque porttitor nisi ac elit. Nullam tincidunt ligula vitae nulla.
        </p>

        {this.state.bankAccounts === null ? (
          <div>
            <PlaidLink
              clientName="Your app name"
              env={process.env.REACT_APP_PLAID_ENV}
              institution={null}
              publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
              product={['auth']}
              onSuccess={this.fetchBankAccounts}
              className={plaidLinkButtonStyles}
              style={{}}
            >
              Register bank account
            </PlaidLink>

            <RegisteredAccountsList accounts={this.state.registeredAccounts} />
          </div>
        ) : (
          <BankAccountList
            bankAccounts={this.state.bankAccounts}
            onClick={bankAccount => this.chooseBankAccount(bankAccount.account_id)}
          />
        )}

        <Loading show={this.state.loading} />
      </div>
    )
  }
}

export default PoBA
