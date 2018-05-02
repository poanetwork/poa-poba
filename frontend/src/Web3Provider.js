import React, { Component } from 'react'
import Web3 from 'web3'

class Web3Provider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      accounts: [],
      networkId: null
    }
  }

  componentWillMount() {
    if (!window.web3) {
      this.setState({ web3: null })
      return
    }

    const web3 = new Web3(window.web3.currentProvider)
    this.setState({
      web3
    })

    this.fetchAccounts(web3)
    this.fetchNetworkId(web3)
  }

  async fetchAccounts(web3) {
    const accounts = await web3.eth.getAccounts()
    this.setState({ accounts })
  }

  async fetchNetworkId(web3) {
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId })
  }

  render() {
    const { render } = this.props

    return <div>{render({ ...this.state })}</div>
  }
}

export default Web3Provider
