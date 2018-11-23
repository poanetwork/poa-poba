import React from 'react'
import glamorous from 'glamorous'
import { verifiedAcountIconStyles, unverifiedAcountIconStyles } from '../styles/icons'
import {
  bankAccountListStyles,
  unverifiedBankAccountItemListStyles,
  infoWrapperStyles,
  infoParagraphStyles,
  verifyButtonStyles,
  verifiedMessageStyles
} from '../styles/bankAccountItemListStyles'

const BankAccountList = glamorous.div('bank-account-list', bankAccountListStyles)
const BankAccountItem = glamorous.div('bank-account-list-item', unverifiedBankAccountItemListStyles)

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
      {bankAccount.identityNames}
      <br />
      {bankAccount.bankName || bankAccount.institution}
    </InfoParagraph>
  </InfoWrapper>
)

const VerifyButton = glamorous.button('bank-account-list-item__verify', verifyButtonStyles)
const VerifiedMessage = glamorous.p(verifiedMessageStyles)

const BankAccountsList = ({ bankAccounts, onClick }) => (
  <BankAccountList>
    {bankAccounts.map((bankAccount, index) => (
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
    ))}
  </BankAccountList>
)

export default BankAccountsList
