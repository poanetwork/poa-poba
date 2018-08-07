import React from 'react'
import glamorous from 'glamorous'
import buttonStyles from '../styles/button'

const BankAccountsList = glamorous.div('bank-account-list', {})

const BankAccountItem = glamorous.div('bank-account-list-item', {
  display: 'grid',
  border: `1px solid #e0e0e0`,
  borderRadius: '7px',
  gridTemplateColumns: '90px auto 130px',
  gridTemplateAreas: `'icon info  verify'`,
  gridGap: 0,
  marginBottom: '1.5em',
  width: '560px',
  height: '80px',
  boxShadow: `0px 0px 2px 0px rgba(0,0,0,0.20)`
})

const BankIcon = glamorous.i('fa fa-wpforms', {
  color: '#b0b0b0',
  fontSize: '3em',
  placeSelf: 'center',
  textAlign: 'center'
})
const InfoWrapper = glamorous.div('bank-account-info', {
  gridArea: 'info'
})

const AccountInfo = ({ bankAccount }) =>
  bankAccount.bankName ? (
    <InfoWrapper>
      <p>{bankAccount.account}</p>
      <p>{bankAccount.bankName}</p>
    </InfoWrapper>
  ) : (
    <InfoWrapper>
      <p>{bankAccount.account}</p>
    </InfoWrapper>
  )

const newButtonColor = '#5c34a2'
const VerifyButton = glamorous.button(buttonStyles, {
  backgroundColor: 'white',
  boxShadow: `inset 0 0 0 2px ${newButtonColor}`,
  color: newButtonColor,
  borderWidth: 0,
  ':hover': {
    backgroundColor: newButtonColor,
    color: 'white'
  },
  placeSelf: 'center',
  textAlign: 'center',
  textTransform: 'none',
  borderRadius: '4px',
  width: '50%',
  height: '45%'
})

export default ({ bankAccounts, onClick }) => (
  <BankAccountsList>
    {bankAccounts.map((bankAccount, index) => (
      <BankAccountItem key={index}>
        <BankIcon />
        <AccountInfo bankAccount={bankAccount} />
        <VerifyButton
          css={{ gridArea: 'verify', placeSelf: 'center' }}
          onClick={() => onClick(bankAccount)}
        >
          Verify
        </VerifyButton>
      </BankAccountItem>
    ))}
  </BankAccountsList>
)
