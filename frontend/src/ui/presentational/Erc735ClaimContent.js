import React from 'react'
import { P } from 'glamorous'

// @TODO: add "monospaced-text" styles
const Erc735ClaimContent = ({ erc735Claim }) => {
  if (!erc735Claim) {
    return (
      <P>
        ERC-735 claim data <i>will appear here once it is generated</i>.
      </P>
    )
  }

  const erc735ClaimContent = `scheme: 1\ntype: 7\nissuer: ${erc735Claim.issuer ||
    '...'}\nsignature: ${erc735Claim.signature || '...'}\ndata: ${erc735Claim.data ||
    '...'}\nuri: ${erc735Claim.uri || '...'}`
  return (
    <section>
      <P>ERC-735 claim data generated:</P>
      <pre className="erc735-claim-data">{erc735ClaimContent}</pre>
      <div className="small-c-copy">
        Click on "Add To Identity" and sign the transaction to{' '}
        <span className="monospaced-text">execute</span> an{' '}
        <span className="monospaced-text">addClaim</span> on the specified identity contract using
        the data above.
      </div>
    </section>
  )
}

export default Erc735ClaimContent
