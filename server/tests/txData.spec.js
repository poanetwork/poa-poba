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
    const response = await txDataController.getAccessToken('good-token')
    expect(response).toEqual(mockExchangePublicTokenResponse.access_token)
  })
  it('should return error when getAccessToken fails', async () => {
    await txDataController.getAccessToken('bad-token').catch(e => {
      expect(e.message).toBeTruthy()
    })
  })
  it('should get the bank account', async () => {
    const account = await txDataController.getBankAccount('good-accessToken')
    expect(account).toEqual(mockGetAuthResponse.numbers[0].account)
  })
  it('should get the bank account', async () => {
    await txDataController.getAccessToken('bad-accessToken').catch(e => {
      expect(e.message).toBeTruthy()
    })
  })
})
