import React, { Component } from 'react'
import Web3 from 'web3'

class Web3Provider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      accounts: [],
      networkId: null,
      allFetched: null
    }
  }

  componentWillMount() {
    if (!window.web3) {
      // signal that there is no pending work to do
      this.setState({
        allFetched: Promise.resolve()
      })
      return
    }

    const web3 = new Web3(window.web3.currentProvider)

    const whenFetchedAccounts = this.fetchAccounts(web3)
    const whenFetchedNetworkId = this.fetchNetworkId(web3)

    this.setState({
      web3,
      allFetched: Promise.all([whenFetchedAccounts, whenFetchedNetworkId])
    })
  }

  async fetchAccounts(web3) {
    const accounts = await web3.eth.getAccounts()
    this.setState({ accounts })
    return accounts
  }

  async fetchNetworkId(web3) {
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId })
    return networkId
  }

  render() {
    const { render } = this.props

    return <div>{render({ ...this.state })}</div>
  }
}

export default Web3Provider
