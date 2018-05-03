import React, { Component } from 'react'
import contract from 'truffle-contract'

import './App.css'
import pobaArtifact from './artifacts/PoBA.json'

const PobaContract = contract(pobaArtifact)

const privateKey = '0xf90694599bc18262b670fcaf51d79d907293f9522eb83bdc695ae42b5aed5096'

const getTxData = (web3, ethAccount, bankAccount) => {
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
  createProof = async () => {
    const { web3, account } = this.props

    PobaContract.setProvider(web3.currentProvider)

    const pobaContract = await PobaContract.deployed()

    return getTxData(web3, account, 'account').then(txData => {
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

        <button onClick={this.createProof}>New proof</button>
      </div>
    )
  }
}

export default PoBA
