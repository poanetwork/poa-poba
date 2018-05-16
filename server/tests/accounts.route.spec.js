const request = require('supertest')
const app = require('../app')
const mocks = require('./utils/mocks')

const mockEthAccount = '0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'
const mockToken = 'public-token-de3ce8ef-33f8-452c-a685-8671031fc0f6'
const mockAccessToken = mocks.exchangePublicToken.access_token
const mockBankAccounts = mocks.getAuth
const mockSign = {
  v: '0x1b',
  r: '0x9a4acff8fcc5fc48278482669d3db5a728a226c8f82bce2895208c59ca5637b9',
  s: '0x5d4cebac0a90b14321cd54ea51e74d37761f0cb665b62dd596b8eab2da8c08b4'
}

jest.mock('../controllers/accounts', () => ({
  getAccessToken: jest.fn(token => {
    if (token === mockToken) return mockAccessToken
    throw new Error('[getAccessToken] INVALID_TOKEN: Error exchanging public token')
  }),
  getBankAccounts: jest.fn(accessToken => {
    if (accessToken === mockAccessToken) return mockBankAccounts
    throw new Error('[getBankAccounts] INVALID_TOKEN: Error getting bank accounts')
  }),
  getBankAccount: jest.fn((accessToken, accountId) => {
    if (accessToken === mockAccessToken && accountId === mockBankAccounts.numbers[0].account_id)
      return mockBankAccounts.numbers[0]
    throw new Error('There was an error getting the transaction data')
  })
}))
jest.mock('web3', () =>
  jest.fn().mockImplementation(() => ({
    utils: {
      sha3: jest.fn(() => '0xc20eab54de62a1151b630cc74fdfc40cf58e919325e294aa124a6ec3b52f542f')
    },
    eth: {
      accounts: {
        sign: jest.fn(() => mockSign)
      }
    }
  }))
)

describe('[routes] accounts', () => {
  it('should return all bank accounts', () =>
    request(app)
      .get(`/api/accounts/bank-accounts/${mockToken}`)
      .then(res => {
        const { accounts } = res.body
        expect(res.status).toEqual(200)
        expect(accounts.numbers.length).toBeGreaterThanOrEqual(0)
      }))
  it('should return error', () =>
    request(app)
      .get(`/api/accounts/bank-accounts/${mockToken}-fail`)
      .then(res => {
        expect(res.status).toEqual(400)
      }))
  it('should return error if ethAccount does not exist', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        accessToken: mockAccessToken,
        accountId: mockBankAccounts.numbers[0].account_id
      })
      .then(res => {
        expect(res.status).toEqual(404)
      }))
  it('should return error if accessToken does not exist', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        accountId: mockBankAccounts.numbers[0].account_id
      })
      .then(res => {
        expect(res.status).toEqual(404)
      }))
  it('should return error if accountId does not exist', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        accessToken: mockAccessToken
      })
      .then(res => {
        expect(res.status).toEqual(404)
      }))
  it('should return error if accessToken is invalid', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        accessToken: `${mockAccessToken}-fail`,
        accountId: mockBankAccounts.numbers[0].account_id
      })
      .then(res => {
        expect(res.status).toEqual(400)
      }))
  it('should return the transaction data', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        accessToken: mockAccessToken,
        accountId: mockBankAccounts.numbers[0].account_id
      })
      .then(res => {
        const { account } = mockBankAccounts.numbers[0]
        expect(res.body).toEqual({ account, ...mockSign })
        expect(res.status).toEqual(200)
      }))
})
