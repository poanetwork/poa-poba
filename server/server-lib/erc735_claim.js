const Web3 = require('web3')

const web3 = new Web3()

const { PRIVATE_KEY } = process.env

// Number "7" zero-padded-uint256-representation
const CLAIM_TYPE_KYC_UINT256 = '0x0000000000000000000000000000000000000000000000000000000000000007'

const getAllTextDetailsFromBankAccount = bankAccountDetails => {
  const bankAccountDetailsValues = [bankAccountDetails.bankName, bankAccountDetails.identityNames]
  return bankAccountDetailsValues.join(',')
}

const getErc735Signature = (bankAccount, destinationClaimHolderAddress) => {
  const bankAccountSha3 = web3.utils.soliditySha3(getAllTextDetailsFromBankAccount(bankAccount))

  // The following recoverProcess is what should be done in solidity. Check the contract "ClaimVerifier.sol":
  // https://github.com/FractalBlockchain/erc725/blob/e458b7cd99b0f0a40684c6245ce0e0f38126d705/contracts/ClaimVerifier.sol#L46
  const hash = web3.utils.soliditySha3(
    destinationClaimHolderAddress,
    CLAIM_TYPE_KYC_UINT256,
    bankAccountSha3
  )

  const { signature } = web3.eth.accounts.sign(hash, PRIVATE_KEY)

  return { signature, bankAccountSha3 }
}

module.exports = {
  CLAIM_TYPE_KYC_UINT256,
  getAllTextDetailsFromBankAccount,
  getErc735Signature
}
