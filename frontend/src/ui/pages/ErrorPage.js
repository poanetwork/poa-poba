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
      title = 'Wallet not found'
      message = (
        <span>
          This application requires a web browser Wallet extension.
          <br />
          Check{' '}
          <a
            href="https://poa.network/dapps?category=wallets"
            target="_blank"
            rel="noopener noreferrer"
          >
            POA Network Wallets{`'`} section
          </a>{' '}
          for more information.
        </span>
      )
    }

    if (this.state.error === 'noUnlockedAccountRender') {
      title = 'Wallet account'
      message = 'Please unlock your account in your Wallet and then refresh the page.'
    }

    return (
      <div className="error-page" style={pageLayoutStyles}>
        <WarningIcon />
        <H2 style={headingStyles}>{title}</H2>
        <P>{message}</P>
      </div>
    )
  }
}

export default ErrorPage
