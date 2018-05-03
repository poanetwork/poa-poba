import React, { Component } from 'react'
import './App.css'
import contract from 'truffle-contract'
import pobaArtifact from './artifacts/PoBA'
import PlaidLink from 'react-plaid-link'

const PobaContract = contract(pobaArtifact)

const privateKey = '0xa5cea1fcd2258b3e7b3d8666f36c7ff19c8dc60b198d01f491037290afbc06ef'

const getBankAccount = (ethAccount, token) => Promise.resolve('MyAccount')

const getTxData = async (web3, ethAccount, token) => {
  const bankAccount = await getBankAccount(ethAccount, token)

  const hash = web3.utils.sha3(ethAccount + Buffer.from(bankAccount).toString('hex'))
  const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)

  return Promise.resolve({
    account: bankAccount,
    v,
    r,
    s
  })
}

class PoBA extends Component {
  createProof = async token => {
    const { web3, account } = this.props

    PobaContract.setProvider(web3.currentProvider)

    const pobaContract = await PobaContract.deployed()

    return getTxData(web3, account, token).then(txData => {
      pobaContract.register(txData.account, txData.v, txData.r, txData.s, {
        from: account
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Proof of bank account</h1>

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
        >
          Create
        </PlaidLink>
      </div>
    )
  }
}

export default PoBA
