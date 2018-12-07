import React from 'react'
import glamorous, { P } from 'glamorous'
import WithBackButton from './WithBackButton'
import GenerateErc735ClaimForm from '../containers/GenerateErc735ClaimForm'
import Erc735ClaimContent from '../presentational/Erc735ClaimContent'
import { generateErc735Claim } from '../../PoBAServer'
import { breakpoints } from '../styles/constants'
import { erc735ClaimSectionStyles } from '../styles/addClaimToIdentity'

const PoBAServer = { generateErc735Claim }

// @TODO: glamour does not support setting media queries globally
// https://github.com/threepointone/glamor/issues/333
const ResponsiveH1 = glamorous.h1({
  [`@media(min-width: ${breakpoints.md})`]: {
    fontSize: '36px',
    paddingTop: '100px'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    fontSize: '26px',
    paddingTop: '30px',
    lineHeight: '48px'
  }
})

const Erc735ClaimSection = glamorous.section('erc-735-claim-section', erc735ClaimSectionStyles)

class BaseAddClaimToIdentityPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { erc735Claim: null }
    this.setErc735Claim = this.setErc735Claim.bind(this)
  }

  setErc735Claim(erc735Claim) {
    this.setState({ erc735Claim })
  }

  render() {
    const { web3, account, match } = this.props
    const { keccakIdentifier } = match.params
    const generateErc735ClaimFormProps = {
      web3,
      account,
      keccakIdentifier,
      PoBAServer,
      onErc735ClaimGenerated: this.setErc735Claim
    }
    const { erc735Claim } = this.state
    return (
      <div className="add-claim-to-identity-page">
        <ResponsiveH1>Add claim to identity contract</ResponsiveH1>
        <P>
          Enter the address of your ERC-725 identity contract, generate the data needed for an
          claim, and finally add it to your identity contract.
        </P>
        <Erc735ClaimSection>
          <GenerateErc735ClaimForm {...generateErc735ClaimFormProps} />
          <Erc735ClaimContent erc735Claim={erc735Claim} />
        </Erc735ClaimSection>
      </div>
    )
  }
}

// @TODO: should add the "Add To Identity" button next to "Back"
export default WithBackButton(BaseAddClaimToIdentityPage)
