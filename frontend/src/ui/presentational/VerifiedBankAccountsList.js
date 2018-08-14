import React from 'react'
import glamorous from 'glamorous'
import { verifiedAcountIconStyles } from '../styles/icons'
import {
  bankAccountItemListStyles,
  infoWrapperStyles,
  infoParagraphStyles,
  dateWrapperStyles,
  dateParagraphStyles,
  removeButtonStyles
} from '../styles/bankAccountItemListStyles'

const BankAccountItem = glamorous.div(bankAccountItemListStyles)

const VerifiedIcon = glamorous.i({
  ...verifiedAcountIconStyles,
  placeSelf: 'center'
})
const InfoWrapper = glamorous.div(infoWrapperStyles)
const DateWrapper = glamorous.div(dateWrapperStyles)

const InfoParagraph = glamorous.span(infoParagraphStyles)
const AccountInfo = ({ bankAccount }) => (
  <InfoWrapper>
    <InfoParagraph>
      {bankAccount.account}
      <br />
      {bankAccount.bankName}
    </InfoParagraph>
  </InfoWrapper>
)

const RemoveButton = glamorous.button(removeButtonStyles)
const DatePragraph = glamorous.span(dateParagraphStyles)
const VerifiedDate = ({ date }) => (
  <DateWrapper>
    <DatePragraph>{date || '13 April 2018'}</DatePragraph>
  </DateWrapper>
)

const VerifiedBankAccountListItem = ({ bankAccount, onClick }) => (
  <BankAccountItem>
    <VerifiedIcon />
    <AccountInfo bankAccount={bankAccount} />
    <RemoveButton onClick={() => onClick(bankAccount)}>Remove</RemoveButton>
    <VerifiedDate date={bankAccount.verifiedDate} />
  </BankAccountItem>
)

export default ({ bankAccounts, onClick }) => (
  <div>
    {bankAccounts.map((bankAccount, index) => (
      <VerifiedBankAccountListItem
        key={index}
        bankAccount={bankAccount}
        onClick={() => onClick(bankAccount)}
      />
    ))}
  </div>
)
