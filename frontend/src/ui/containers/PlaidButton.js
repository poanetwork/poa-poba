import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import glamorous from 'glamorous'
import PlaidLink from 'react-plaid-link'
import { setPlaidToken } from '../context/PlaidAuthData'
import align from '../styles/align'
import { plaidButtonStyles, plaidLinkWrapperStyles } from '../styles/button'
import { rightArrowIconStyles } from '../styles/icons'

const RightArrowIcon = glamorous.i(rightArrowIconStyles, align.iconRight)
// React-plaid-link wraps its <button> in a div with display:block
// the wrapper allows us to style accordingly and make it responsive
const PlaidLinkWrapper = glamorous.span('plaid-link-wrapper', plaidLinkWrapperStyles)

class PlaidButton extends Component {
  constructor() {
    super()
    this.state = { plaidToken: null }
    this.setPlaidToken = this.setPlaidToken.bind(this)
  }

  setPlaidToken(plaidToken) {
    setPlaidToken(plaidToken)
    this.setState({ plaidToken })
  }

  render() {
    const { plaidToken } = this.state
    const bankAccountsListState = { pathname: '/bankaccountslist' }

    // Redirect to list of bank accounts after successful plaid token fetch
    return plaidToken ? (
      <Redirect to={bankAccountsListState} />
    ) : (
      <PlaidLinkWrapper>
        <PlaidLink
          clientName="Proof of Bank Account"
          env={process.env.REACT_APP_PLAID_ENV}
          institution={null}
          publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
          product={['auth']}
          onSuccess={this.setPlaidToken}
          style={plaidButtonStyles}
        >
          Continue <RightArrowIcon />
        </PlaidLink>
      </PlaidLinkWrapper>
    )
  }
}

export default PlaidButton
