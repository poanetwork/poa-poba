import React from 'react'
import glamorous, { H2, P } from 'glamorous'
import { warningIconStyles } from '../styles/icons'
import { pageLayoutStyles, headingStyles, paragraphStyles } from '../styles/errorPage'

const POA_WALLETS_SECTION_URL = 'https://poa.network/dapps?category=wallets'

const WarningIcon = glamorous.i('svg-background-element', warningIconStyles)

const ErrorPage = () => (
  <div className="error-page" style={pageLayoutStyles}>
    <WarningIcon />
    <H2 style={headingStyles}>Wallet not found, or access to Ethereum account not granted</H2>
    <P style={paragraphStyles}>
      This application requires a web browser Wallet extension.
      <br />
      Check{' '}
      <a href={POA_WALLETS_SECTION_URL} target="_blank" rel="noopener noreferrer">
        POA Network Wallets{`'`} section
      </a>{' '}
      for more information.
    </P>
    <P style={paragraphStyles}>
      If a Wallet extension is installed on your web browser, please verify that the access to
      Ethereum account has been granted and is available for the corresponding domain.
    </P>
  </div>
)

export default ErrorPage
