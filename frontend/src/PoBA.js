import React, { Component } from 'react'
import PlaidLink from 'react-plaid-link'
import axios from 'axios'
import contract from 'truffle-contract'
import pobaArtifact from './artifacts/PoBA.json' // eslint-disable-line import/no-unresolved
import Title from './ui/Title'
import Loading from './ui/Loading'
import plaidLinkButtonStyles from './ui/styles/plaidLinkButton'

const PobaContract = contract(pobaArtifact)

const getBankAccount = async (ethAccount, token) => {
  const result = await axios.post('/api/get-tx-data', {
    ethAccount,
    token
  })

  return result.data
}

const getTxData = async (web3, ethAccount, token) => {
  const { bankAccount, v, r, s } = await getBankAccount(ethAccount, token)

  return Promise.resolve({
    account: bankAccount,
    v,
    r,
    s
  })
}

class PoBA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  createProof = async token => {
    const { web3, account } = this.props

    PobaContract.setProvider(web3.currentProvider)

    const pobaContract = await PobaContract.deployed()

    this.setState({ loading: true })
    return getTxData(web3, account, token).then(txData => {
      pobaContract
        .register(txData.account, txData.v, txData.r, txData.s, {
          from: account
        })
        .finally(() => this.setState({ loading: false }))
    })
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

        <PlaidLink
          clientName="Your app name"
          env={process.env.REACT_APP_PLAID_ENV}
          institution={null}
          publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
          product={['auth']}
          onSuccess={this.createProof}
          className={plaidLinkButtonStyles}
          style={{}}
        >
          Register bank account
        </PlaidLink>
        <Loading show={this.state.loading} />
      </div>
    )
  }
}

export default PoBA
