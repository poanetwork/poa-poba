import React from 'react'
import { Div } from 'glamorous'

const RegisteredAccountsList = ({ accounts }) =>
  accounts.length ? (
    <Div textAlign="left" marginTop="1em">
      You have {accounts.length} registered account{accounts.length > 1 ? 's' : ''}:
      <ul>{accounts.map((account, index) => <li key={index}>{account}</li>)}</ul>
    </Div>
  ) : null

export default RegisteredAccountsList
