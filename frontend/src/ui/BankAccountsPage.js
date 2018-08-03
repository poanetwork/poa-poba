import React, { Component } from 'react'
import axios from 'axios'

const getBankAccounts = async token => {
  const result = await axios.get(`/api/accounts/bank-accounts/${token}`)
  const { ach, eft } = result.data.accounts.numbers
  return [...ach, ...eft]
}

class BankAccountsPage extends Component {
  constructor(props) {
    super(props)

    const plaidToken = props.props.match.params.token
    this.state = {
      plaidToken,
      bankAccounts: []
    }
    this.fetchBankAccounts = this.fetchBankAccounts.bind(this)
  }

  componentDidMount() {
    this.fetchBankAccounts(this.state.plaidToken)
  }

  async fetchBankAccounts(token) {
    return getBankAccounts(token).then(bankAccounts => {
      this.setState({ bankAccounts })
    })
  }

  render() {
    const { bankAccounts } = this.state
    return <pre>{JSON.stringify(bankAccounts)}</pre>
  }
}

export default BankAccountsPage
