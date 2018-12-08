import React from 'react'
import glamorous from 'glamorous'
import { executeAddClaimOnIdentityContract } from '../utils/erc725'
import Loading from '../presentational/Loading'
import { successAlert, errorAlert } from '../presentational/alerts'
import align from '../styles/align'
import { responsiveButtonStyles, plaidButtonStyles } from '../styles/button'
import { rightArrowIconStyles } from '../styles/icons'

const ArroIcon = glamorous.i(rightArrowIconStyles, align.iconRight)
const addClaimButtonStyles = {
  ...responsiveButtonStyles,
  ...plaidButtonStyles
}
const ResponsiveButton = glamorous.button(addClaimButtonStyles)

class AddClaimToIdentityContractButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.invokeExcuteAddClaim = this.invokeExcuteAddClaim.bind(this)
  }

  async invokeExcuteAddClaim(event) {
    if (event) {
      event.preventDefault()
    }
    const { web3, fromWallet, identityContractAddress, erc735Claim } = this.props
    const executeAddClaimOnIdentityContractFunction = this.props
      .executeAddClaimOnIdentityContractFunction
      ? this.props.executeAddClaimOnIdentityContractFunction
      : executeAddClaimOnIdentityContract

    this.setState({ loading: true })
    try {
      const result = await executeAddClaimOnIdentityContractFunction(
        web3,
        fromWallet,
        identityContractAddress,
        erc735Claim
      )
      if (result) {
        successAlert('Claim added to identity contract!')
      } else {
        throw new Error('Could not add claim to identity address')
      }
    } catch (e) {
      errorAlert(e.message)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { erc735Claim } = this.props
    const { loading } = this.state
    return (
      <React.Fragment>
        <Loading show={loading} />
        <ResponsiveButton disabled={!erc735Claim} onClick={this.invokeExcuteAddClaim}>
          Add To Identity <ArroIcon />
        </ResponsiveButton>
      </React.Fragment>
    )
  }
}

export default AddClaimToIdentityContractButton
