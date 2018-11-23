import axios from 'axios'

export const getBankAccounts = async token => {
  const result = await axios.get(`/api/accounts/bank-accounts/${token}`)
  const { identityNames } = result.data
  const { ach, eft } = result.data.accounts.numbers
  const { institution } = result.data.accounts.item.institution
  const accounts = [...ach, ...eft]
  return accounts.map(account =>
    Object.assign({ identityNames, institution: institution.name }, account)
  )
}

export const getSignedBankAccount = async (accountId, ethAccount, token) => {
  const result = await axios.post('/api/accounts/sign-account', {
    accountId,
    ethAccount,
    token
  })

  return result.data
}
