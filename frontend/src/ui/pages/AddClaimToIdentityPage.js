import React from 'react'
import glamorous, { P } from 'glamorous'
import {
  withBackButtonStyles,
  withBackButtonWrappedContentStyles,
  backButtonStyles
} from '../styles/withBackButton'
import BackButton from '../containers/BackButton'
import GenerateErc735ClaimForm from '../containers/GenerateErc735ClaimForm'
import AddClaimToIdentityContractButton from '../containers/AddClaimToIdentityContractButton'
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
// We need to add AddClaimToIdentityContractButton next to the BackButton, see
// the render method in the component below
const WithBackButton = glamorous.div('with-back-button', withBackButtonStyles)
const WithBackButtonWrappedContent = glamorous.div(
  'with-back-button-wrapped-content',
  withBackButtonWrappedContentStyles
)

class BaseAddClaimToIdentityPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      erc735Claim: null,
      identityContractAddress: ''
    }
    this.setErc735Claim = this.setErc735Claim.bind(this)
    this.onIdentityContractAddressChange = this.onIdentityContractAddressChange.bind(this)
  }

  setErc735Claim(erc735Claim) {
    this.setState({ erc735Claim })
  }

  onIdentityContractAddressChange(event) {
    const baseState = { identityContractAddress: event.target.value }
    // If identityContractAddress changes, the claim is invalid. Clear it
    this.setState(this.state.erc735Claim ? { ...baseState, erc735Claim: null } : baseState)
  }

  render() {
    const { web3, account, match } = this.props
    const { keccakIdentifier } = match.params
    const { erc735Claim, identityContractAddress } = this.state
    const generateErc735ClaimFormProps = {
      web3,
      account,
      keccakIdentifier,
      PoBAServer,
      identityContractAddress,
      onIdentityContractAddressChange: this.onIdentityContractAddressChange,
      onErc735ClaimGenerated: this.setErc735Claim
    }
    const addClaimToIdentityContractButtonProps = {
      web3,
      identityContractAddress,
      erc735Claim,
      fromWallet: account
    }
    return (
      <WithBackButton>
        <WithBackButtonWrappedContent>
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
        </WithBackButtonWrappedContent>
        <section>
          <BackButton style={{ backButtonStyles }} to="/mybankaccountslist" />
          <AddClaimToIdentityContractButton {...addClaimToIdentityContractButtonProps} />
        </section>
      </WithBackButton>
    )
  }
}

// @TODO: should add the "Add To Identity" button next to "Back"
export default BaseAddClaimToIdentityPage
