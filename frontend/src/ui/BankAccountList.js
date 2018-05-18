import React from 'react'
import glamorous, { Div } from 'glamorous'
import buttonStyles from './styles/button'
import colors from './styles/colors'

const BankAccountList = glamorous.div({
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
      <Div textAlign="center">
        <Button key={index} onClick={() => onClick(bankAccount)}>
          {bankAccount.account}
        </Button>
      </Div>
    ))}
  </BankAccountList>
)
