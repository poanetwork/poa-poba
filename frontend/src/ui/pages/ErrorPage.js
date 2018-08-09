import React from 'react'
import glamorous, { H1, P } from 'glamorous'
import colors from '../styles/colors'

const Icon = glamorous.div({
  width: '100%',
  color: colors.primary
})

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
      message =
        'This application requires MetaMask extension for Google Chrome. Please make sure you are running the latest version of Google Chrome and follow this link to install MetaMask.'
    }

    if (this.state.error === 'noUnlockedAccountRender') {
      title = 'MetaMask account'
      message = 'Please unlock your account in MetaMask and refresh the page first'
    }

    return (
      <div style={{ height: '80vh', position: 'relative' }}>
        <div
          style={{
            top: '50%',
            marginTop: '-80px',
            position: 'absolute',
            width: '450px',
            lineHeight: '1.5em'
          }}
        >
          <Icon>
            <i className="fa fa-times-circle-o fa-3x" />
          </Icon>
          <H1 style={{ marginTop: '0' }} color={colors.primary}>
            {title}
          </H1>
          <P color={colors.primary}>{message}</P>
        </div>
      </div>
    )
  }
}

export default ErrorPage
