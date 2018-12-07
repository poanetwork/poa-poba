const PoBAContract = require('./poba_contract')

const getBankAccountDetails = async (ethAccount, keccakIdentifier) => {
  const PoBA = await PoBAContract()
  const index = await PoBA.userBankAccountByKeccakIdentifier(ethAccount, keccakIdentifier)
  const details = await PoBA.getBankAccountsByAddress(ethAccount, index[1].toNumber())
  return {
    bankName: details[1],
    identityNames: details[2]
  }
}

module.exports = getBankAccountDetails
