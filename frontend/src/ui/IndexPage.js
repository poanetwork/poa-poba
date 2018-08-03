import React from 'react'
import { Link } from 'react-router-dom'
import { P, H2 } from 'glamorous'
import Title from './Title'
import PlaidButton from '../PlaidButton'
import buttonStyle from './styles/button'
import align from './styles/align'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      accounts: []
    }
  }

  componentWillMount() {
    const { web3, accounts } = this.props
    this.setState({
      web3,
      accounts
    })
  }

  render() {
    return (
      <div>
        <Title />
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </P>
        <Link to="/help">
          <button style={buttonStyle}>
            How it works?{' '}
            <span style={align.iconRight}>
              <i className="fa fa-question" />
            </span>
          </button>
        </Link>
        <PlaidButton web3={this.state.web3} account={this.state.accounts[0]} />

        <div style={{ clear: 'both' }} />

        <H2>Lorem ipsum dolor sit amet</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </P>
        <Link to="/my-bank-accounts">
          <button style={buttonStyle}>
            My Bank Accounts{' '}
            <span style={align.iconRight}>
              <i className="fa fa-university" />
            </span>
          </button>
        </Link>
      </div>
    )
  }
}

export default IndexPage
