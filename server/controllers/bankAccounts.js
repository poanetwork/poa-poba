const plaidClient = require('../etc/plaid')
const logger = require('../etc/logger')

const getAccessToken = async publicToken => {
  const response = await plaidClient.exchangePublicToken(publicToken)
  if (response.status_code !== 200) {
    logger.error({ status: response.status_code }, 'Error exchanging public token')
    throw Error(`[exchangePublicToken] ${response.error_code}: {response.error_message}`)
  }
  return response.access_token
}

const getBankAccounts = async accessToken => {
  const response = await plaidClient.getAuth(accessToken)
  if (response.status_code !== 200) {
    logger.error({ status: response.status_code }, 'Error getting bank account')
    throw Error(`[getAuth] ${response.error_code}: {response.error_message}`)
  }
  return response
}

const getBankAccount = async (accessToken, accountId) => {
  const bankAccounts = await getBankAccounts(accessToken)
  const numberBankAccount = bankAccounts.numbers.filter(account => account.account_id === accountId)
  logger.info({ numberBankAccount }, 'Got bank account')
  return numberBankAccount
}

module.exports = {
  getAccessToken,
  getBankAccounts,
  getBankAccount
}
