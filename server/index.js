require('dotenv').config({
  path: '../frontend/.env'
})

const express = require('express')
const bodyParser = require('body-parser')
const Web3 = require('web3')
const plaid = require('plaid')

const PLAID_CLIENT_ID = process.env.REACT_APP_PLAID_CLIENT_ID
const PLAID_SECRET = process.env.REACT_APP_PLAID_SECRET
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY
const PLAID_ENV = process.env.REACT_APP_PLAID_ENV

const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
)

const app = express()
const web3 = new Web3()

app.use(express.static('public'))

app.use(bodyParser.json())

const privateKey = '0x3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e'

const exchangePublicToken = async token => {
  const tokenResponse = await plaidClient.exchangePublicToken(token)
  if (tokenResponse.status_code !== 200) {
    throw Error(`[exchangePublicToken] ${tokenResponse.error_code}: {tokenResponse.error_message}`)
  }
  return tokenResponse
}

const getBankAccountData = async accessToken => {
  const response = await plaidClient.getAuth(accessToken)
  if (response.status_code !== 200) {
    throw Error(`[getBankAccountData] ${response.error_code}: {response.error_message}`)
  }
  return response
}

app.post('/api/get-tx-data', (req, res) => {
  const { ethAccount, token } = req.body
  return exchangePublicToken(token)
    .then(tokenResponse => {
      const accessToken = tokenResponse.access_token
      return getBankAccountData(accessToken)
    })
    .then(accountData => {
      const { numbers } = accountData
      const bankAccount = numbers[0].account

      const hash = web3.utils.sha3(ethAccount + Buffer.from(bankAccount).toString('hex'))
      const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)

      res.send({ bankAccount, v, r, s })
    })
    .catch(e => {
      res.send({ error: e })
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
