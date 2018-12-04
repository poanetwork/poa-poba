import React from 'react'
import glamorous from 'glamorous'
import Moment from 'react-moment'
import 'moment-timezone'
import { Link } from 'react-router-dom'
import {
  verifiedAcountIconStyles,
  removeIconStyles,
  generateClaimIconStyles
} from '../styles/icons'
import {
  bankAccountListStyles,
  bankAccountItemListStyles,
  infoWrapperStyles,
  infoParagraphStyles,
  dateWrapperStyles,
  dateParagraphStyles,
  removeButtonStyles,
  generateClaimButtonStyles
} from '../styles/bankAccountItemListStyles'

const DATE_FORMAT = 'DD MMM YYYY'

const BankAccountList = glamorous.div('verified-bank-account-list', bankAccountListStyles)
const BankAccountItem = glamorous.div('verified-bank-account-list-item', bankAccountItemListStyles)

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
      {bankAccount.identityNames}
      <br />
      {bankAccount.bankName}
    </InfoParagraph>
  </InfoWrapper>
)

const RemoveIcon = glamorous.i(removeIconStyles)
const GenerateClaimIcon = glamorous.i(generateClaimIconStyles)
const RemoveButton = glamorous.span(
  'verified-bank-account-list-item__remove-button',
  removeButtonStyles
)
const GenerateClaimButton = glamorous.a(
  'verified-bank-account-list-item__generate-claim-button',
  generateClaimButtonStyles
)
const DatePragraph = glamorous.span(dateParagraphStyles)
const VerifiedDate = ({ date }) => (
  <DateWrapper>
    <DatePragraph>
      <Moment unix format={DATE_FORMAT}>
        {date}
      </Moment>
    </DatePragraph>
  </DateWrapper>
)

const VerifiedBankAccountListItem = ({ bankAccount, onClick }) => (
  <BankAccountItem>
    <VerifiedIcon />
    <AccountInfo bankAccount={bankAccount} />
    <GenerateClaimButton>
      <Link to={`/add-claim-to-identity/${bankAccount.keccakIdentifier}`}>
        <GenerateClaimIcon />
      </Link>
    </GenerateClaimButton>
    <RemoveButton onClick={() => onClick(bankAccount)}>
      <RemoveIcon />
    </RemoveButton>
    <VerifiedDate date={bankAccount.verifiedDate} />
  </BankAccountItem>
)

export default ({ bankAccounts, onClick }) => (
  <BankAccountList>
    {bankAccounts.map((bankAccount, index) => (
      <VerifiedBankAccountListItem
        key={index}
        bankAccount={bankAccount}
        onClick={() => onClick(bankAccount)}
      />
    ))}
  </BankAccountList>
)
