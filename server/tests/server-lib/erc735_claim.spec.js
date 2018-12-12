require('dotenv').config()

const Web3 = require('web3')

const web3 = new Web3()

const erc735Claim = require('../../server-lib/erc735_claim.js')

describe('erc735_claim', () => {
  const {
    getAllTextDetailsFromBankAccount,
    getErc735Signature,
    CLAIM_TYPE_KYC_UINT256
  } = erc735Claim

  const bankAccount = {
    bankName: 'Chase',
    identityNames: 'John Doe'
  }
  const destinationClaimHolderAddress = '0xF2C0Ba003fE46BE0A567906064fb44136Bb250CB'
  describe('getAllTextDetailsFromBankAccount', () => {
    it('should return all bank accounts details joined by a comma char', () => {
      const result = getAllTextDetailsFromBankAccount(bankAccount)
      expect(result).toEqual(`${bankAccount.bankName},${bankAccount.identityNames}`)
    })
  })
  describe('getErc735Signature', () => {
    it('should return an object with signature and bankAccountSha3 attributes, given an the bankAccount and destinationClaimHolderAddress', () => {
      const result = getErc735Signature(bankAccount, destinationClaimHolderAddress)
      expect(result.signature).toBeTruthy()
      expect(result.bankAccountSha3).toBeTruthy()
    })
    it('should return a signature and bankAccountSha3 (data) that allows the ecrecovering of the corresponding account', async () => {
      // Hardcoded address of the given private key in .evn.example
      const address = '0x92970dbd5c0ee6b439422bfd7cd71e1dda921a03'

      const r = getErc735Signature(bankAccount, destinationClaimHolderAddress)

      // The following recoverProcess is what should be done in solidity. Check the contract "ClaimVerifier.sol":
      // https://github.com/FractalBlockchain/erc725/blob/e458b7cd99b0f0a40684c6245ce0e0f38126d705/contracts/ClaimVerifier.sol#L46
      const hash = web3.utils.soliditySha3(
        destinationClaimHolderAddress,
        CLAIM_TYPE_KYC_UINT256,
        r.bankAccountSha3
      )
      const recoveredAddress = await web3.eth.accounts.recover(hash, r.signature)

      expect(recoveredAddress.toLowerCase()).toEqual(address.toLowerCase())
    })
  })
})
