const request = require('supertest')
const app = require('../app')
const mocks = require('./utils/mocks')

// The following block is needed to prevent the error 'Missing Plaid "client_id"'
// because of the import/require of the whole app
const mockToken = 'public-token-de3ce8ef-33f8-452c-a685-8671031fc0f6'
const mockAccessToken = mocks.exchangePublicToken.access_token
jest.mock('../controllers/accounts', () => ({
  getAccessToken: jest.fn(token => {
    if (token === mockToken) return mockAccessToken
    throw new Error('[getAccessToken] INVALID_TOKEN: Error exchanging public token')
  })
}))

const ENDPOINT = `/api/issueErc735Claim`
const validValues = {
  ethAccount: '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03',
  keccakIdentifier: '0x39ae2e5da76434b371b621b266846f5d615d8e5540811c46314341d6259ca8c0',
  identityContractAddress: '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03'
}
jest.mock('../server-lib/get_bank_account_details', () =>
  jest.fn(() => {
    return Promise.resolve({
      bankName: 'bankName',
      identityNames: 'identityNames'
    })
  })
)
jest.mock('../server-lib/erc735_claim', () => ({
  getErc735Signature: jest.fn(() => {
    return {
      signature: 'signature',
      bankAccountSha3: 'bankAccountSha3'
    }
  })
}))
describe('[routes] issueErc735Claim', () => {
  it('should return error if the body of the req is empty', async () => {
    const emptyBodyRes = await request(app)
      .post(ENDPOINT)
      .send({})
    expect(emptyBodyRes.status).toEqual(400)
  })
  it('should return error if ethAccount, keccakIdentifier or identityConractAddress are empty/not present in the body of the req', async () => {
    const missingEthAccount = await request(app)
      .post(ENDPOINT)
      .send({
        keccakIdentifier: validValues.keccakIdentifier,
        identityContractAddres: validValues.identityContractAddres
      })
    expect(missingEthAccount.status).toEqual(400)
    const missingKeccakIdentifier = await request(app)
      .post(ENDPOINT)
      .send({
        ethAccount: validValues.ethAccount,
        identityContractAddres: validValues.identityContractAddres
      })
    expect(missingKeccakIdentifier.status).toEqual(400)
    const missingIdentityContractAddress = await request(app)
      .post(ENDPOINT)
      .send({
        ethAccount: validValues.ethAccount,
        keccakIdentifier: validValues.keccakIdentifier
      })
    expect(missingIdentityContractAddress.status).toEqual(400)
  })
  it('should return error if ethAccount or identityConractAddress ar not valid addresses', async () => {
    const invalidEthAccount = await request(app)
      .post(ENDPOINT)
      .send({
        ethAccount: 'somethingInvalid',
        keccakIdentifier: validValues.keccakIdentifier,
        identityContractAddres: validValues.identityContractAddress
      })
    expect(invalidEthAccount.status).toEqual(400)
    const invalidIdentityContractAddress = await request(app)
      .post(ENDPOINT)
      .send({
        ethAccount: validValues.ethAccount,
        keccakIdentifier: validValues.keccakIdentifier,
        identityContractAddres: 'somethingInvalid'
      })
    expect(invalidIdentityContractAddress.status).toEqual(400)
  })
  it('should return signature, data, issuerAddres and uri fields of an erc735 claim on success', () =>
    request(app)
      .post(`/api/issueErc735Claim`)
      .send(validValues)
      .then(res => {
        expect(res.status).toEqual(200)
        const { signature, data, issuerAddress, uri } = res.body
        expect(signature).toBeTruthy()
        expect(data).toBeTruthy()
        expect(issuerAddress).toBeTruthy()
        expect(uri).toBeTruthy()
      }))
})
