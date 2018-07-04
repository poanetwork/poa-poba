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

const getInstitutionById = async institutionId => {
  try {
    return await plaidClient.getInstitutionById(institutionId)
  } catch (error) {
    logger.error({ status: error.status_code }, 'Error getting institution')
    throw Error(`[getInstitutionById] ${error.error_code}: ${error.error_message}`)
  }
}

const getBankAccount = async (accessToken, accountId) => {
  const bankAccounts = await getBankAccounts(accessToken)
  const { numbers, item } = bankAccounts
  const ach = numbers.ach.filter(account => account.account_id === accountId)
  const eft = numbers.eft.filter(account => account.account_id === accountId)
  const number = [...ach, ...eft][0]
  const institutionId = item.institution_id
  const { institution } = await getInstitutionById(institutionId)
  const bankAccount = { account: number.account, institution: institution.name }
  logger.info(bankAccount, 'Got bank account')
  return bankAccount
}

module.exports = {
  getAccessToken,
  getBankAccounts,
  getBankAccount
}
