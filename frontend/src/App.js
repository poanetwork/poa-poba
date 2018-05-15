import React from 'react'
import Header from './ui/Header'
import Footer from './ui/Footer'
import Main from './ui/Main'
import Web3Provider from './Web3Provider'
import PoBA from './PoBA'

const App = () => (
  <div className="App">
    <Header />
    <Web3Provider
      render={({ web3, accounts, networkId }) => {
        let content = null
        if (!web3) {
          content = <div>No web3</div>
        } else if (!accounts || accounts.length === 0) {
          content = <div>No unlocked account</div>
        } else {
          content = <PoBA web3={web3} account={accounts[0]} />
        }

        return <Main>{content}</Main>
      }}
    />
    <Footer />
  </div>
)

export default App
