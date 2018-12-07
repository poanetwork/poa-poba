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
    institution: 'Bank One',
    routing: '011401533',
    wire_routing: '021000021'
  }
}
const mockNames = 'John Doe'
const mockSign = {
  v: '0x1c',
  r: '0xf28184b042e25dbf1ef73ac46659bbce39593fc389b4f0f5468eb002dfe3636c',
  s: '0x59e00c36925ac54d0df1b6c6cc982be7765decd10177bb22a9dd3b83106065d1'
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
      return mockBankAccount.bankAccount
    throw new Error('There was an error getting the transaction data')
  }),
  getInstitutionById: jest.fn(() => {
    return { name: 'Chase' }
  }),
  getIdentity: jest.fn(() => {
    return { names: [mockNames] }
  })
}))

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
        expect(res.body).toEqual({ ...mockBankAccount, identityNames: mockNames, ...mockSign })
        expect(res.status).toEqual(200)
      }))
})
