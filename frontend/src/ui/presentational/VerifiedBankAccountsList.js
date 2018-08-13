import React from 'react'
import glamorous from 'glamorous'
import buttonStyles from '../styles/button'

const BankAccountsList = glamorous.div('bank-account-list', {})

const BankAccountItem = glamorous.div('bank-account-list-item', {
  display: 'grid',
  border: `1px solid #d7d7d7`,
  borderRadius: '5px',
  gridTemplateColumns: '80px auto 100px 120px',
  gridTemplateAreas: `'icon info remove date'`,
  gridGap: 0,
  marginBottom: '1.5em',
  width: '560px',
  height: '80px',
  cursor: 'pointer',
  ':hover': {
    boxShadow: `0px 10px 30px 0 rgba(76, 43, 134, 0.2)`
  }
})

const VerifiedIcon = glamorous.i('svg-background-element', {
  display: 'inline-block',
  background: `url("/images/svg/done.svg")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '40px',
  width: '40px',
  placeSelf: 'center'
})
const InfoWrapper = glamorous.div('bank-account-info', {
  gridArea: 'info',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: 0
})
const DateWrapper = glamorous.div('bank-account-verified-date', {
  gridArea: 'date',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: 0
})

const AccountInfo = ({ bankAccount }) => {
  const InfoParagraph = glamorous.span('info-paragraph', {
    width: '100%',
    textAlign: 'left',
    height: 'auto',
    alignSelf: 'center',
    lineHeight: '1.5em'
  })
  return bankAccount.bankName ? (
    <InfoWrapper>
      <InfoParagraph>
        {bankAccount.account}
        <br />
        {bankAccount.bankName}
      </InfoParagraph>
    </InfoWrapper>
  ) : (
    <InfoWrapper>
      <InfoParagraph>{bankAccount.account}</InfoParagraph>
    </InfoWrapper>
  )
}

const newButtonColor = '#5c34a2'
const RemoveButton = glamorous.button(buttonStyles, {
  textTransform: 'none',
  backgroundColor: 'white',
  border: `1px solid ${newButtonColor}`,
  borderRadius: '3px',
  color: newButtonColor,
  ':hover': {
    backgroundColor: newButtonColor,
    color: 'white'
  },
  width: 'auto',
  height: '45%',
  padding: '0 10px',
  placeSelf: 'center',
  textAlign: 'right',
  gridArea: 'remove'
})
const VerifiedDate = ({ date }) => {
  const DatePragraph = glamorous.span('date-paragraph', {
    color: '#777',
    height: 'auto',
    padding: '0 20px 0 0',
    width: '100%',
    textAlign: 'right',
    placeSelf: 'center'
  })
  return (
    <DateWrapper>
      <DatePragraph>{date || '13 April 2018'}</DatePragraph>
    </DateWrapper>
  )
}

const VerifiedBankAccountListItem = ({ bankAccount, onClick }) => (
  <BankAccountItem>
    <VerifiedIcon />
    <AccountInfo bankAccount={bankAccount} />
    <RemoveButton onClick={() => onClick(bankAccount)}>Remove</RemoveButton>
    <VerifiedDate date={bankAccount.verifiedDate} />
  </BankAccountItem>
)

export default ({ bankAccounts, onClick }) => (
  <BankAccountsList>
    {bankAccounts.map((bankAccount, index) => (
      <VerifiedBankAccountListItem
        key={index}
        bankAccount={bankAccount}
        onClick={() => onClick(bankAccount)}
      />
    ))}
  </BankAccountsList>
)
