const plaidClient = require('../etc/plaid')
const logger = require('../etc/logger')

const exchangePublicToken = async token => {
  const tokenResponse = await plaidClient.exchangePublicToken(token)
  if (tokenResponse.status_code !== 200) {
    logger.error({ status: tokenResponse.status_code }, 'Error exchanging public token')
    throw new Error({
      status: 500,
      message: `[exchangePublicToken] ${tokenResponse.error_code}: {tokenResponse.error_message}`
    })
  }
  return tokenResponse
}

const getAuth = async accessToken => {
  const response = await plaidClient.getAuth(accessToken)
  if (response.status_code !== 200) {
    logger.error({ status: response.status_code }, 'Error getting bank account')
    throw new Error({
      status: 500,
      message: `[getAuth] ${response.error_code}: {response.error_message}`
    })
  }
  return response
}

const getAccessToken = async token => {
  try {
    const tokenResponse = await exchangePublicToken(token)
    return tokenResponse.access_token
  } catch (e) {
    return e
  }
}

const getBankAccount = async accessToken => {
  try {
    const accountData = await getAuth(accessToken)
    logger.info({ accountData }, 'Got account data')
    const { numbers } = accountData
    const bankAccount = numbers[0].account
    logger.info({ bankAccount }, 'Got bank account')
    return bankAccount
  } catch (e) {
    return e
  }
}

module.exports = {
  getAccessToken,
  getBankAccount
}
