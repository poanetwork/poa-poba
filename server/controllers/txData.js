const plaidClient = require('../etc/plaid')
const logger = require('../etc/logger')

const getAccessToken = async token => {
  const tokenResponse = await plaidClient.exchangePublicToken(token)
  if (tokenResponse.status_code !== 200) {
    logger.error({ status: tokenResponse.status_code }, 'Error exchanging public token')
    throw Error(`[exchangePublicToken] ${tokenResponse.error_code}: ${tokenResponse.error_message}`)
  }
  return tokenResponse.access_token
}

const getBankAccount = async accessToken => {
  const accountData = await plaidClient.getAuth(accessToken)
  if (accountData.status_code !== 200) {
    logger.error({ status: accountData.status_code }, 'Error getting bank account')
    throw Error(`[getAuth] ${accountData.error_code}: ${accountData.error_message}`)
  }
  logger.info({ accountData }, 'Got account data')
  const { numbers } = accountData
  const bankAccount = numbers[0].account
  logger.info({ bankAccount }, 'Got bank account')
  return bankAccount
}

module.exports = {
  getAccessToken,
  getBankAccount
}
