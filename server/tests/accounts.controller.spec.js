const accountsController = require('../controllers/accounts')
const mocks = require('./utils/mocks')

const mockToken = 'public-token-de3ce8ef-33f8-452c-a685-8671031fc0f6'
const mockAccessToken = mocks.exchangePublicToken.access_token
const mockExchangePublicToken = mocks.exchangePublicToken
const mockExchangePublicTokenError = mocks.exchangePublicTokenError
const mockGetAuth = mocks.getAuth
const mockGetAuthError = mocks.getAuthError
const mockGetInstitutionById = mocks.getInstitutionById

jest.mock('../etc/plaid', () => ({
  exchangePublicToken: jest.fn(publicToken => {
    if (publicToken === mockToken) return mockExchangePublicToken
    return mockExchangePublicTokenError
  }),
  getAuth: jest.fn(accessToken => {
    if (accessToken === mockAccessToken) return mockGetAuth
    return mockGetAuthError
  }),
  getInstitutionById: jest.fn(() => mockGetInstitutionById)
}))

describe('[controllers] accounts', () => {
  it('should return the access_token', async () => {
    const accessToken = await accountsController.getAccessToken(mockToken)
    expect(accessToken).toEqual(mockExchangePublicToken.access_token)
  })
  it('should return error when getAccessToken fails', async () => {
    await accountsController.getAccessToken(`${mockToken}-bad`).catch(e => {
      expect(e.message).toBeTruthy()
    })
  })
  it('should return all the bank accounts', async () => {
    const bankAccounts = await accountsController.getBankAccounts(mockAccessToken)
    expect(bankAccounts).toEqual(mockGetAuth)
  })
  it('should return error when getAccessToken fails', async () => {
    await accountsController.getBankAccounts(`${mockAccessToken}-bad`).catch(e => {
      expect(e.message).toBeTruthy()
    })
  })
  it('should return only one bank account', async () => {
    const accountId = mockGetAuth.numbers.ach[0].account_id
    const account = await accountsController.getBankAccount(mockAccessToken, accountId)
    const expected = {
      account: mockGetAuth.numbers.ach[0].account,
      institution: mockGetInstitutionById.institution.name
    }
    expect(account).toEqual(expected)
  })
})
