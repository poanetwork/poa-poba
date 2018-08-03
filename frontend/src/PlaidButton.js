import React, { Component } from 'react'
import PlaidLink from 'react-plaid-link'
import axios from 'axios'
import plaidLinkButtonStyles from './ui/styles/plaidLinkButton'

const getBankAccounts = async token => {
  const result = await axios.get(`/api/accounts/bank-accounts/${token}`)
  const { ach, eft } = result.data.accounts.numbers
  return [...ach, ...eft]
}

class PlaidButton extends Component {
  fetchBankAccounts = async token => {
    return getBankAccounts(token)
      .then(bankAccounts => {
        console.log('token', token)
        console.log('bankAccounts', bankAccounts)
        console.log('se termino, y debe redirigir')
      })
  }

  render() {
    return (
      <PlaidLink
        clientName="Proof of Bank Account"
        env={process.env.REACT_APP_PLAID_ENV}
        institution={null}
        publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
        product={['auth']}
        onSuccess={this.fetchBankAccounts}
        className={plaidLinkButtonStyles}
        style={{
          width: '200px',
          height: '44px',
          'border-radius': '5px',
          'background-color': '#5c34a2',
          'box-shadow': '0px 5px 10px 0 rgba(92, 52, 162, 0.3)',
          'font-family': 'Nunito',
          'font-size': '16px',
          'font-weight': 'normal',
          'font-style': 'normal',
          'text-transform': 'none',
          'font-stretch': 'normal',
          'line-height': '44px',
          'letter-spacing': 'normal',
          'text-align': 'left',
          'margin-left': '30px',
          color: '#ffffff'
        }}
      >
        Continue <span style={{float: 'right', lineHeight: '42px'}}><i className="fa fa-arrow-right"></i></span>
      </PlaidLink>
    )
  }
}

export default PlaidButton
