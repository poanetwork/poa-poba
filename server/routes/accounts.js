const { Router } = require('express')

const router = new Router()
const Web3 = require('web3')
const accountsController = require('../controllers/accounts')

const logger = require('../etc/logger')

const { PRIVATE_KEY } = process.env
const web3 = new Web3()

const getBankAccounts = (req, res) => {
  const { token } = req.params
  const bankAccounts = async publicToken => {
    try {
      const accessToken = await accountsController.getAccessToken(publicToken)
      const accounts = await accountsController.getBankAccounts(accessToken)
      return res.send({ accounts })
    } catch (e) {
      logger.error(e.message, 'There was an error getting the transaction data')
      return res.status(400).send({ error: e.message })
    }
  }
  return bankAccounts(token)
}

const signBankAccount = (req, res) => {
  const { ethAccount, accessToken, accountId } = req.body
  logger.info({ ethAccount }, 'Getting bank account')
  const getTxData = async () => {
    try {
      if (!ethAccount) return res.status(404).send({ error: 'ETH Account not found' })
      if (!accessToken) return res.status(404).send({ error: 'Access Token not found' })
      if (!accountId) return res.status(404).send({ error: 'Account ID not found' })
      const { account } = await accountsController.getBankAccount(accessToken, accountId)
      const hash = web3.utils.sha3(ethAccount + Buffer.from(account).toString('hex'))
      const { v, r, s } = web3.eth.accounts.sign(hash, PRIVATE_KEY)
      return res.send({ account, v, r, s })
    } catch (e) {
      logger.error(e.message, 'There was an error getting the transaction data')
      return res.status(400).send({ error: e.message })
    }
  }
  return getTxData()
}

router.get('/bank-accounts/:token', getBankAccounts)
router.post('/sign-account', signBankAccount)

module.exports = router
