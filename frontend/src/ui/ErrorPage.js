import React from 'react'
import { P } from 'glamorous'

class ErrorPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null
    }
  }

  componentDidMount() {
    const { error } = this.props
    this.setState({ error })
  }

  render() {
    let title = ''
    let message = ''
    if (this.state.error === 'web3') {
      title = 'No MetaMask found'
      message = 'This application requires MetaMask extension for Google Chrome. Please make sure you are running the latest version of Google Chrome and follow this link to install MetaMask.'
    }

    if (this.state.error === 'unlock') {
      title = 'MetaMask account'
      message = 'Please unlock your account in MetaMask and refresh the page first'
    }


    return (
      <div>
        <h1>{title}</h1>
        <P>{message}</P>
      </div>
    )
  }
}

export default ErrorPage
