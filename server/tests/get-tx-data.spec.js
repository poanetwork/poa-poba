const request = require('supertest')
const app = require('../app')

const mockEthAccount = '0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'
const mockToken = 'public-token-9b67df27-7dcc-4027-a0c4-c460d6d21c16'
const mockAccessToken = 'access-sandbox-4bc7db69-5b7c-4a8e-843b-7d4e922c94aa'
const mockBankAccount = '1111222233330000'
const mockSign = {
  v: '0x1b',
  r: '0x9a4acff8fcc5fc48278482669d3db5a728a226c8f82bce2895208c59ca5637b9',
  s: '0x5d4cebac0a90b14321cd54ea51e74d37761f0cb665b62dd596b8eab2da8c08b4'
}
jest.mock('../controllers/txData', () => ({
  getAccessToken: jest.fn(token => {
    if (token === mockToken) return mockAccessToken
    return { status: 400 }
  }),
  getBankAccount: jest.fn(async accessToken => {
    if (accessToken === mockAccessToken) return mockBankAccount
    return { status: 400 }
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

describe('get-tx-data', () => {
  it('should return error if ethAccount does not exist', () =>
    request(app)
      .post('/api/get-tx-data')
      .then(res => expect(res.status).toEqual(400)))
  it('should return error if token does not exist', () =>
    request(app)
      .post('/api/get-tx-data')
      .send({
        ethAccount: mockEthAccount
      })
      .then(res => expect(res.status).toEqual(400)))
  it('should return success', () =>
    request(app)
      .post('/api/get-tx-data')
      .send({
        ethAccount: mockEthAccount,
        token: mockToken
      })
      .then(res => expect(res.status).toEqual(200)))
  it('should return error', () =>
    request(app)
      .post('/api/get-tx-data')
      .send({
        ethAccount: mockEthAccount,
        token: `${mockToken}-bad`
      })
      .then(res => {
        const { error } = res.body
        expect(res.status).toEqual(400)
        expect(error).toEqual('There was an error getting the transaction data')
      }))
})
