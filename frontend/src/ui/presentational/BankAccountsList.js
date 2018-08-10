import React from 'react'
import glamorous from 'glamorous'
import buttonStyles from '../styles/button'

const BankAccountsList = glamorous.div('bank-account-list', {})

const BankAccountItem = glamorous.div('bank-account-list-item', {
  display: 'grid',
  border: `1px solid #d7d7d7`,
  borderRadius: '5px',
  gridTemplateColumns: '90px auto 130px',
  gridTemplateAreas: `'icon info  verify'`,
  gridGap: 0,
  marginBottom: '1.5em',
  width: '560px',
  height: '80px',
  cursor: 'pointer',
  ':hover': {
    boxShadow: '0px 10px 30px 0 rgba(76, 43, 134, 0.2)'
  }
})

const BankIcon = glamorous.i('fa fa-wpforms', {
  color: '#d7d7d7',
  fontSize: '3em',
  placeSelf: 'center',
  textAlign: 'center'
})
const VerifiedIcon = glamorous.i('fa fa-check-circle', {
  color: '#61db98',
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
      <p>{bankAccount.institution}</p>
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
const VerifiedMessage = glamorous.p({
  lineHeight: '35px',
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#61db98',
  placeSelf: 'center',
  width: '70%',
  height: '45%'
})

export default ({ bankAccounts, onClick }) => (
  <BankAccountsList>
    {bankAccounts.map((bankAccount, index) => (
      <BankAccountItem key={index}>
        {bankAccount.verified ? <VerifiedIcon /> : <BankIcon />}
        <AccountInfo bankAccount={bankAccount} />
        {bankAccount.verified ? (
          <VerifiedMessage>
            <i className="fa fa-check" /> Verified
          </VerifiedMessage>
        ) : (
          <VerifyButton
            css={{ gridArea: 'verify', placeSelf: 'center' }}
            onClick={() => onClick(bankAccount)}
          >
            Verify
          </VerifyButton>
        )}
      </BankAccountItem>
    ))}
  </BankAccountsList>
)
