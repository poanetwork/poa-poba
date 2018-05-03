import React from 'react'
import Web3Provider from './Web3Provider'
import PoBA from './PoBA'
import './App.css'

const App = () => (
  <div className="App">
    <Web3Provider
      render={({ web3, accounts }) => {
        if (!web3) {
          return <div>No web3</div>
        }
        if (!accounts || accounts.length === 0) {
          return <div>No unlocked account</div>
        }

        return <PoBA web3={web3} account={accounts[0]} />
      }}
    />
  </div>
)

export default App
