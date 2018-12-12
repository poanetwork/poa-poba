import React, { Component } from 'react'
import glamorous from 'glamorous'
import Loading from '../presentational/Loading'
import { warningAlert, errorAlert } from '../presentational/alerts'
import { rightArrowIconStyles } from '../styles/icons'
import { generateErc735ClaimButtonStyles } from '../styles/button'
import {
  identityContractAddressLabelStyles,
  identityContractAddressInputStyles,
  identityContractAddressControlWrapperStyles
} from '../styles/addClaimToIdentity'

const Label = glamorous.label(identityContractAddressLabelStyles)
const SubmitButton = glamorous.button(generateErc735ClaimButtonStyles)
const ArrowIcon = glamorous.i(rightArrowIconStyles)
const IdentityContractAddressControlWrapper = glamorous.section(
  identityContractAddressControlWrapperStyles
)

class GenerateErc735ClaimForm extends Component {
  constructor(props) {
    super(props)

    const { PoBAServer } = props
    this.state = { loading: false }
    this.PoBAServer = PoBAServer

    this.onSubmitGenerateClaimForm = this.onSubmitGenerateClaimForm.bind(this)
    this.generateErc735Claim = this.generateErc735Claim.bind(this)
  }

  async onSubmitGenerateClaimForm(event) {
    event.preventDefault()
    if (this.state.loading) {
      return
    }

    const { web3, identityContractAddress } = this.props
    if (!identityContractAddress || !web3.utils.isAddress(identityContractAddress)) {
      warningAlert('Please provide a valid IDENTITY CONTRACT ADDRESS')
      return
    }

    this.setState({ loading: true })
    try {
      await this.generateErc735Claim()
    } catch (e) {
      errorAlert('Error generating ERC735 claim')
    } finally {
      this.setState({ loading: false })
    }
  }

  async generateErc735Claim() {
    const {
      identityContractAddress,
      account,
      keccakIdentifier,
      onErc735ClaimGenerated
    } = this.props
    const res = await this.PoBAServer.generateErc735Claim(
      account,
      keccakIdentifier,
      identityContractAddress
    )
    const erc735Claim = {
      type: 7,
      scheme: 1,
      issuer: res.issuerAddress,
      signature: res.signature,
      data: res.data,
      uri: res.uri
    }
    onErc735ClaimGenerated(erc735Claim)
  }

  render() {
    const { onIdentityContractAddressChange, identityContractAddress } = this.props
    const { loading } = this.state
    return (
      <div className="generate-erc-735-claim-form">
        <Loading show={loading} />
        <form id="claim-form" name="claimForm" noValidate onSubmit={this.onSubmitGenerateClaimForm}>
          <Label>Identity Contract Address:</Label>
          <IdentityContractAddressControlWrapper>
            <input
              type="text"
              name="identityContractAddress"
              value={identityContractAddress}
              onChange={onIdentityContractAddressChange}
              style={identityContractAddressInputStyles}
              disabled={loading}
            />
            <SubmitButton type="submit" disabled={loading}>
              <ArrowIcon />
            </SubmitButton>
          </IdentityContractAddressControlWrapper>
        </form>
      </div>
    )
  }
}

export default GenerateErc735ClaimForm
