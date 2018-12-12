import React from 'react'
import glamorous, { P } from 'glamorous'
import {
  erc735ClaimContentSectionStyles,
  erc735ClaimContentStyles,
  instructionsStyles,
  monospacedTextStyles
} from '../styles/addClaimToIdentity'

const Erc735ClaimSection = glamorous.section(erc735ClaimContentSectionStyles)
const Instructions = glamorous.div(instructionsStyles)
const Erc735Content = glamorous.pre(erc735ClaimContentStyles)
const MonospacedText = glamorous.span(monospacedTextStyles)

// @TODO: add "monospaced-text" styles
const Erc735ClaimContent = ({ erc735Claim }) => {
  if (!erc735Claim) {
    return (
      <Erc735ClaimSection>
        <P>
          ERC-735 claim data <i>will appear here once it is generated</i>.
        </P>
      </Erc735ClaimSection>
    )
  }

  const erc735ClaimContent = `scheme: 1\ntype: 7\nissuer: ${erc735Claim.issuer ||
    '...'}\nsignature: ${erc735Claim.signature || '...'}\ndata: ${erc735Claim.data ||
    '...'}\nuri: ${erc735Claim.uri || '...'}`
  return (
    <Erc735ClaimSection>
      <P>ERC-735 claim data generated:</P>
      <Erc735Content className="erc735-claim-content">{erc735ClaimContent}</Erc735Content>
      <Instructions>
        Click on "Add To Identity" and sign the transaction to{' '}
        <MonospacedText>execute</MonospacedText> an <MonospacedText>addClaim</MonospacedText> on the
        specified identity contract using the data above.
      </Instructions>
    </Erc735ClaimSection>
  )
}

export default Erc735ClaimContent
