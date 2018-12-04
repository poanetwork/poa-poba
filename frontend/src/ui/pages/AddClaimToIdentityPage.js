import React from 'react'
import glamorous, { P } from 'glamorous'
import WithBackButton from './WithBackButton'
import GenerateErc735ClaimForm from '../containers/GenerateErc735ClaimForm'
import { generateErc735Claim } from '../../PoBAServer'
import { breakpoints } from '../styles/constants'
import { erc735ClaimSectionStyles } from '../styles/addClaimToIdentity'

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

export const BaseAddClaimToIdentityPage = props => {
  const { web3, account, match } = props
  const { keccakIdentifier } = match.params
  const PoBAServer = { generateErc735Claim }
  const generateErc735ClaimFormProps = {
    web3,
    account,
    keccakIdentifier,
    PoBAServer
  }
  return (
    <div className="add-claim-to-identity-page">
      <ResponsiveH1>Add claim to identity contract</ResponsiveH1>
      <P>
        Enter the address of your ERC-725 identity contract, generate the data needed for an ERC-735
        claim, and finally add it to your identity contract.
      </P>
      <Erc735ClaimSection>
        <GenerateErc735ClaimForm {...generateErc735ClaimFormProps} />
      </Erc735ClaimSection>
    </div>
  )
}

// @TODO: should add the "Add To Identity" button next to "Back"
export default WithBackButton(BaseAddClaimToIdentityPage)
