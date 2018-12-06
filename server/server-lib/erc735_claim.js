const Web3 = require('web3')

const web3 = new Web3()

const { PRIVATE_KEY } = process.env

// Number "7" zero-padded-uint256-representation
const CLAIM_TYPE_KYC_UINT256 = '0x0000000000000000000000000000000000000000000000000000000000000007'

const getAllTextDetailsFromBankAccount = bankAccountDetails => {
  const bankAccountDetailsValues = [bankAccountDetails.bankName, bankAccountDetails.identityNames]
  return bankAccountDetailsValues.join(',')
}

const getErc735Signature = (ethAccount, bankAccount, destinationClaimHolderAddress) => {
  const bankAccountSha3 = web3.utils.soliditySha3(getAllTextDetailsFromBankAccount(bankAccount))

  const hash = web3.utils.soliditySha3(
    ethAccount +
      Buffer.from(destinationClaimHolderAddress).toString('hex') +
      Buffer.from(CLAIM_TYPE_KYC_UINT256).toString('hex') +
      Buffer.from(bankAccountSha3.substr(2), 'hex')
  )

  const { signature } = web3.eth.accounts.sign(hash, PRIVATE_KEY)

  return { signature, bankAccountSha3 }
}

module.exports = {
  CLAIM_TYPE_KYC_UINT256,
  getAllTextDetailsFromBankAccount,
  getErc735Signature
}
