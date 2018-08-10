import React from 'react'
import { Link } from 'react-router-dom'
import glamorous, { P, H2 } from 'glamorous'
import Title from '../layout/Title'
import PlaidButton from '../containers/PlaidButton'
import buttonStyle from '../styles/button'
import align from '../styles/align'

const HowItWorksIcon = glamorous.i('svg-background-element', {
  display: 'inline-block',
  background: `url("/images/svg/how-it-works.svg")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '18px'
})
const MyAccountsIcon = glamorous.i('svg-background-element', {
  display: 'inline-block',
  background: `url("/images/svg/my-accounts.svg")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '18px'
})

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
    const howItWorksButtonStyle = Object.assign(
      { 'margin-right': '30px', 'margin-bottom': '10px' },
      buttonStyle
    )
    return (
      <div>
        <Title />
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </P>
        <Link to="/help">
          <button style={howItWorksButtonStyle}>
            How it works?{' '}
            <span style={align.iconRight}>
              <HowItWorksIcon />
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
        <Link to="/mybankaccountslist">
          <button style={buttonStyle}>
            My Bank Accounts{' '}
            <span style={align.iconRight}>
              <MyAccountsIcon />
            </span>
          </button>
        </Link>
      </div>
    )
  }
}

export default IndexPage
