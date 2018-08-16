import React from 'react'
import { Link } from 'react-router-dom'
import glamorous, { P, H1, H2 } from 'glamorous'
import PlaidButton from '../containers/PlaidButton'
import buttonStyle from '../styles/button'
import align from '../styles/align'
import { howItWorksIconStyles, myAccountsIconStyles } from '../styles/icons'

const HowItWorksIcon = glamorous.i(howItWorksIconStyles, align.iconRight)
const MyAccountsIcon = glamorous.i(myAccountsIconStyles, align.iconRight)

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
        <H1>Proof of bank account</H1>
        <P className="main">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </P>
        <Link to="/help">
          <button style={buttonStyle}>
            How it works <HowItWorksIcon />
          </button>
        </Link>
        <PlaidButton web3={this.state.web3} account={this.state.accounts[0]} />

        <H2>Lorem ipsum dolor sit amet</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </P>
        <Link to="/mybankaccountslist">
          <button style={buttonStyle}>
            My Bank Accounts <MyAccountsIcon />
          </button>
        </Link>
      </div>
    )
  }
}

export default IndexPage
