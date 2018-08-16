import React from 'react'
import glamorous, { H2, P } from 'glamorous'
import { warningIconStyles } from '../styles/icons'

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
      title = 'No MetaMask found'
      message = (
        <span>
          This application requires MetaMask extension for Google Chrome.
          <br />
          Please make sure you are running the latest version of Google Chrome and follow this link
          to install MetaMask.
        </span>
      )
    }

    if (this.state.error === 'noUnlockedAccountRender') {
      title = 'MetaMask account'
      message = 'Please unlock your account in MetaMask and refresh the page first'
    }

    // style={{
    //   top: '50%',
    //   marginTop: '-80px',
    //   position: 'absolute',
    //   width: '533px'
    // }}

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <div>
          <WarningIcon />
          <H2 style={{ marginTop: '0' }}>{title}</H2>
          <P>{message}</P>
        </div>
      </div>
    )
  }
}

export default ErrorPage
