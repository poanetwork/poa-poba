const express = require('express')
const bodyParser = require('body-parser')
const Web3 = require('web3')

const app = express()
const web3 = new Web3()

app.use(express.static('public'))

app.use(bodyParser.json())

const privateKey = '0x3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e'

app.post('/api/get-tx-data', (req, res) => {
  const { ethAccount } = req.body
  const bankAccount = 'MyAccount-' + Math.floor(1000 * Math.random())

  const hash = web3.utils.sha3(ethAccount + Buffer.from(bankAccount).toString('hex'))
  const { v, r, s } = web3.eth.accounts.sign(hash, privateKey)

  res.send({ bankAccount, v, r, s })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
