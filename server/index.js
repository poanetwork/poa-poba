const express = require('express')
const bodyParser = require('body-parser')
const Web3 = require('web3')

const app = express()
const web3 = new Web3()

app.use(express.static('public'))

app.use(bodyParser.json())

const privateKey = '0xa5cea1fcd2258b3e7b3d8666f36c7ff19c8dc60b198d01f491037290afbc06ef'

app.post('/api/get-tx-data', (req, res) => {
  const { ethAccount, token } = req.body
  const bankAccount = 'MyAccount-' + Math.floor(1000 * Math.random())

  const hash = web3.utils.sha3(ethAccount + Buffer.from(bankAccount).toString('hex'))
  const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)

  res.send({ bankAccount, v, r, s })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
