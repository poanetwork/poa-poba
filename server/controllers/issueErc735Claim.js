const getBankAccountDetails = require('../server-lib/get_bank_account_details')
const erc735Claim = require('../server-lib/erc735_claim')

const logger = require('../etc/logger')

const { POBA_ERC725_CONTRACT_ADDRESS, POBA_ERC725_URI } = process.env

const issueErc735Claim = (req, res) => {
  const { ethAccount, keccakIdentifier, identityContractAddress } = req.body

  logger.info({ ethAccount }, 'Getting bank account from contract')
  const getTxData = async () => {
    try {
      const bankAccount = await getBankAccountDetails(ethAccount, keccakIdentifier)
      const { signature, bankAccountSha3 } = erc735Claim.getErc735Signature(
        ethAccount,
        bankAccount,
        identityContractAddress
      )
      return res.send({
        signature,
        data: bankAccountSha3,
        issuerAddress: POBA_ERC725_CONTRACT_ADDRESS,
        uri: POBA_ERC725_URI
      })
    } catch (e) {
      logger.error(e.message, 'There was an error getting the transaction data')
      return res.status(400).send({ error: e.message })
    }
  }
  return getTxData()
}

module.exports = {
  issueErc735Claim
}
