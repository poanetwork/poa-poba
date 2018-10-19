import React from 'react'
import ReactDOM from 'react-dom'
import Web3Provider from 'react-web3-provider'
import Web3 from 'web3'
import 'font-awesome/css/font-awesome.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import './ui/styles/global'
import registerServiceWorker from './registerServiceWorker'

const renderAppWithWeb3Provider = () => {
  let isEthereumAccessRequested = false

  return (
    <Web3Provider
      error={err => `Connection error: ${err}`}
      acceptProvider={(web3, accept, reject) => {
        const { ethereum } = window
        // acceptProvider is a collection-filter function: the 2nd time it gets invoked
        // it should not performe the same verification
        if (ethereum && isEthereumAccessRequested === false) {
          ethereum
            .enable()
            .then(() => {
              accept(new Web3(ethereum))
            })
            .catch(error => {
              isEthereumAccessRequested = true
              console.error(error)
              reject()
            })
        } else if (web3 && web3.currentProvider) {
          accept(new Web3(web3.currentProvider))
        } else {
          reject()
        }
      }}
    >
      <App />
    </Web3Provider>
  )
}

ReactDOM.render(renderAppWithWeb3Provider(), document.getElementById('root'))
registerServiceWorker()
