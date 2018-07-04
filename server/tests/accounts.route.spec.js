const request = require('supertest')
const app = require('../app')
const mocks = require('./utils/mocks')

const mockEthAccount = '0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'
const mockToken = 'public-token-de3ce8ef-33f8-452c-a685-8671031fc0f6'
const mockAccessToken = mocks.exchangePublicToken.access_token
const mockBankAccounts = mocks.getAuth
const mockBankAccount = {
  bankAccount: {
    account: '9900009606',
    account_id: 'vzeNDwK7KQIm4yEog683uElbp9GRLEFXGK98D',
    routing: '011401533',
    wire_routing: '021000021'
  }
}
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
    if (accessToken === mockAccessToken && accountId === mockBankAccounts.numbers.ach[0].account_id)
      return mockBankAccounts.numbers.ach[0]
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
        expect(accounts.numbers.ach.length).toBeGreaterThanOrEqual(0)
        expect(accounts.numbers.eft.length).toBeGreaterThanOrEqual(0)
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
        token: mockToken,
        accountId: mockBankAccounts.numbers.ach[0].account_id
      })
      .then(res => {
        expect(res.status).toEqual(404)
      }))
  it('should return error if token does not exist', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        accountId: mockBankAccounts.numbers.ach[0].account_id
      })
      .then(res => {
        expect(res.status).toEqual(404)
      }))
  it('should return error if accountId does not exist', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        token: mockToken
      })
      .then(res => {
        expect(res.status).toEqual(404)
      }))
  it('should return error if token is invalid', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        token: `${mockToken}-fail`,
        accountId: mockBankAccounts.numbers.ach[0].account_id
      })
      .then(res => {
        expect(res.status).toEqual(400)
      }))
  it('should return the transaction data', () =>
    request(app)
      .post('/api/accounts/sign-account')
      .send({
        ethAccount: mockEthAccount,
        token: mockToken,
        accountId: mockBankAccounts.numbers.ach[0].account_id
      })
      .then(res => {
        expect(res.body).toEqual({ ...mockBankAccount, ...mockSign })
        expect(res.status).toEqual(200)
      }))
})
