import React from 'react'
import glamorous, { H2, P } from 'glamorous'
import { warningIconStyles } from '../styles/icons'
import { pageLayoutStyles, headingStyles } from '../styles/errorPage'

const WarningIcon = glamorous.i('svg-background-element', warningIconStyles)

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
    if (this.state.error === 'noWeb3Render') {
      title = 'Nifty Wallet not found'
      message = (
        <span>
          This application requires Nifty Wallet extension for Google Chrome.
          <br />
          Please make sure you are running the latest version of Google Chrome and follow{' '}
          <a
            href="https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid"
            target="_blank"
            rel="noopener noreferrer"
          >
            this link
          </a>{' '}
          to install Nifty Wallet.
        </span>
      )
    }

    if (this.state.error === 'noUnlockedAccountRender') {
      title = 'Nifty Wallet account'
      message = 'Please unlock your account in Nifty Wallet and refresh the page first'
    }

    return (
      <div style={pageLayoutStyles}>
        <WarningIcon />
        <H2 style={headingStyles}>{title}</H2>
        <P>{message}</P>
      </div>
    )
  }
}

export default ErrorPage
