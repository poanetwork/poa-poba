const PoBAContract = require('./poba_contract')

const getBankAccountDetails = async (ethAccount, keccakIdentifier) => {
  try {
    const PoBA = await PoBAContract()
    const index = await PoBA.userBankAccountByKeccakIdentifier(ethAccount, keccakIdentifier)
    const details = await PoBA.getBankAccountsByAddress(ethAccount, index[1].toNumber())
    return {
      bankName: details[1],
      identityNames: details[2]
    }
  } catch (e) {
    throw new Error(
      `could not retrieve bank account with ethAccount: ${ethAccount} keccakIdentifier: ${keccakIdentifier}`
    )
  }
}

module.exports = getBankAccountDetails
