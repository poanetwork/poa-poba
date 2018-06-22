import React from 'react'
import glamorous, { Div } from 'glamorous'
import buttonStyles from './styles/button'
import colors from './styles/colors'

const BankAccountList = glamorous.div('bank-account-list', {
  textAlign: 'center'
})

const Button = glamorous.button(buttonStyles, {
  marginBottom: '0.5em',
  backgroundColor: 'white',
  boxShadow: `inset 0 0 0 2px ${colors.primary}`,
  color: colors.primary,
  borderWidth: 0,
  ':hover': {
    backgroundColor: colors.primary,
    color: 'white'
  }
})

export default ({ bankAccounts, onClick }) => (
  <BankAccountList>
    {bankAccounts.map((bankAccount, index) => (
      <Div className="bank-account-item" textAlign="center">
        Bank account number: <strong>{bankAccount.account} </strong>
        <Button key={index} onClick={() => onClick(bankAccount)}>
          Verify
        </Button>
      </Div>
    ))}
  </BankAccountList>
)
