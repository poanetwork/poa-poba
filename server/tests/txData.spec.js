const txDataController = require('../controllers/txData')
const mocks = require('./utils/mocks')

const mockExchangePublicTokenResponse = mocks.exchangePublicToken
const mockExchangePublicTokenError = mocks.exchangePublicTokenError
const mockGetAuthResponse = mocks.getAuth
const mockGetAuthError = mocks.getAuthError
jest.mock('../etc/plaid', () => ({
  exchangePublicToken: jest.fn(token => {
    if (token === 'good-token') return mockExchangePublicTokenResponse
    return mockExchangePublicTokenError
  }),
  getAuth: jest.fn(async accessToken => {
    if (accessToken === 'good-accessToken') return mockGetAuthResponse
    return mockGetAuthError
  })
}))

describe('txData controller', () => {
  it('should get the access token', async () => {
    await expect(txDataController.getAccessToken('good-token')).resolves.toBeTruthy()
  })
  it('should get the bank account', async () => {
    await expect(txDataController.getBankAccount('good-accessToken')).resolves.toBeTruthy()
  })
})
