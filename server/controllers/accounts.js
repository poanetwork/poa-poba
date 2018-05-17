const plaidClient = require('../etc/plaid')
const logger = require('../etc/logger')

const getAccessToken = async publicToken => {
  try {
    const response = await plaidClient.exchangePublicToken(publicToken)
    return response.access_token
  } catch (error) {
    logger.error({ status: error.status_code }, 'Error exchanging public token')
    throw new Error(`[getAccessToken] ${error.error_code}: ${error.error_message}`)
  }
}

const getBankAccounts = async accessToken => {
  try {
    return await plaidClient.getAuth(accessToken)
  } catch (error) {
    logger.error({ status: error.status_code }, 'Error getting bank accounts')
    throw Error(`[getBankAccounts] ${error.error_code}: ${error.error_message}`)
  }
}

const getBankAccount = async (accessToken, accountId) => {
  const bankAccounts = await getBankAccounts(accessToken)
  const numberBankAccount = bankAccounts.numbers.filter(account => account.account_id === accountId)
  logger.info({ numberBankAccount }, 'Got bank account')
  return numberBankAccount[0]
}

module.exports = {
  getAccessToken,
  getBankAccounts,
  getBankAccount
}
