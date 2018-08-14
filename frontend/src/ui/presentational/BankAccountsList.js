import React from 'react'
import glamorous from 'glamorous'
import { verifiedAcountIconStyles, unverifiedAcountIconStyles } from '../styles/icons'
import {
  unverifiedBankAccountItemListStyles,
  infoWrapperStyles,
  infoParagraphStyles,
  verifyButtonStyles,
  verifiedMessageStyles
} from '../styles/bankAccountItemListStyles'

const BankAccountItem = glamorous.div(unverifiedBankAccountItemListStyles)

const UnverifiedIcon = glamorous.i({
  ...unverifiedAcountIconStyles,
  placeSelf: 'center'
})
const VerifiedIcon = glamorous.i({
  ...verifiedAcountIconStyles,
  placeSelf: 'center'
})

const InfoWrapper = glamorous.div(infoWrapperStyles)
const InfoParagraph = glamorous.span(infoParagraphStyles)
const AccountInfo = ({ bankAccount }) => (
  <InfoWrapper>
    <InfoParagraph>
      {bankAccount.account}
      <br />
      {bankAccount.bankName || bankAccount.institution}
    </InfoParagraph>
  </InfoWrapper>
)

const VerifyButton = glamorous.button(verifyButtonStyles)
const VerifiedMessage = glamorous.p(verifiedMessageStyles)

export default ({ bankAccounts, onClick }) =>
  bankAccounts.map((bankAccount, index) => (
    <BankAccountItem key={index}>
      {bankAccount.verified ? <VerifiedIcon /> : <UnverifiedIcon />}
      <AccountInfo bankAccount={bankAccount} />
      {bankAccount.verified ? (
        <VerifiedMessage>
          <i className="fa fa-check" /> Verified
        </VerifiedMessage>
      ) : (
        <VerifyButton onClick={() => onClick(bankAccount)}>Verify</VerifyButton>
      )}
    </BankAccountItem>
  ))
