const { Router } = require('express')

const router = new Router()
const Web3 = require('web3')
const bankAccountsController = require('../controllers/bankAccounts')

const logger = require('../etc/logger')

const { PRIVATE_KEY } = process.env
const web3 = new Web3()

const getBankAccounts = (req, res) => {
  const { token } = req.params || null
  if (!token) res.status(400).send({ error: 'Public token not found' })
  const bankAccounts = async publicToken => {
    try {
      const accessToken = await bankAccountsController.getAccessToken(publicToken)
      const accounts = await bankAccountsController.getBankAccounts(accessToken)
      res.send({ accounts })
    } catch (e) {
      logger.error(e, 'There was an error getting the transaction data')
      res.status(400).send({ error: e })
    }
  }
  return bankAccounts(token)
}

const signBankAccount = (req, res) => {
  const { ethAccount, accessToken, accountId } = req.body
  if (!ethAccount) res.status(400).send({ error: 'ETH Account not found' })
  if (!accessToken) res.status(400).send({ error: 'Access Token not found' })
  if (!accountId) res.status(400).send({ error: 'Account ID not found' })
  logger.info({ ethAccount }, 'Getting bank account')
  const getTxData = async () => {
    try {
      const { account } = await bankAccountsController.getBankAccount(accessToken, accountId)
      const hash = web3.utils.sha3(ethAccount + Buffer.from(account).toString('hex'))
      const { v, r, s } = web3.eth.accounts.sign(hash, PRIVATE_KEY)

      res.send({ account, v, r, s })
    } catch (e) {
      logger.error(e, 'There was an error getting the transaction data')
      res.status(400).send({ error: e })
    }
  }

  return getTxData()
}

router.get('/bank-accounts/:token', getBankAccounts)
router.post('/sign-account', signBankAccount)

module.exports = router
