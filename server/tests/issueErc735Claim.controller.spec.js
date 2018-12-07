const issueErc735ClaimController = require('../controllers/issueErc735Claim')

jest.mock('../server-lib/get_bank_account_details', () =>
  jest.fn(() => {
    throw new Error()
  })
)
const body = {
  ethAccount: '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03',
  keccakIdentifier: '0x39ae2e5da76434b371b621b266846f5d615d8e5540811c46314341d6259ca8c0',
  identityContractAddress: '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03'
}

describe('[controllers] issueErc735Claim', async () => {
  it('should return res with status 400 when no bank account details are found', async () => {
    const send = jest.fn()
    const req = { body }
    const res = { status: jest.fn(() => ({ send })) }
    await issueErc735ClaimController.issueErc735Claim(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalled()
  })
})
